const $ = (s, r = document) => r.querySelector(s);
const KEY = "espaciovivo_v2", D = 864e5;
const ICONS = {
  leaf: '<path d="M12 21v-6M12 3 6 12h4l-3 4h10l-3-4h4z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.8-4.4 4.2 1.1 6.1L12 17l-5.5 2.7 1.1-6.1L3.2 9.4l6.1-.8z"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  home: '<path d="M3 11 12 3l9 8M5 10v10h14V10"/>',
  doc: '<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  juegos: '<path d="M4 21 8 3h8l4 18M9 15h6"/>',
  bancas: '<path d="M3 11h18M5 11v7M19 11v7M4 7h16v4"/>',
  luz: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z"/>',
  acceso: '<circle cx="12" cy="4.5" r="2"/><path d="M12 8v6l4 6M12 14l-4 6M6 10h12"/>',
  caminos: '<path d="M9 21 11 3h2l2 18M12 6v2M12 11v2M12 16v2"/>',
  familia: '<circle cx="8" cy="6" r="2"/><circle cx="16" cy="6" r="2"/><path d="M4 20v-6a4 4 0 0 1 8 0v6M12 20v-6a4 4 0 0 1 8 0v6"/>',
  mayores: '<circle cx="10" cy="5" r="2"/><path d="M10 8v7M10 15l-2 6M10 15l2 6M10 10l5 1v10"/>',
  movil: '<circle cx="10" cy="4" r="2"/><path d="M10 7v6h5l3 5M8 10h5M7 14a5 5 0 1 0 7 6"/>',
  jovenes: '<circle cx="12" cy="5" r="2"/><path d="M12 8v6M7 11l5-1 5 1M12 14l-3 7M12 14l3 7"/>',
  ninos: '<circle cx="12" cy="6" r="2.5"/><path d="M8 21v-7a4 4 0 0 1 8 0v7M12 14v7"/>',
  todos: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
};
const ic = (n, s = 24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const CATS = [["juegos", "Juegos"], ["bancas", "Bancas"], ["luz", "Luz"], ["acceso", "Acceso"], ["caminos", "Caminos"], ["leaf", "Verde"]];
const FULL = { Juegos: "Juegos infantiles", Bancas: "Bancas", Luz: "Iluminación", Acceso: "Accesibilidad", Caminos: "Caminos", Verde: "Áreas verdes" };
const QUIEN = [["familia", "Familia"], ["mayores", "Mayores"], ["movil", "Movilidad"], ["jovenes", "Jóvenes"], ["ninos", "Niños"], ["todos", "Todos"]];
const NAV = [["home", "home", "Inicio"], ["props", "doc", "Propuestas"], ["acts", "cal", "Actividades"], ["mine", "user", "Mi participación"]];
const catIcon = c => CATS.find(x => x[0] && x[1] === c)[0];

const seed = () => ({
  user: null, apoyadas: [], inscritas: [], mias: [],
  props: [
    { id: 1, t: "Reparar los columpios", c: "Juegos", q: ["Familia", "Niños"], d: "Los columpios tienen cadenas rotas y son peligrosos para los niños.", m: "Muchas familias usan el parque cada tarde.", a: 24, v: 30, ts: Date.now() - 4 * D, e: "En revisión" },
    { id: 2, t: "Rampa en el camino central", c: "Acceso", q: ["Movilidad", "Mayores"], d: "El camino central tiene un desnivel sin rampa y obliga a rodear por la calle.", m: "Las personas en silla de ruedas no pueden cruzar el parque.", a: 3, v: 5, ts: Date.now() - D, e: "Publicada" },
    { id: 3, t: "Luz en la cancha", c: "Luz", q: ["Jóvenes", "Todos"], d: "Instalar más luminarias en la cancha y en el sector del fondo.", m: "Al anochecer el parque se vacía porque la gente se siente insegura.", a: 11, v: 14, ts: Date.now() - 2 * D, e: "Publicada" },
    { id: 4, t: "Cambiar las bancas rotas", c: "Bancas", q: ["Mayores", "Familia"], d: "Reemplazar las bancas dañadas cerca de los juegos.", m: "Los adultos mayores necesitan lugares seguros para descansar.", a: 17, v: 22, ts: Date.now() - 9 * D, e: "En ejecución" },
    { id: 5, t: "Podar árboles y cortar el pasto", c: "Verde", q: ["Todos"], d: "Mantener las áreas verdes limpias y seguras.", m: "El pasto alto esconde objetos y se ve descuidado.", a: 8, v: 9, ts: Date.now() - 12 * D, e: "Publicada" }
  ],
  acts: [
    { id: 1, t: "Jornada de limpieza del parque", dia: "22", mes: "nov", h: "08:00", l: "Parque Las Palmeras", d: "Recojo de basura y limpieza de caminos.", cupo: 12 },
    { id: 2, t: "Taller de cuidado de áreas verdes", dia: "30", mes: "nov", h: "10:00", l: "Salón vecinal", d: "Aprende a podar y regar las plantas del parque.", cupo: 8 },
    { id: 3, t: "Plantación comunitaria", dia: "06", mes: "dic", h: "09:00", l: "Parque Las Palmeras", d: "Plantamos árboles nuevos entre vecinos.", cupo: 15 }
  ]
});
function load() { try { return { ...seed(), ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return seed(); } }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { } };

let S = load(), view = "home", after = "home", reg = false, last = null;
let filt = { c: null, q: "Todos", o: "recientes" }, draft = { c: "", q: [] }, errs = {};

const chip = (i, t, on, at) => `<button type="button" class="ch${on ? " on" : ""}" aria-pressed="${!!on}" ${at}>${ic(i, 32)}<span>${t}${on ? ic("check", 16) : ""}</span></button>`;
const err = k => errs[k] ? `<p class="err" id="e${k}">${ic("info", 18)} ${errs[k]}</p>` : "";
const inv = k => errs[k] ? ` aria-invalid="true" aria-describedby="e${k}"` : "";
const fld = (k, lab, inp, hint = "") => `<div><label class="lb" for="${k}">${lab}</label>${inp}${hint ? `<p class="sm" style="margin-top:6px">${hint}</p>` : ""}${err(k)}</div>`;

function card(p) {
  const on = S.apoyadas.includes(p.id);
  return `<article class="cd"><h3 class="lb">${esc(p.t)}</h3><span class="pl">${ic(catIcon(p.c), 18)} ${FULL[p.c]}</span><span class="sm">Beneficia a: ${p.q.join(", ")}</span><span class="lb">${ic("heart", 22)} ${p.a} apoyos</span><div class="row"><button class="bt ba" data-act="apoyar" data-id="${p.id}" aria-pressed="${on}">${on ? "Apoyada " + ic("check", 20) : "Apoyar"}</button><button class="bt bo" data-act="det" data-id="${p.id}">Ver detalle</button></div></article>`;
}
function nuevas() {
  const n = S.props.filter(p => p.ts > Date.now() - 7 * D).sort((a, b) => b.ts - a.ts).slice(0, 3);
  return n.length ? `<span class="lb">Propuestas nuevas</span><div class="strip">${n.map(p => `<button class="cd" data-act="det" data-id="${p.id}"><span class="lb">${esc(p.t)}</span><span class="sm">${FULL[p.c]}</span><span class="pl wh">${ic("star", 18)} Nueva</span></button>`).join("")}</div>` : "";
}
function list() {
  const l = S.props.filter(p => (!filt.c || p.c === filt.c) && (filt.q === "Todos" || p.q.includes(filt.q) || p.q.includes("Todos")));
  l.sort((a, b) => filt.o === "apoyadas" ? b.a - a.a : filt.o === "visitas" ? a.v - b.v : b.ts - a.ts);
  const opt = (v, t, cur) => `<option value="${v}"${v === cur ? " selected" : ""}>${t}</option>`;
  return `<span class="lb">Filtrar por categoría</span><div class="gr">${CATS.map(([i, t]) => chip(i, t, filt.c === t, `data-act="cat" data-v="${t}"`)).join("")}</div>
  <div><label class="lb" for="fq">¿A quién beneficia?</label><select class="in" id="fq" data-f="q">${["Todos", ...QUIEN.map(x => x[1])].map(x => opt(x, x, filt.q)).join("")}</select></div>
  <div><label class="lb" for="fo">Ordenar por</label><select class="in" id="fo" data-f="o">${opt("recientes", "Más recientes", filt.o)}${opt("apoyadas", "Más apoyadas", filt.o)}${opt("visitas", "Pocas visitas", filt.o)}</select></div>
  <div class="grid">${l.map(card).join("") || `<div class="cd"><b>No hay propuestas con estos filtros.</b><span>Quita un filtro o crea una propuesta.</span></div>`}</div>`;
}

const V = {
  home: () => `<div class="cd"><label class="lb" for="pq">${ic("pin", 22)} Parque seleccionado</label><select class="in" id="pq"><option>Parque Las Palmeras</option></select></div>
    <button class="bt big" data-act="crear">${ic("plus", 26)} Crear propuesta</button>
    <p class="sm c">Para proponer necesitas una cuenta. Ver y apoyar no la requiere.</p>${nuevas()}${list()}`,
  props: () => `<h1>Propuestas</h1>${list()}`,
  acts: () => `<h1>Actividades comunitarias</h1><div class="grid">${S.acts.map(a => {
    const on = S.inscritas.includes(a.id);
    return `<article class="cd"><div class="row"><div class="dt">${a.dia}<br>${a.mes}</div><h3 class="lb">${esc(a.t)}</h3></div><span class="sm">${a.h} · ${esc(a.l)}</span><p class="sm">${esc(a.d)}</p><span class="pl">Cupos disponibles: ${a.cupo}</span><button class="bt ${on ? "bo" : ""}" data-act="inscribir" data-id="${a.id}" aria-pressed="${on}">${on ? "Inscrito " + ic("check", 20) : "Inscribirme"}</button></article>`;
  }).join("")}</div>`,
  mine: () => {
    const mp = S.props.filter(p => S.mias.includes(p.id)), ap = S.props.filter(p => S.apoyadas.includes(p.id)), ma = S.acts.filter(a => S.inscritas.includes(a.id));
    const row = p => `<div class="cd"><span class="lb">${esc(p.t)}</span><span class="pl wh">${ic("check", 18)} Estado: ${p.e}</span></div>`;
    const sec = (h, l, empty) => `<h2>${h}</h2>${l.length ? l.join("") : `<p class="sm">${empty}</p>`}`;
    const has = mp.length || ma.length;
    return `<h1>Hola, ${esc(S.user.name)}</h1><div class="cd ${has ? "mint" : ""}"><span class="lb">${ic("star", 22)} ${has ? "Vecino colaborador" : "Aún no tienes insignia"}</span><span class="sm">Se gana al publicar propuestas o colaborar en actividades, no por votos.</span></div>
    ${sec("Mis propuestas", mp.map(row), "Todavía no has publicado propuestas.")}${sec("Propuestas que apoyé", ap.map(row), "Aún no has apoyado propuestas.")}
    ${sec("Mis actividades", ma.map(a => `<div class="cd"><span class="lb">${esc(a.t)}</span><span class="sm">${a.dia} ${a.mes} · ${a.h} · ${esc(a.l)}</span></div>`), "No te has inscrito en actividades.")}
    <button class="bt bo" data-act="logout">Cerrar sesión</button>`;
  },
  login: () => `<h1 class="c">Para proponer necesitas una cuenta</h1><div class="cd mist row">${ic("info", 26)}<span>Ver y apoyar propuestas no requiere registro.</span></div>
    <form class="cd" id="auth"><span class="lb">${reg ? "Crear cuenta" : "Ingresar"}</span>
    ${reg ? `<div><label class="sm" for="nm">Nombre</label><input class="in" id="nm" name="nm" required autocomplete="name"></div>` : ""}
    <div><label class="sm" for="em">Correo electrónico</label><input class="in" id="em" name="em" type="email" required autocomplete="email"></div>
    <div><label class="sm" for="pw">Contraseña (mínimo 4 caracteres)</label><input class="in" id="pw" name="pw" type="password" minlength="4" required autocomplete="${reg ? "new-password" : "current-password"}"></div>
    <button class="bt">${reg ? "Crear cuenta" : "Ingresar"}</button></form>
    <p class="c">o</p><button class="bt bo" data-act="reg">${reg ? "Ya tengo cuenta" : "Crear cuenta"}</button>
    <button class="lnk" data-go="home">Seguir viendo propuestas</button>
    <p class="sm c">Demostración local: los datos se guardan solo en este navegador.</p>`,
  new: () => `<div class="row"><button class="pf" data-go="home">${ic("back", 20)} Volver</button><h1>Crear propuesta</h1></div>
    <span class="pl wh">${ic("pin", 18)} Parque Las Palmeras</span>
    <form id="nf" novalidate>
    ${fld("t", "Título de la propuesta", `<input class="in" id="t" name="t" maxlength="80" value="${esc(draft.t)}"${inv("t")}>`, "Ejemplo: Reparar los columpios")}
    <fieldset><legend class="lb">Categoría de mejora (elige una)</legend><div class="gr">${CATS.map(([i, t]) => chip(i, t, draft.c === t, `data-act="dc" data-v="${t}"`)).join("")}</div>${err("c")}</fieldset>
    <fieldset><legend class="lb">¿A quién beneficia? (opcional, varias)</legend><div class="gr">${QUIEN.map(([i, t]) => chip(i, t, draft.q.includes(t), `data-act="dq" data-v="${t}"`)).join("")}</div></fieldset>
    ${fld("d", "Descripción", `<textarea class="in" id="d" name="d" rows="4" maxlength="350"${inv("d")}>${esc(draft.d)}</textarea>`)}
    ${fld("m", "Motivo o justificación", `<textarea class="in" id="m" name="m" rows="3" maxlength="250"${inv("m")}>${esc(draft.m)}</textarea>`, "¿Por qué es importante para los vecinos?")}
    <p class="sm">Título, categoría, descripción y motivo son obligatorios.</p>
    <button class="bt">Publicar propuesta</button><button type="button" class="bt bo" data-go="home">Cancelar</button></form>`,
  done: () => `<div class="ok">${ic("check", 56)}</div><h1 class="c">¡Tu propuesta se registró correctamente!</h1><p class="c">Tus vecinos ya pueden verla y apoyarla.</p>
    <div class="cd mint"><span class="lb">${esc(last.t)}</span><span>Categoría: ${FULL[last.c]}</span><span>Beneficia a: ${last.q.join(", ") || "Sin indicar"}</span><span>Parque: Las Palmeras</span><span class="pl wh">${ic("check", 18)} Estado: Publicada</span></div>
    <button class="bt" data-go="props">Ver otras propuestas</button><button class="bt bo" data-go="home">Volver al inicio</button><button class="lnk" data-go="mine">Ver mis propuestas</button>`
};

function render() {
  const k = document.activeElement;
  const sel = k && k.id ? "#" + k.id : k && k.dataset && k.dataset.v ? `[data-act="${k.dataset.act}"][data-v="${k.dataset.v}"]` : null;
  const html = V[view]();
  $("#app").innerHTML = ["login", "new", "done"].includes(view) ? `<div class="nar">${html}</div>` : html;
  const on = { home: "home", done: "home", props: "props", acts: "acts", mine: "mine" }[view];
  $("#nav").innerHTML = NAV.map(([v, i, t]) => `<button data-go="${v}"${on === v ? ' class="a" aria-current="page"' : ""}>${ic(i)}<span>${t}</span></button>`).join("");
  if (sel) $(sel)?.focus();
}
function go(v) {
  if (!S.user && (v === "new" || v === "mine")) { after = v; v = "login"; }
  view = v; render(); scrollTo(0, 0);
  if (!(["new", "login"].includes(v))) $("#app").focus({ preventScroll: true });
}
let tt;
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2600); }
function detail(p) {
  $("#mc").innerHTML = `<h2 id="mt">${esc(p.t)}</h2><span class="pl">${ic(catIcon(p.c), 18)} ${FULL[p.c]}</span>
  <p><b>Descripción:</b> ${esc(p.d)}</p><p><b>Motivo:</b> ${esc(p.m)}</p><p><b>Beneficia a:</b> ${p.q.join(", ") || "Sin indicar"}</p>
  <span class="pl wh">${ic("check", 18)} Estado: ${p.e}</span><span class="lb">${ic("heart", 22)} ${p.a} apoyos</span>
  <button class="bt ba" data-act="apoyar" data-id="${p.id}">${S.apoyadas.includes(p.id) ? "Apoyada " + ic("check", 20) : "Apoyar"}</button><button class="bt bo" data-act="close">Cerrar</button>`;
  if (!$("#modal").open) $("#modal").showModal();
}

const A = {
  crear: () => go("new"),
  cat: d => { filt.c = filt.c === d.v ? null : d.v; render(); },
  dc: d => { draft.c = d.v; delete errs.c; render(); },
  dq: d => { const q = draft.q; draft.q = d.v === "Todos" ? (q.includes("Todos") ? [] : ["Todos"]) : q.includes(d.v) ? q.filter(x => x !== d.v) : [...q.filter(x => x !== "Todos"), d.v]; render(); },
  det: d => { const p = S.props.find(x => x.id === +d.id); p.v++; save(); detail(p); },
  apoyar: d => {
    const p = S.props.find(x => x.id === +d.id);
    if (S.apoyadas.includes(p.id)) return toast("Ya apoyaste esta propuesta desde este dispositivo.");
    p.a++; S.apoyadas.push(p.id); save(); render(); if ($("#modal").open) detail(p); toast("¡Gracias por apoyar esta propuesta!");
  },
  inscribir: d => {
    const a = S.acts.find(x => x.id === +d.id);
    if (!S.user) { after = "acts"; view = "login"; render(); return toast("Ingresa o crea tu cuenta para inscribirte."); }
    if (S.inscritas.includes(a.id)) return toast("Ya estás inscrito en esta actividad.");
    if (a.cupo < 1) return toast("Esta actividad ya no tiene cupos.");
    a.cupo--; S.inscritas.push(a.id); save(); render(); toast("¡Te inscribiste! Gracias por colaborar.");
  },
  reg: () => { reg = !reg; render(); },
  logout: () => { S.user = null; save(); go("home"); toast("Cerraste sesión."); },
  close: () => $("#modal").close()
};

document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]"); if (g) return go(g.dataset.go);
  const b = e.target.closest("[data-act]"); if (b && A[b.dataset.act]) A[b.dataset.act](b.dataset);
});
document.addEventListener("change", e => { const f = e.target.dataset.f; if (f) { filt[f] = e.target.value; render(); } });
document.addEventListener("input", e => { if (e.target.form && e.target.form.id === "nf") draft[e.target.name] = e.target.value; });
document.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  if (e.target.id === "auth") {
    const em = f.get("em").trim();
    S.user = { name: (f.get("nm") || em.split("@")[0]).trim(), email: em }; save(); reg = false;
    const to = after; after = "home"; go(to); return toast("Sesión iniciada.");
  }
  if (e.target.id === "nf") {
    ["t", "d", "m"].forEach(k => draft[k] = (f.get(k) || "").trim());
    errs = {};
    ["t", "d", "m"].forEach(k => { if (!draft[k]) errs[k] = "Completa este campo."; });
    if (!draft.c) errs.c = "Elige una categoría.";
    if (Object.keys(errs).length) { render(); return ($("[aria-invalid]") || $("#nf .ch"))?.focus(); }
    const p = { id: Date.now(), t: draft.t, c: draft.c, q: draft.q, d: draft.d, m: draft.m, a: 0, v: 0, ts: Date.now(), e: "Publicada" };
    S.props.unshift(p); S.mias.push(p.id); save(); last = p; draft = { c: "", q: [] }; go("done");
  }
});
$("#lg").innerHTML = ic("leaf", 22);
$("#pf").innerHTML = ic("user", 20) + " Mi perfil";
render();
