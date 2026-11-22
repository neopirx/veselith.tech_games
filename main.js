/* ═════════════════════════════════════════════
   VESELITH · GHOST ARCHIVE — content + motion
   Edit the two lists below. Nothing else needed.
   ═════════════════════════════════════════════ */

// Released games — first screen. The first one gets the big chrome treatment.
const LIBRARY = [
  {
    title: "Depthcore Racer",
    year: 2026,
    genre: "Parkour time trial",
    url: "https://github.com/neopirx/depthcore-racer",   // ← swap for the live play link
    cta: "Enter",
  },
];

// Games in development — after one scroll. The first one is featured.
const FORGE = [
  { title: "Order 404", state: "In development" },
];

/* ───────────────────────────────────────────── */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const pad = (n, l = 2) => String(n).padStart(l, "0");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const now0 = new Date();
const hex = n => Math.floor(Math.random() * 16 ** n).toString(16).toUpperCase().padStart(n, "0");

/* ── static bits ─────────────────────────────── */
$$(".yr").forEach(e => (e.textContent = now0.getFullYear()));
$$(".mo").forEach(e => (e.textContent = `${MONTHS[now0.getMonth()]} ${String(now0.getFullYear()).slice(2)}`));
$$(".code").forEach(e => (e.textContent = `${hex(4)}.${hex(2)}`));
$("#count-lib").textContent = pad(LIBRARY.length);
$("#count-forge").textContent = pad(FORGE.length);
$("#lib-n").textContent = pad(LIBRARY.length);

// barcodes
$$(".barcode").forEach(el => {
  const n = +el.dataset.bars || 40; let x = 0, r = "";
  for (let i = 0; i < n; i++) { const w = [1, 1, 2, 3][(Math.random() * 4) | 0]; if (i % 2 === 0) r += `<rect x="${x}" y="0" width="${w}" height="10"/>`; x += w; }
  el.innerHTML = `<svg viewBox="0 0 ${x} 10" preserveAspectRatio="none">${r}</svg>`;
});

/* ── library ─────────────────────────────────── */
const lib = $("#lib");
if (!LIBRARY.length) {
  lib.innerHTML = `<div class="game"><span class="sealed">SEALED</span></div>`;
} else {
  const [g, ...rest] = LIBRARY;
  const ext = g.url && !g.url.startsWith("#") ? 'target="_blank" rel="noopener"' : "";
  lib.innerHTML = `
    <a class="game" href="${esc(g.url || "#")}" ${ext}>
      <div class="game-meta">
        <span class="tiny">N°01 — RELEASED</span>
        <span class="tiny dim">${esc([g.year, g.genre].filter(Boolean).join(" · "))}</span>
      </div>
      <span class="chrome">${g.title.split(" ").map(esc).join("<br>")}</span>
      <div class="game-row">
        <span class="barcode" style="width:120px">${barcodeSVG(30)}</span>
        <span class="enter">${esc((g.cta || "Enter").toUpperCase())} <span aria-hidden="true">↗</span></span>
      </div>
    </a>
    ${rest.length ? `<div class="more">${rest.map((r, i) => `<a class="tiny" href="${esc(r.url || "#")}">N°${pad(i + 2)} ${esc(r.title)} ↗</a>`).join("")}</div>` : ""}`;
}
function barcodeSVG(n) {
  let x = 0, r = "";
  for (let i = 0; i < n; i++) { const w = [1, 1, 2, 3][(Math.random() * 4) | 0]; if (i % 2 === 0) r += `<rect x="${x}" y="0" width="${w}" height="10"/>`; x += w; }
  return `<svg viewBox="0 0 ${x} 10" preserveAspectRatio="none">${r}</svg>`;
}

/* ── forge ───────────────────────────────────── */
const forge = $("#forge-list");
if (FORGE.length) {
  const [f, ...rest] = FORGE;
  const title = f.title.split(" ").map(w => /\d/.test(w) ? `<span class="sl">${esc(w)}</span>` : esc(w)).join(" ");
  const snake = s => esc(s).toUpperCase().replace(/\s+/g, "_");
  forge.innerHTML = `
    <p class="proj-title">${title}</p>
    <div class="banner"><span>[${snake(f.title)}] :</span><span class="st" data-scramble>${snake(f.state || "In development")}</span></div>
    ${rest.length ? `<div class="others">${rest.map((r, i) => `<span>N°${pad(i + 2)} ${esc(r.title)}</span>`).join("")}</div>` : ""}`;
}

/* ── wordmark: VESELITH, every letter a different voice ── */
const LETTERS = [
  { c: "V", cls: "i", oy: -0.1, sc: 1.12 },
  { c: "E", oy: 0.05 },
  { c: "S", cls: "f", oy: -0.02, sc: 1.05 },
  { c: "E", cls: "i", oy: -0.22, sc: 0.78 },
  { c: "L", oy: 0.06, sc: 1.1 },
  { c: "I", cls: "i", oy: -0.08 },
  { c: "T", cls: "f", oy: 0.04 },
  { c: "H", oy: -0.04, sc: 1.06 },
];
const markEl = $(".mark-letters");
const letterEls = LETTERS.map((L, i) => {
  const b = document.createElement("b");
  b.textContent = L.c; if (L.cls) b.className = L.cls;
  b.style.setProperty("--oy", L.oy || 0);
  b.style.setProperty("--sc", L.sc || 1);
  b.style.setProperty("--rot", `${(i % 2 ? 1 : -1) * (8 + Math.random() * 18)}deg`);
  markEl.appendChild(b);
  return b;
});
// swash: outer bone line + inner cobalt line = an outlined ribbon
const swashPath = $(".swash path");
const swashInner = swashPath.cloneNode(); swashPath.after(swashInner);
const swashLen = swashPath.getTotalLength();
$(".swash").style.setProperty("--len", swashLen);

/* ── blue poster strips + glitch slices ─────── */
const STRIPS = 9;
const strips = Array.from({ length: STRIPS }, (_, i) => {
  const s = document.createElement("i");
  s.style.top = `${(i / STRIPS) * 100}%`;
  s.style.height = `calc(${100 / STRIPS}% + 1px)`;
  s.style.setProperty("--dir", i % 2 ? 1 : -1);
  $(".bg-blue").appendChild(s);
  return s;
});
const slices = Array.from({ length: 7 }, () => { const s = document.createElement("i"); $(".slices").appendChild(s); return s; });
const shuffleSlices = () => slices.forEach(s => {
  s.style.top = `${Math.random() * 100}%`;
  s.style.height = `${1 + Math.random() * 7}px`;
  s.style.setProperty("--sx", ((Math.random() - 0.5) * 30).toFixed(1));
});
shuffleSlices();

/* knight glitch strips */
const kg = $(".kn-glitch");
const kStrips = Array.from({ length: 6 }, () => { const i = document.createElement("i"); i.style.inset = "0"; kg.appendChild(i); return i; });
let glitchUntil = 0;
function glitchKnight(on, strength = 1) {
  kStrips.forEach(s => {
    if (!on) { s.style.opacity = 0; return; }
    const t = Math.random() * 90, h = 2 + Math.random() * 9;
    s.style.clipPath = `inset(${t}% 0 ${100 - t - h}% 0)`;
    s.style.transform = `translateX(${((Math.random() - 0.5) * 60 * strength).toFixed(1)}px)`;
    s.style.opacity = 1;
  });
}

/* ── text scramble ───────────────────────────── */
const GLY = "▚▞░▒█<>/\\_-=+*#0123456789ABCDEFX";
function scramble(el, text, dur = 600) {
  if (reduced) { el.textContent = text; return; }
  const start = performance.now();
  const step = t => {
    const k = clamp((t - start) / dur);
    const n = Math.floor(k * text.length);
    el.textContent = text.slice(0, n) + Array.from(text.slice(n), ch => ch === " " ? " " : GLY[(Math.random() * GLY.length) | 0]).join("");
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── nav ─────────────────────────────────────── */
const goto = id => scrollTo({ top: id === "forge" ? innerHeight : 0, behavior: reduced ? "auto" : "smooth" });
$$("[data-go]").forEach(b => b.addEventListener("click", () => goto(b.dataset.go)));
addEventListener("keydown", e => {
  if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goto("forge"); }
  if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); goto("archive"); }
});
if (location.hash === "#forge") requestAnimationFrame(() => scrollTo(0, innerHeight));

/* ── cursor ──────────────────────────────────── */
const cur = $(".cursor"), curXY = $("#cur-xy");
let tmx = 0, tmy = 0, mx = 0, my = 0;
addEventListener("pointermove", e => {
  if (e.pointerType === "mouse") {
    document.body.classList.add("has-cursor");
    cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    curXY.textContent = `X${pad(Math.round(e.clientX), 4)} Y${pad(Math.round(e.clientY), 4)}`;
  }
  tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5;
}, { passive: true });
document.addEventListener("pointerleave", () => document.body.classList.remove("has-cursor"));

/* ═════════════════════════════════════════════
   CANVASES
   ═════════════════════════════════════════════ */
const dpr = () => Math.min(devicePixelRatio || 1, 2);

/* data field — corrupted archive matrix (GIR) */
const field = $("#field"), fctx = field.getContext("2d");
const FG = " ·.:-=_▖▗▘▝▚▞▌▐|░";
let fCols, fRows, fCw = 7, fCh = 11, fData, fZone;
function sizeField() {
  const d = dpr();
  field.width = innerWidth * d; field.height = innerHeight * d;
  fctx.setTransform(d, 0, 0, d, 0, 0);
  fctx.font = `10px "Geist Mono", monospace`; fctx.textBaseline = "top";
  fCols = Math.ceil(innerWidth / fCw); fRows = Math.ceil(innerHeight / fCh);
  fData = new Uint8Array(fCols * fRows);
  fZone = new Float32Array(fCols * fRows);
  // density zones: a few rectangles of heavier data, like the reference poster
  const zones = Array.from({ length: 7 }, () => ({ x: Math.random(), y: Math.random(), w: 0.15 + Math.random() * 0.35, h: 0.08 + Math.random() * 0.25, d: 0.4 + Math.random() * 0.6 }));
  for (let y = 0; y < fRows; y++) for (let x = 0; x < fCols; x++) {
    const u = x / fCols, v = y / fRows; let z = 0.12;
    for (const Z of zones) if (u > Z.x && u < Z.x + Z.w && v > Z.y && v < Z.y + Z.h) z = Math.max(z, Z.d);
    if (x % 9 === 0) z *= 0.3; // column gutters
    fZone[y * fCols + x] = z;
    fData[y * fCols + x] = Math.random() < z ? 1 + ((Math.random() * (FG.length - 1)) | 0) : 0;
  }
}
function drawField() {
  for (let n = 0; n < fData.length * 0.015; n++) {
    const i = (Math.random() * fData.length) | 0;
    fData[i] = Math.random() < fZone[i] ? 1 + ((Math.random() * (FG.length - 1)) | 0) : 0;
  }
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let y = 0; y < fRows; y++) {
    let s = "";
    for (let x = 0; x < fCols; x++) s += FG[fData[y * fCols + x]];
    fctx.fillStyle = y % 7 === 0 ? "rgba(235,230,218,.5)" : "rgba(235,230,218,.26)";
    fctx.fillText(s, 0, y * fCh);
  }
}

/* wireframe globe (NORTE / GHOST HARDWARE) */
const globe = $("#globe"), gctx = globe.getContext("2d");
function sizeGlobe() { const r = globe.getBoundingClientRect(), d = dpr(); globe.width = r.width * d || 300; globe.height = r.height * d || 300; }
function drawGlobe(t) {
  const W = globe.width, H = globe.height, R = Math.min(W, H) * 0.4, cx = W / 2, cy = H / 2;
  gctx.clearRect(0, 0, W, H);
  gctx.strokeStyle = "rgba(235,230,218,.85)"; gctx.lineWidth = Math.max(1, W / 360);
  const rot = t * 0.25, tilt = 0.42;
  const proj = (lat, lon) => {
    let x = Math.cos(lat) * Math.cos(lon + rot), y = Math.sin(lat), z = Math.cos(lat) * Math.sin(lon + rot);
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt), z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
    return [cx + x * R, cy - y2 * R, z2];
  };
  const line = pts => { gctx.beginPath(); let pen = false; for (const [x, y, z] of pts) { gctx.globalAlpha = z > 0 ? 0.9 : 0.25; if (!pen) { gctx.moveTo(x, y); pen = true; } else gctx.lineTo(x, y); } gctx.stroke(); };
  for (let i = 1; i < 9; i++) { const lat = -Math.PI / 2 + (i * Math.PI) / 9; line(Array.from({ length: 73 }, (_, j) => proj(lat, (j / 72) * Math.PI * 2))); }
  for (let i = 0; i < 12; i++) { const lon = (i / 12) * Math.PI * 2; line(Array.from({ length: 49 }, (_, j) => proj(-Math.PI / 2 + (j / 48) * Math.PI, lon))); }
  gctx.globalAlpha = 1;
  gctx.beginPath(); gctx.arc(cx, cy, R, 0, Math.PI * 2); gctx.stroke();
  // orbit ring + satellite
  gctx.save(); gctx.translate(cx, cy); gctx.rotate(-0.35);
  gctx.setLineDash([W / 80, W / 120]); gctx.beginPath(); gctx.ellipse(0, 0, R * 1.32, R * 0.32, 0, 0, Math.PI * 2); gctx.stroke(); gctx.setLineDash([]);
  const a = t * 0.9; gctx.fillStyle = "#ebe6da"; gctx.beginPath(); gctx.arc(Math.cos(a) * R * 1.32, Math.sin(a) * R * 0.32, W / 90, 0, Math.PI * 2); gctx.fill();
  gctx.restore();
}

/* ═════════════════════════════════════════════
   SCROLL CHOREOGRAPHY
   ═════════════════════════════════════════════ */
let p = 0, target = 0, isTwo = null, lastField = 0, lastGlobe = 0, lastSlice = 0;
const born = performance.now();
const readScroll = () => (target = clamp(scrollY / Math.max(1, root.scrollHeight - innerHeight)));
addEventListener("scroll", readScroll, { passive: true });
addEventListener("resize", () => { sizeField(); sizeGlobe(); readScroll(); });

const knightEl = $(".knight");
const topR = $("#top-r"), topC = $("#top-c");
const lerp = (a, b, t) => a + (b - a) * t;
const set = (el, k, v) => el.style.setProperty(k, v);

function setAct(two) {
  if (two === isTwo) return;
  isTwo = two;
  document.body.classList.toggle("is-two", two);
  $$(".pager button").forEach((b, i) => b.classList.toggle("on", i === (two ? 1 : 0)));
  scramble(topR, two ? "02 / 02 — FORGE" : "01 / 02 — ARCHIVE");
  if (two) { const st = $("[data-scramble]"); st && scramble(st, st.textContent, 900); }
  $('meta[name="theme-color"]').content = two ? "#09090a" : "#1c36d4";
}

function frame(t) {
  requestAnimationFrame(frame);
  const sec = t / 1000, life = (t - born) / 1000;

  p += (target - p) * (reduced ? 1 : 0.075);
  if (Math.abs(target - p) < 0.0004) p = target;
  mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;

  const k = smooth(0.05, 0.85, p);
  const a1 = 1 - smooth(0.02, 0.45, p);
  const a2 = smooth(0.5, 0.95, p);
  set(root, "--p", p.toFixed(4)); set(root, "--k", k.toFixed(4));
  set(root, "--a1", a1.toFixed(4)); set(root, "--a2", a2.toFixed(4));
  set(root, "--mx", mx.toFixed(3)); set(root, "--my", my.toFixed(3));
  setAct(p > 0.5);

  // intro: letters condense out of blur, swash draws itself, knight scans in
  const intro = reduced ? 9 : life;
  letterEls.forEach((b, i) => {
    set(b, "--in", smooth(0.15 + i * 0.08, 0.9 + i * 0.08, intro).toFixed(3));
    set(b, "--fly", smooth(0.06 + i * 0.035, 0.42 + i * 0.035, p).toFixed(3));
  });
  set($(".swash"), "--draw", (1 - smooth(0.3, 2.2, intro)).toFixed(4));
  set(knightEl, "--reveal", smooth(0.4, 1.8, intro).toFixed(4));

  // blue poster tears away strip by strip
  strips.forEach((s, i) => set(s, "--s", smooth(0.08 + (i % 3) * 0.06 + i * 0.02, 0.5 + (i % 3) * 0.06 + i * 0.02, p).toFixed(4)));

  // knight travels: centre stage → right flank, and turns to x-ray
  const m = smooth(0.15, 0.8, p);
  const narrow = innerWidth < 760;
  set(knightEl, "--kx", `${lerp(50, narrow ? 62 : 81, m)}%`);
  set(knightEl, "--kh", `${lerp(narrow ? 62 : 76, narrow ? 70 : 90, m)}vh`);
  set(knightEl, "--kb", `${lerp(-2, -8, m)}vh`);
  // invert can't be blended (50% = flat grey), so it flickers between states mid-way
  const invT = smooth(0.3, 0.7, p);
  set(knightEl, "--inv", invT <= 0 || invT >= 1 || reduced ? Math.round(invT) : +(Math.random() < invT));
  const mid = k * (1 - k) * 4; // 0 at rest, 1 mid-transition
  set(knightEl, "--gh", (mid * 0.7).toFixed(3));
  set(knightEl, "--gx", (Math.sin(sec * 37) * 14 * mid).toFixed(1));

  // forge reveal
  set(root, "--draw2", smooth(0.55, 1, p).toFixed(4));
  const pt = $(".proj-title"); pt && set(pt, "--wipe", smooth(0.6, 0.98, p).toFixed(4));

  // glitch: during transition, plus a random twitch every few seconds at rest
  if (!reduced) {
    if (mid > 0.08) glitchKnight(Math.random() < 0.6 * mid, 1 + mid);
    else if (t > glitchUntil && Math.random() < 0.004) { glitchUntil = t + 160; }
    else glitchKnight(t < glitchUntil);
    if (t - lastSlice > 70) { lastSlice = t; if (mid > 0.05) shuffleSlices(); }
    slices.forEach(s => set(s, "--sl", (mid > 0.05 && Math.random() < 0.7 ? mid * 0.9 : 0).toFixed(2)));
  }

  if (t - lastField > 90 && p > 0.02) { lastField = t; drawField(); }
  if (t - lastGlobe > 33 && a2 > 0.01) { lastGlobe = t; drawGlobe(sec); }

  // live readout in the header
  if ((t | 0) % 4 === 0) topC.textContent = `SYS ${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(new Date().getSeconds())} · Ψ ${(p * 100).toFixed(1).padStart(5, "0")} · Δ ${(mx * 2).toFixed(3)}`;
}

(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  sizeField(); sizeGlobe(); drawField(); readScroll(); p = target;
  requestAnimationFrame(frame);
});
