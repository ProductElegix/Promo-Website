"use client";

import { useEffect, useRef, useState } from "react";
import type * as T from "three";
import { AREA_ORDER, type AreaKey } from "@/lib/content";
import { AreaIcon } from "./AreaIcon";
import { Wheel } from "./Wheel";
import styles from "./Wheel3D.module.css";

type Props = {
  /** This week's scores, in AREA_ORDER. */
  scores: number[];
  /** Last week's scores, shown against this week's in the Reflect step. */
  prev: number[];
  /** Short area names for the labels around the wheel. */
  names: Record<AreaKey, string>;
  text: { label: string; balance: string; last: string; now: string };
  /** On a black section: a dark plate and dark empty tiles. */
  dark?: boolean;
};

const RINGS = 10;
const R0 = 1.7, R1 = 5.2;
const avg = (s: number[]) => (s.reduce((a, b) => a + b, 0) / s.length).toFixed(1);

/**
 * Wheel of Life in 3D (three.js) for the How it works scroll story. 6 areas x 10 rings of glossy
 * tiles on a white plate: a scored tile stands up in the area's colour, the rest sit lower in its
 * light tint. Area labels ride around the rim and the score sits on the hub in the middle.
 * Elements with data-wheel-step="0|1|2" in the same section drive it as they cross the middle of
 * the screen: 0 See (all scores), 1 Act (the lowest area slides out and turns to the viewer, the
 * rest fade), 2 Reflect (last week and this week take turns).
 * The flat SVG wheel is shown first and stays for reduced motion or without WebGL;
 * three.js loads only when the wheel comes near the viewport.
 */
export function Wheel3D({ scores, prev, names, text, dark = false }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);
  const api = useRef<ReturnType<typeof build> | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState(0);
  const [flip, setFlip] = useState(false); // Reflect: false = last week, true = this week
  const focus = scores.indexOf(Math.min(...scores));

  // the steps: whichever crosses the middle of the screen sets the mode
  useEffect(() => {
    const section = box.current?.closest("section");
    const steps = Array.from(section?.querySelectorAll<HTMLElement>("[data-wheel-step]") ?? []);
    if (!steps.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        steps.forEach((s) => s.toggleAttribute("data-active", s === e.target));
        setMode(Number((e.target as HTMLElement).dataset.wheelStep));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
    steps[0].setAttribute("data-active", "");
    return () => io.disconnect();
  }, []);

  useEffect(() => { api.current?.setMode(mode); }, [mode]);

  useEffect(() => {
    if (mode !== 2) return;
    setFlip(false);
    const id = window.setInterval(() => setFlip((f) => !f), 1900);
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
      Promise.all([import("three"), import("three/examples/jsm/environments/RoomEnvironment.js")]).then(([THREE, { RoomEnvironment }]) => {
        if (cancelled) return;
        const built = build(THREE, RoomEnvironment, el, tags.current, scores, prev, focus, dark, () => setReady(true));
        dispose = built.dispose;
        api.current = built;
        built.setMode(mode);
      });
    }, { rootMargin: "400px" });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); dispose(); api.current = null; };
    // the scores are a fixed demo set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = mode === 2 && !flip ? prev : scores;
  const value = mode === 1 ? String(shown[focus]) : avg(shown);
  const sub = mode === 1 ? names[AREA_ORDER[focus]] : mode === 2 ? (flip ? text.now : text.last) : text.balance;

  return (
    <div ref={box} className={`${styles.box} ${dark ? styles.dark : ""} ${ready ? styles.ready : ""}`}>
      <div className={styles.flat}><Wheel scores={scores} size={320} label={text.label} /></div>
      <div className={styles.score} aria-hidden="true">
        <b key={value}>{value}</b>
        <span key={sub}>{sub}</span>
      </div>
      {AREA_ORDER.map((a, i) => (
        <span key={a} ref={(n) => { tags.current[i] = n; }} className={styles.tag} data-on={mode !== 1 || i === focus ? "" : undefined}
          style={{ ["--s" as string]: `var(--${a}-s)`, ["--t" as string]: `var(--${a}-t)` }} aria-hidden="true">
          <AreaIcon area={a} />{names[a]}
        </span>
      ))}
    </div>
  );
}

function build(
  THREE: typeof import("three"),
  RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment,
  el: HTMLDivElement,
  tags: (HTMLSpanElement | null)[],
  now: number[],
  prev: number[],
  focus: number,
  dark: boolean,
  onReady: () => void,
) {
  const css = getComputedStyle(document.documentElement);
  const cssColor = (v: string, fb: string) => new THREE.Color(css.getPropertyValue(v).trim() || fb);
  const white = new THREE.Color(0xffffff);
  // what empty tiles fade towards: off-white on the page, near-black on a dark section
  const base = new THREE.Color(dark ? 0x1b1d1c : 0xf2f2f0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = styles.canvas;
  renderer.domElement.setAttribute("aria-hidden", "true");
  el.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.4;

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  camera.position.set(0, -21.5, 19);
  camera.lookAt(0, 0, -0.3);

  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(-5, -4, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.radius = 6;
  sun.shadow.bias = -0.0005;
  const sc = sun.shadow.camera as T.OrthographicCamera;
  sc.left = -8; sc.right = 8; sc.top = 8; sc.bottom = -8; sc.near = 1; sc.far = 30;
  scene.add(sun);
  scene.add(new THREE.HemisphereLight(0xffffff, dark ? 0x2a2c2b : 0xe9e9e5, dark ? 0.7 : 0.9));

  // soft shadow on the page under the plate
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: dark ? 0 : 0.16 }));
  ground.position.z = -0.75;
  ground.receiveShadow = true;
  scene.add(ground);

  const wheel = new THREE.Group();
  scene.add(wheel);

  // the plate: a thick white disc with a rounded edge
  const plateShape = new THREE.Shape();
  plateShape.absarc(0, 0, R1 + 0.35, 0, Math.PI * 2, false);
  const plateGeo = new THREE.ExtrudeGeometry(plateShape, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.12, bevelSegments: 6, curveSegments: 96 });
  const plate = new THREE.Mesh(plateGeo, new THREE.MeshPhysicalMaterial({ color: dark ? 0x121413 : 0xfbfbf8, roughness: 0.45, clearcoat: 0.4, clearcoatRoughness: 0.4 }));
  plate.position.z = -0.55;
  plate.castShadow = true;
  plate.receiveShadow = true;
  wheel.add(plate);

  // the hub in the middle, the score sits on it
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(R0 - 0.12, R0 - 0.12, 0.5, 64),
    new THREE.MeshPhysicalMaterial({ color: dark ? 0x1e201f : 0xffffff, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.15 }),
  );
  hub.rotation.x = Math.PI / 2;
  hub.castShadow = true;
  hub.receiveShadow = true;
  wheel.add(hub);

  // one rounded tile geometry per ring, shared by every area (each area group is rotated into place)
  const n = AREA_ORDER.length;
  const span = (2 * Math.PI) / n;
  const TILE = 0.42;
  const ringGeo = Array.from({ length: RINGS }, (_, s) => {
    const r1 = R0 + ((R1 - R0) * s) / RINGS + 0.035, r2 = R0 + ((R1 - R0) * (s + 1)) / RINGS - 0.035;
    const a1 = span / 2 - 0.055 / r1, a2 = -span / 2 + 0.055 / r1;
    const shape = new THREE.Shape();
    shape.moveTo(r1 * Math.cos(a2), r1 * Math.sin(a2));
    shape.absarc(0, 0, r1, a2, a1, false);
    shape.lineTo(r2 * Math.cos(a1), r2 * Math.sin(a1));
    shape.absarc(0, 0, r2, a1, a2, true);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: TILE - 0.08, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 3, curveSegments: 12 });
    g.translate(0, 0, -TILE / 2);
    return g;
  });

  type Tile = { mesh: T.Mesh; mat: T.MeshPhysicalMaterial; ring: number; z: number; c: T.Color; rough: number };
  const areas = AREA_ORDER.map((area, i) => {
    const angle = Math.PI / 2 - (i + 0.5) * span; // sector centre, clockwise from 12 o'clock
    const group = new THREE.Group();
    group.rotation.z = angle;
    wheel.add(group);
    const strong = cssColor(`--${area}-s`, "#009a44");
    const tint = dark ? strong.clone().lerp(base, 0.86) : cssColor(`--${area}-t`, "#d5f45e").lerp(white, 0.45);
    const muted = strong.clone().lerp(base, dark ? 0.7 : 0.72);
    const tiles: Tile[] = ringGeo.map((geo, s) => {
      const mat = new THREE.MeshPhysicalMaterial({ color: tint.clone(), roughness: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.25 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.z = -1.2;
      group.add(mesh);
      return { mesh, mat, ring: s, z: -0.22, c: tint.clone(), rough: 0.5 };
    });
    return { group, angle, strong, tint, muted, tiles, out: 0 };
  });

  let mode = 0, flip = false;
  const target = () => {
    const scores = mode === 2 && !flip ? prev : now;
    areas.forEach((a, i) => a.tiles.forEach((t) => {
      const on = t.ring < scores[i];
      const dim = mode === 1 && i !== focus;
      // scored tiles stand up, lighter at the centre and deeper towards the rim; the rest sit low in the tint
      t.z = on ? (dim ? -0.1 : 0.02) : -0.24;
      t.c = on
        ? dim ? a.muted : a.strong.clone().lerp(white, Math.max(0, 0.12 - t.ring * 0.015))
        : dim ? a.muted.clone().lerp(dark ? base : white, 0.4) : a.tint;
      t.rough = on ? 0.28 : 0.55;
    }));
  };
  target();

  // gentle tilt towards the pointer anywhere over the section
  const zone: HTMLElement = el.closest("section") ?? el;
  let tx = 0, ty = 0;
  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
  };
  const onLeave = () => { tx = 0; ty = 0; };
  zone.addEventListener("pointermove", onMove);
  zone.addEventListener("pointerleave", onLeave);

  let W = 1, H = 1;
  const resize = () => {
    W = el.clientWidth; H = el.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  const v = new THREE.Vector3();
  const place = (x: number, y: number, z: number) => {
    v.set(x, y, z).applyMatrix4(wheel.matrixWorld);
    const depth = v.y;
    v.project(camera);
    return { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H, depth };
  };
  let visible = true, raf = 0, first = true, spin = -0.9;
  const t0 = performance.now();
  const clock = new THREE.Clock();
  const tick = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = (performance.now() - t0) / 1000;
    const k = 1 - Math.exp(-dt * 5);
    const kz = 1 - Math.exp(-dt * 9);

    // slow turn; in Act the focus area turns to face the viewer
    if (mode === 1) {
      const want = -Math.PI / 2 - areas[focus].angle;
      const d = ((((want - spin) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      spin += d * k * 0.6;
    } else {
      spin += dt * 0.09;
    }
    wheel.rotation.z = spin;
    wheel.rotation.x += (ty * 0.12 - wheel.rotation.x) * k;
    wheel.rotation.y += (tx * 0.12 - wheel.rotation.y) * k;
    wheel.position.z = Math.sin(t * 0.9) * 0.05;

    areas.forEach((a, i) => {
      a.out += ((mode === 1 && i === focus ? 1 : 0) - a.out) * k;
      a.group.position.set(Math.cos(a.angle) * a.out * 0.45, Math.sin(a.angle) * a.out * 0.45, a.out * 0.35);
      a.tiles.forEach((tile) => {
        // intro: tiles rise ring by ring, area by area
        const delay = 0.15 + tile.ring * 0.045 + i * 0.07;
        const grow = Math.min(1, Math.max(0, (t - delay) / 0.7));
        const want = grow < 1 ? -1.2 + (tile.z + 1.2) * (1 - Math.pow(1 - grow, 3)) : tile.z;
        tile.mesh.position.z += (want - tile.mesh.position.z) * (grow < 1 ? 1 : kz);
        tile.mat.color.lerp(tile.c, k);
        tile.mat.roughness += (tile.rough - tile.mat.roughness) * k;
      });
    });

    // labels ride the rim (the ones at the back fade), the score sits on the hub
    wheel.updateMatrixWorld();
    areas.forEach((a, i) => {
      const tag = tags[i];
      if (!tag) return;
      const r = R1 + 1.05 + a.out * 0.45;
      const p = place(Math.cos(a.angle) * r, Math.sin(a.angle) * r, 0.2 + a.out * 0.35);
      tag.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(-50%, -50%)`;
      tag.style.setProperty("--depth", Math.max(0.35, Math.min(1, 0.75 - p.depth / 12)).toFixed(2));
      tag.style.zIndex = p.depth > 0 ? "1" : "3";
    });
    const c = place(0, 0, 0.25);
    el.style.setProperty("--hub-x", `${c.x.toFixed(1)}px`);
    el.style.setProperty("--hub-y", `${c.y.toFixed(1)}px`);

    renderer.render(scene, camera);
    if (first) { first = false; onReady(); }
    raf = requestAnimationFrame(tick);
  };
  const start = () => { if (!document.hidden && visible && !raf) { clock.getDelta(); raf = requestAnimationFrame(tick); } };
  // off screen the labels and the score are hidden, not just frozen: Safari can leave stale
  // copies of them painted over the sections above once the sticky stage scrolls away
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; el.toggleAttribute("data-idle", !visible); start(); });
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
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => { if (o instanceof THREE.Mesh) (o.material as T.Material).dispose(); });
      ringGeo.forEach((g) => g.dispose());
      plateGeo.dispose(); hub.geometry.dispose(); ground.geometry.dispose();
      env.dispose(); pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
