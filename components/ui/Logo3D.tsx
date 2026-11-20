"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark, MARK } from "./Logo";
import styles from "./Logo3D.module.css";

/**
 * The Elegix mark as a piece of glass (three.js). It floats, turns towards the cursor and
 * catches light on its edges. The flat SVG mark is shown first and stays for reduced motion,
 * no WebGL or until three.js has loaded (only when the mark is near the viewport).
 */
export function Logo3D({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
    let dispose = () => {};
    let cancelled = false;
    Promise.all([
      import("three"),
      import("three/examples/jsm/loaders/SVGLoader.js"),
      import("three/examples/jsm/environments/RoomEnvironment.js"),
    ]).then(([THREE, { SVGLoader }, { RoomEnvironment }]) => {
      if (cancelled) return;
      dispose = build(THREE, SVGLoader, RoomEnvironment, el, () => setReady(true));
    });
    return () => { cancelled = true; dispose(); };
  }, []);

  return (
    <div ref={box} className={`${styles.box} ${ready ? styles.ready : ""} ${className ?? ""}`} aria-hidden="true">
      <LogoMark className={styles.flat} />
    </div>
  );
}

function build(
  THREE: typeof import("three"),
  SVGLoader: typeof import("three/examples/jsm/loaders/SVGLoader.js").SVGLoader,
  RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment,
  el: HTMLDivElement,
  onReady: () => void,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.domElement.className = styles.canvas;
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // the mark: SVG paths extruded into a thick, bevelled slab
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 112">${MARK.map((d) => `<path d="${d}"/>`).join("")}</svg>`;
  const data = new SVGLoader().parse(svg);
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth: 10, bevelEnabled: true, bevelThickness: 3, bevelSize: 1.4, bevelSegments: 8, curveSegments: 40,
  });
  geo.center();
  // clear glass that lets the hero photo through: reflections, iridescent edges and a lime tint
  const glass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#e9ffd0"),
    metalness: 0.1,
    roughness: 0.04,
    transparent: true,
    opacity: 0.32,
    iridescence: 1,
    iridescenceIOR: 1.4,
    iridescenceThicknessRange: [180, 520],
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    specularIntensity: 1,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mark = new THREE.Mesh(geo, glass);
  mark.scale.set(0.034, -0.034, 0.034); // SVG y goes down
  const pivot = new THREE.Group();
  pivot.add(mark);
  scene.add(pivot);

  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(3, 4, 6);
  scene.add(key);

  // the cursor anywhere over the hero turns the mark
  const zone: HTMLElement = el.closest("section") ?? document.body;
  let tx = 0, ty = 0;
  const onMove = (e: PointerEvent) => {
    const r = zone.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ty = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  const onLeave = () => { tx = 0; ty = 0; };
  zone.addEventListener("pointermove", onMove);
  zone.addEventListener("pointerleave", onLeave);

  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  let visible = true, raf = 0, first = true, rx = 0, ry = 0;
  const clock = new THREE.Clock();
  const t0 = performance.now();
  const tick = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = (performance.now() - t0) / 1000;
    const k = 1 - Math.exp(-dt * 4);
    // a slow idle sway plus the cursor; one full turn when it first appears
    const intro = Math.max(0, 1 - t / 1.8);
    rx += (ty * 0.45 + Math.sin(t * 0.7) * 0.08 - rx) * k;
    ry += (tx * 0.7 + Math.sin(t * 0.5) * 0.25 - ry) * k;
    pivot.rotation.set(rx, ry + Math.PI * 2 * intro * intro * intro, 0);
    pivot.position.y = Math.sin(t * 1.1) * 0.08;
    pivot.scale.setScalar(1 - intro * intro * 0.4);
    renderer.render(scene, camera);
    if (first) { first = false; onReady(); }
    raf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { clock.getDelta(); raf = requestAnimationFrame(tick); }
  });
  io.observe(el);
  const onVis = () => { if (!document.hidden && visible && !raf) { clock.getDelta(); raf = requestAnimationFrame(tick); } };
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    zone.removeEventListener("pointermove", onMove);
    zone.removeEventListener("pointerleave", onLeave);
    geo.dispose(); glass.dispose();
    env.dispose(); pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
