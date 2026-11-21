"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** screenshot shown on the phone's screen */
  src: string;
  /** the scroll section that drives the turn; the phone faces the viewer by the end of `turn` (0 to 1 of its sticky scroll) */
  sectionSelector: string;
  turn?: [number, number];
  className?: string;
};

const W = 1, H = 2.13, D = 0.11, R = 0.14; // body size in scene units (same ratio as the flat phone, 9 / 19.2)

/**
 * A generic smartphone in 3D (three.js) with an app screenshot on its screen. It starts turned away and tilted back,
 * turns to face the viewer as its section scrolls, then sways gently and leans towards the pointer.
 * three.js loads only when the phone is near the screen. The flat DOM phone stays underneath as the fallback:
 * the parent gets data-phone3d once the first 3D frame is drawn, and its CSS hides the flat phone.
 */
export function Phone3D({ src, sectionSelector, turn = [0.25, 0.7], className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let dispose = () => {};

    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      Promise.all([
        import("three"),
        import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]).then(([THREE, { RoundedBoxGeometry }, { RoomEnvironment }]) => {
        if (cancelled) return;
        try {
          dispose = build(THREE, RoundedBoxGeometry, RoomEnvironment, canvas, src, sectionSelector, turn);
        } catch {
          /* no WebGL: the flat phone stays */
        }
      });
    }, { rootMargin: "100% 0px" });
    io.observe(canvas);
    return () => { cancelled = true; io.disconnect(); dispose(); };
  }, [src, sectionSelector, turn]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function build(
  THREE: typeof import("three"),
  RoundedBoxGeometry: typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry,
  RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment,
  canvas: HTMLCanvasElement,
  src: string,
  sectionSelector: string,
  turn: [number, number],
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  // the canvas is 1.5x the flat phone in each direction, so the phone fills 2/3 of its height
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, (H * 1.5) / (2 * Math.tan((15 * Math.PI) / 180)));

  const phone = new THREE.Group();
  scene.add(phone);
  const disposables: { dispose: () => void }[] = [renderer, pmrem, env];
  const add = <G extends import("three").BufferGeometry, M extends import("three").Material>(g: G, m: M) => {
    disposables.push(g, m);
    const mesh = new THREE.Mesh(g, m);
    phone.add(mesh);
    return mesh;
  };

  // body: dark graphite with a satin metal frame look
  const metal = new THREE.MeshPhysicalMaterial({ color: 0x2a2e2c, metalness: 0.85, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  add(new RoundedBoxGeometry(W, H, D, 8, R), metal);

  // rounded rectangle shape with UVs spread over its own bounds
  const rounded = (w: number, h: number, r: number) => {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ShapeGeometry(s, 12);
    const pos = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
    return g;
  };

  // front glass: a black bezel, the screenshot inside it, the camera island on top
  const front = D / 2 + 0.001;
  add(rounded(W - 0.02, H - 0.02, R - 0.01), new THREE.MeshPhysicalMaterial({ color: 0x050706, roughness: 0.08, clearcoat: 1 })).position.z = front;
  const sw = W - 0.075, sh = H - 0.075;
  const tex = new THREE.TextureLoader().load(src, () => { ready = true; });
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  disposables.push(tex);
  add(rounded(sw, sh, R - 0.045), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })).position.z = front + 0.001;
  const island = add(rounded(0.29, 0.085, 0.0425), new THREE.MeshBasicMaterial({ color: 0x020302 }));
  island.position.set(0, H / 2 - 0.1, front + 0.002);
  // a thin sheet of glass over the screen catches the reflections
  add(rounded(W - 0.02, H - 0.02, R - 0.01), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, roughness: 0.05, metalness: 0, clearcoat: 1 })).position.z = front + 0.003;

  // back: matte glass and a camera block
  const back = add(rounded(W - 0.02, H - 0.02, R - 0.01), new THREE.MeshPhysicalMaterial({ color: 0x1d211f, roughness: 0.55, metalness: 0.1, side: THREE.DoubleSide }));
  back.position.z = -D / 2 - 0.001;
  back.rotation.y = Math.PI;
  const bump = add(new RoundedBoxGeometry(0.42, 0.42, 0.03, 6, 0.09), new THREE.MeshPhysicalMaterial({ color: 0x272b29, roughness: 0.3, metalness: 0.4 }));
  bump.position.set(W / 2 - 0.28, H / 2 - 0.28, -D / 2 - 0.015);
  const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050505, roughness: 0.05, metalness: 0.2, clearcoat: 1 });
  for (const [lx, ly] of [[-0.09, 0.09], [-0.09, -0.09], [0.09, 0]] as const) {
    const lens = add(new THREE.CylinderGeometry(0.065, 0.065, 0.025, 32), lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(bump.position.x + lx, bump.position.y + ly, -D / 2 - 0.035);
  }

  // side buttons
  const btnMat = metal;
  for (const [x, y, h] of [[W / 2 + 0.006, 0.45, 0.32], [-W / 2 - 0.006, 0.55, 0.16], [-W / 2 - 0.006, 0.3, 0.16]] as const) {
    const b = add(new RoundedBoxGeometry(0.02, h, 0.05, 2, 0.008), btnMat);
    b.position.set(x, y, 0);
  }

  // a soft lime rim light from behind, in the brand colour
  const rim = new THREE.DirectionalLight(0xd5f45e, 1.4);
  rim.position.set(-3, 2, -3);
  scene.add(rim);
  const key = new THREE.DirectionalLight(0xffffff, 0.6);
  key.position.set(2, 3, 4);
  scene.add(key);

  const section = canvas.closest<HTMLElement>(sectionSelector);
  const host = canvas.parentElement;
  let ready = false, shown = false, visible = true, frame = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => { pointer.tx = (e.clientX / window.innerWidth) * 2 - 1; pointer.ty = (e.clientY / window.innerHeight) * 2 - 1; };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const vis = new IntersectionObserver((e) => { visible = e.some((x) => x.isIntersecting); if (visible) loop(); });
  vis.observe(canvas);

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const start = performance.now();

  function loop() {
    cancelAnimationFrame(frame);
    if (!visible) return;
    frame = requestAnimationFrame(loop);
    if (!ready) return;
    // scroll progress through the sticky part of the section, 0 to 1
    let p = 0;
    if (section) {
      const r = section.getBoundingClientRect();
      p = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    }
    const t = ease(clamp((p - turn[0]) / (turn[1] - turn[0])));
    const time = (performance.now() - start) / 1000;
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    // turned away and tilted back at the start, facing the viewer at the end; then a slow sway and a lean to the pointer
    phone.rotation.y = (1 - t) * -1.1 + t * (Math.sin(time * 0.6) * 0.07 + pointer.x * 0.18);
    phone.rotation.x = (1 - t) * 0.55 + t * (Math.cos(time * 0.5) * 0.03 + pointer.y * 0.1);
    phone.rotation.z = (1 - t) * 0.12;
    renderer.render(scene, camera);
    if (!shown) { shown = true; host?.setAttribute("data-phone3d", ""); }
  }
  loop();

  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    vis.disconnect();
    window.removeEventListener("pointermove", onPointer);
    host?.removeAttribute("data-phone3d");
    disposables.forEach((d) => d.dispose());
  };
}
