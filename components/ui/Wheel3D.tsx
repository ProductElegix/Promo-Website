"use client";

import { useEffect, useRef, useState } from "react";
import type * as T from "three";
import { AREA_ORDER, type AreaKey } from "@/lib/content";
import { Wheel } from "./Wheel";
import styles from "./Wheel3D.module.css";

type Props = {
  /** This week's scores, in AREA_ORDER. */
  scores: number[];
  /** Last week's scores, shown against this week's in the Reflect step. */
  prev: number[];
  /** Short area names, shown under the wheel when an area is in focus. */
  names: Record<AreaKey, string>;
  text: { label: string; balance: string; last: string; now: string };
};

const RINGS = 10;
const R0 = 1, R1 = 5;
const avg = (s: number[]) => (s.reduce((a, b) => a + b, 0) / s.length).toFixed(1);

/**
 * Wheel of Life in 3D (three.js) for the How it works scroll story: 6 areas x 10 rings, the
 * filled cells rise out of the disc. Elements with data-wheel-step="0|1|2" in the same section
 * drive it as they cross the middle of the screen:
 *   0 See: all scores and the Life Balance score;
 *   1 Act: the lowest area lifts, the rest fade back;
 *   2 Reflect: last week and this week take turns.
 * The flat SVG wheel is shown first and stays for reduced motion or without WebGL;
 * three.js loads only when the wheel comes near the viewport.
 */
export function Wheel3D({ scores, prev, names, text }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<ReturnType<typeof build> | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState(0);
  const [flip, setFlip] = useState(false); // Reflect: false = last week, true = this week
  const [hover, setHover] = useState<AreaKey | null>(null);
  const focus = scores.indexOf(Math.min(...scores));

  // the steps: whichever crosses the middle of the screen sets the mode
  useEffect(() => {
    const section = box.current?.closest("section");
    const steps = Array.from(section?.querySelectorAll<HTMLElement>("[data-wheel-step]") ?? []);
    if (!steps.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const m = Number((e.target as HTMLElement).dataset.wheelStep);
        steps.forEach((s) => s.toggleAttribute("data-active", s === e.target));
        setMode(m);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
    steps[0].setAttribute("data-active", "");
    return () => io.disconnect();
  }, []);

  useEffect(() => { api.current?.setMode(mode); }, [mode]);

  // Reflect: last week and this week take turns
  useEffect(() => {
    if (mode !== 2) return;
    setFlip(false);
    const id = window.setInterval(() => setFlip((f) => !f), 1800);
    return () => window.clearInterval(id);
  }, [mode]);
  useEffect(() => { api.current?.setFlip(flip); }, [flip]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
    let dispose = () => {};
    let cancelled = false;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      import("three").then((THREE) => {
        if (cancelled) return;
        const built = build(THREE, el, scores, prev, focus, (i) => setHover(i >= 0 ? AREA_ORDER[i] : null), () => setReady(true));
        dispose = built.dispose;
        api.current = built;
        built.setMode(mode);
      });
    }, { rootMargin: "300px" });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); dispose(); api.current = null; };
    // the scores are a fixed demo set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const caption = hover ? names[hover]
    : mode === 1 ? names[AREA_ORDER[focus]]
    : mode === 2 ? `${flip ? text.now : text.last} · ${avg(flip ? scores : prev)}`
    : `${text.balance} ${avg(scores)}/10`;

  return (
    <div ref={box} className={`${styles.box} ${ready ? styles.ready : ""}`}>
      <div className={styles.flat}><Wheel scores={scores} size={320} label={text.label} /></div>
      <span className={styles.caption} aria-hidden="true" key={caption}>{caption}</span>
    </div>
  );
}

function build(
  THREE: typeof import("three"),
  el: HTMLDivElement,
  now: number[],
  prev: number[],
  focus: number,
  onHover: (i: number) => void,
  onReady: () => void,
) {
  const css = getComputedStyle(document.documentElement);
  const areaColor = (a: AreaKey) => new THREE.Color(css.getPropertyValue(`--${a}-s`).trim() || "#009a44");
  const off = new THREE.Color("#dfe4df");

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = styles.canvas;
  renderer.domElement.setAttribute("aria-hidden", "true");
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, -17, 16);
  camera.lookAt(0, 0, 0.6);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfd8cf, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-4, -6, 10);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8);
  rim.position.set(6, 8, 4);
  scene.add(rim);

  const wheel = new THREE.Group();
  scene.add(wheel);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(R1 + 0.25, R1 + 0.25, 0.18, 96),
    new THREE.MeshStandardMaterial({ color: 0xf3f1ea, roughness: 0.9 }),
  );
  base.rotation.x = Math.PI / 2;
  base.position.z = -0.1;
  wheel.add(base);

  type Cell = { mesh: T.Mesh; mat: T.MeshLambertMaterial; ring: number; h: number; c: T.Color };
  const n = AREA_ORDER.length;
  const span = (2 * Math.PI) / n;
  const areas = AREA_ORDER.map((area, i) => {
    const group = new THREE.Group();
    wheel.add(group);
    const color = areaColor(area);
    const a1 = Math.PI / 2 - i * span - 0.035, a2 = a1 - span + 0.07;
    const cells: Cell[] = [];
    for (let s = 0; s < RINGS; s++) {
      const r1 = R0 + ((R1 - R0) * s) / RINGS + 0.04, r2 = R0 + ((R1 - R0) * (s + 1)) / RINGS - 0.04;
      const shape = new THREE.Shape();
      shape.moveTo(r2 * Math.cos(a1), r2 * Math.sin(a1));
      shape.absarc(0, 0, r2, a1, a2, true);
      shape.lineTo(r1 * Math.cos(a2), r1 * Math.sin(a2));
      shape.absarc(0, 0, r1, a2, a1, false);
      const geo = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, curveSegments: 10 });
      const mat = new THREE.MeshLambertMaterial({ color: off.clone() });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.z = 0.001;
      mesh.userData.area = i;
      group.add(mesh);
      cells.push({ mesh, mat, ring: s, h: 0.06, c: off.clone() });
    }
    return { group, color, faded: color.clone().lerp(off, 0.7), cells, lift: 0 };
  });

  let mode = 0, flip = false, hovered = -1;
  const target = () => {
    const scores = mode === 2 && !flip ? prev : now;
    areas.forEach((a, i) => a.cells.forEach((c) => {
      const on = c.ring < scores[i];
      c.h = on ? 0.35 + c.ring * 0.11 : 0.06;
      c.c = !on ? off : mode === 1 && i !== focus ? a.faded : a.color;
    }));
  };
  target();

  const ray = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let tiltX = 0, tiltY = 0;
  const onMove = (e: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    tiltX = mouse.y; tiltY = mouse.x;
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(areas.map((a) => a.group), true)[0];
    const i = hit ? (hit.object.userData.area as number) : -1;
    if (i !== hovered) { hovered = i; onHover(i); }
  };
  const onLeave = () => { tiltX = 0; tiltY = 0; if (hovered !== -1) { hovered = -1; onHover(-1); } };
  renderer.domElement.addEventListener("pointermove", onMove);
  renderer.domElement.addEventListener("pointerleave", onLeave);

  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  let visible = true, raf = 0, first = true;
  const t0 = performance.now();
  const clock = new THREE.Clock();
  const tick = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = (performance.now() - t0) / 1000;
    const k = 1 - Math.exp(-dt * 6);
    wheel.rotation.z += dt * (mode === 1 ? 0.04 : 0.12);
    wheel.rotation.x += (tiltX * 0.18 - wheel.rotation.x) * k;
    wheel.rotation.y += (tiltY * 0.18 - wheel.rotation.y) * k;
    const lifted = hovered >= 0 ? hovered : mode === 1 ? focus : -1;
    areas.forEach((a, i) => {
      a.lift += ((i === lifted ? 0.6 : 0) - a.lift) * k;
      a.group.position.z = a.lift;
      a.cells.forEach((c) => {
        const delay = c.ring * 0.06 + i * 0.05;
        const grow = Math.min(1, Math.max(0, (t - delay) / 0.9));
        const want = c.h * (1 - Math.pow(1 - grow, 3));
        c.mesh.scale.z += (want - c.mesh.scale.z) * (grow < 1 ? 1 : k);
        c.mat.color.lerp(c.c, k);
      });
    });
    renderer.render(scene, camera);
    if (first) { first = false; onReady(); }
    raf = requestAnimationFrame(tick);
  };
  const start = () => { if (!document.hidden && visible && !raf) { clock.getDelta(); raf = requestAnimationFrame(tick); } };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
  io.observe(el);
  document.addEventListener("visibilitychange", start);
  raf = requestAnimationFrame(tick);

  return {
    setMode(m: number) { mode = m; flip = false; target(); },
    setFlip(f: boolean) { flip = f; target(); },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", start);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) { o.geometry.dispose(); (o.material as T.Material).dispose(); }
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
