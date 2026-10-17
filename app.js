import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";
import { ZONAS, CATEGORIAS, elementosDe, RECOMPENSAS_SKULLTULA } from "./data.js";

const SUPABASE_URL = "https://pfqsdiunpfpjlbhojimh.supabase.co";
const SUPABASE_KEY = "sb_publishable_K9Dngp-mR-Y5SNzmZvU0hQ_8JnwbBEN";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const VERSIONES = {
  n64: { nombre: "Nintendo 64", corto: "N64" },
  "3ds": { nombre: "Ocarina of Time 3D", corto: "3DS" },
  switch2: { nombre: "Switch 2 (remake)", corto: "Switch 2" },
};
const EDADES = { n: "Niño", a: "Adulto", na: "Niño o adulto" };
const ORDEN_ZONAS = Object.keys(ZONAS);

// ───────── Estado ─────────
const S = {
  user: null,
  googleActivo: null,
  partidas: [],
  pid: null,
  hechos: new Set(),
  cat: "objetos",
  q: "",
  pendientes: false,
  edad: "",
  zona: "",
  abiertos: new Set(),
};
const $app = document.getElementById("app");
const $cuenta = document.getElementById("cuenta");
const $dlg = document.getElementById("dlg");

// ───────── Utilidades ─────────
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};
let toastT;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("ver");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("ver"), 3200);
}
const partida = () => S.partidas.find((p) => p.id === S.pid);
function nombreDe(it, version) {
  if (it.id === "agonia" && version === "3ds") return "Fragmento de la Agonía";
  return it.n;
}

// ───────── Almacenamiento: local (invitado) o Supabase (cuenta) ─────────
const local = {
  partidas: () => ls.get("oot.partidas", []),
  guardar: (ps) => ls.set("oot.partidas", ps),
  progreso: (pid) => new Set(ls.get(`oot.prog.${pid}`, [])),
  guardarProgreso: (pid, set) => ls.set(`oot.prog.${pid}`, [...set]),
};

const store = {
  async listar() {
    if (!S.user) return local.partidas();
    const { data, error } = await sb.from("partidas").select("*").order("created_at");
    if (error) throw error;
    return data;
  },
  async crear({ nombre, version, master_quest }) {
    if (!S.user) {
      const p = { id: crypto.randomUUID(), nombre, version, master_quest, created_at: new Date().toISOString() };
      local.guardar([...local.partidas(), p]);
      return p;
    }
    const { data, error } = await sb.from("partidas").insert({ nombre, version, master_quest }).select().single();
    if (error) throw error;
    return data;
  },
  async actualizar(id, cambios) {
    if (!S.user) {
      local.guardar(local.partidas().map((p) => (p.id === id ? { ...p, ...cambios } : p)));
      return;
    }
    const { error } = await sb.from("partidas").update(cambios).eq("id", id);
    if (error) throw error;
  },
  async borrar(id) {
    if (!S.user) {
      local.guardar(local.partidas().filter((p) => p.id !== id));
      ls.del(`oot.prog.${id}`);
      return;
    }
    const { error } = await sb.from("partidas").delete().eq("id", id);
    if (error) throw error;
  },
  async progreso(pid) {
    if (!S.user) return local.progreso(pid);
    const ids = new Set();
    for (let desde = 0; ; desde += 1000) {
      const { data, error } = await sb.from("progreso").select("item_id").eq("partida_id", pid).range(desde, desde + 999);
      if (error) throw error;
      data.forEach((r) => ids.add(r.item_id));
      if (data.length < 1000) break;
    }
    return ids;
  },
  async marcar(pid, itemId, valor) {
    if (!S.user) {
      const set = local.progreso(pid);
      valor ? set.add(itemId) : set.delete(itemId);
      local.guardarProgreso(pid, set);
      return;
    }
    const q = valor
      ? sb.from("progreso").upsert({ partida_id: pid, item_id: itemId }, { onConflict: "partida_id,item_id", ignoreDuplicates: true })
      : sb.from("progreso").delete().eq("partida_id", pid).eq("item_id", itemId);
    const { error } = await q;
    if (error) throw error;
  },
};

// Sube a la cuenta las partidas guardadas en este navegador.
async function importarLocales() {
  const locales = local.partidas();
  let n = 0;
  for (const p of locales) {
    const { data, error } = await sb.from("partidas").insert({ nombre: p.nombre, version: p.version, master_quest: p.master_quest }).select().single();
    if (error) throw error;
    const filas = [...local.progreso(p.id)].map((item_id) => ({ partida_id: data.id, item_id }));
    for (let i = 0; i < filas.length; i += 500) {
      const { error: e2 } = await sb.from("progreso").insert(filas.slice(i, i + 500));
      if (e2) throw e2;
    }
    ls.del(`oot.prog.${p.id}`);
    n++;
  }
  local.guardar([]);
  return n;
}

// ───────── Carga ─────────
async function cargarTodo() {
  try {
    S.partidas = await store.listar();
  } catch (e) {
    console.error(e); toast("No se pudieron cargar tus partidas. Revisa tu conexión.");
    S.partidas = [];
  }
  const guardada = ls.get(S.user ? "oot.pid.cuenta" : "oot.pid.local", null);
  S.pid = S.partidas.some((p) => p.id === guardada) ? guardada : S.partidas[0]?.id ?? null;
  await cargarProgreso();
  render();
}
async function cargarProgreso() {
  S.hechos = new Set();
  if (!S.pid) return;
  try { S.hechos = await store.progreso(S.pid); }
  catch (e) { console.error(e); toast("No se pudo cargar el progreso."); }
}
function elegirPartida(id) {
  S.pid = id;
  ls.set(S.user ? "oot.pid.cuenta" : "oot.pid.local", id);
  S.abiertos.clear();
  cargarProgreso().then(render);
}

// ───────── Render: cuenta ─────────
const G_LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.2l7.9 6.2C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z"/><path fill="#FBBC05" d="M10.6 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.2A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l8-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.2 0-11.5-4.1-13.4-9.8l-8 6.2C6.6 42.6 14.6 48 24 48z"/></svg>`;

function renderCuenta() {
  if (S.user) {
    const m = S.user.user_metadata || {};
    const foto = m.avatar_url || m.picture;
    $cuenta.innerHTML = `
      ${foto ? `<img class="avatar" src="${esc(foto)}" alt="" referrerpolicy="no-referrer">` : ""}
      <span class="nombre-u">${esc(m.full_name || m.name || S.user.email)}</span>
      <button class="btn chico" data-acc="salir">Salir</button>`;
  } else {
    $cuenta.innerHTML = `<button class="btn btn-google chico" data-acc="entrar">${G_LOGO}Entrar con Google</button>`;
  }
}

// ───────── Render: bienvenida ─────────
function formPartida({ titulo, boton, p = {} }) {
  const v = p.version || "n64";
  return `
    <form id="form-partida" data-modo="${p.id && p.id !== "nueva" ? "editar" : "crear"}">
      <h2>${titulo}</h2>
      <div class="campo">
        <label for="f-nombre">Nombre de la partida</label>
        <input id="f-nombre" name="nombre" type="text" maxlength="60" required value="${esc(p.nombre || "Mi partida")}" autocomplete="off">
      </div>
      <div class="campo">
        <span>Versión del juego</span>
        <div class="versiones" role="group">
          <button type="button" class="ver" data-ver="n64" aria-pressed="${v === "n64"}"><b>N64</b><small>Original 1998</small></button>
          <button type="button" class="ver" data-ver="3ds" aria-pressed="${v === "3ds"}"><b>3DS</b><small>Remake 2011</small></button>
          <button type="button" class="ver" data-ver="switch2" disabled aria-pressed="false" title="El remake sale el 5 de noviembre de 2026"><b>Switch 2</b><small>Próximamente</small></button>
        </div>
        <input type="hidden" name="version" value="${esc(v)}">
      </div>
      <label class="interruptor"><input type="checkbox" name="mq" ${p.master_quest ? "checked" : ""}> Master Quest (mazmorras alternativas)</label>
      <p class="nota">En Master Quest cambian las 44 Skulltulas de las mazmorras; el tracker usa sus ubicaciones propias.</p>
      <div class="acciones" style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px">
        ${p.id ? `<button type="button" class="btn" data-acc="cerrar-dlg">Cancelar</button>` : ""}
        <button class="btn prim" type="submit">${boton}</button>
      </div>
    </form>`;
}

function avisoImportar() {
  const n = S.user ? local.partidas().length : 0;
  return n ? `<div class="aviso"><p>Tienes ${n} partida(s) guardada(s) en este navegador.</p><button class="btn prim chico" data-acc="importar">Pasarlas a mi cuenta</button></div>` : "";
}

function renderBienvenida() {
  $app.innerHTML = `
    ${avisoImportar()}
    <section class="hero">
      <h1>Completa <span>Ocarina of Time</span> al 100%</h1>
      <p>Marca cada objeto, canción, corazón y Skulltula dorada con un toque, y consulta cómo conseguir lo que te falta. Original de N64 y remake de 3DS.</p>
    </section>
    <div class="tarjeta crear">${formPartida({ titulo: "Empieza tu partida", boton: "Crear partida" })}</div>
    ${!S.user ? `<p class="nota" style="text-align:center;margin-top:12px">Sin cuenta, tu progreso se guarda en este navegador. Entra con Google para tenerlo en cualquier dispositivo.</p>` : ""}
    <div class="ventajas">
      <div><b>245 elementos</b><span>Objetos, equipo, mejoras, canciones, 36 piezas de corazón, 100 Skulltulas y secuencias de intercambio.</span></div>
      <div><b>Guía en cada uno</b><span>Toca un elemento para ver dónde está, con qué edad y qué necesitas.</span></div>
      <div><b>Varias partidas</b><span>Lleva una partida de N64 y otra de 3DS (o Master Quest) por separado.</span></div>
    </div>`;
}

// ───────── Render: tracker ─────────
function calcular(items) {
  const porCat = {};
  for (const c of CATEGORIAS) porCat[c.id] = { total: 0, hechos: 0 };
  let hechos = 0;
  for (const it of items) {
    porCat[it.cat].total++;
    if (S.hechos.has(it.id)) { porCat[it.cat].hechos++; hechos++; }
  }
  return { total: items.length, hechos, porCat };
}

function filtrar(items, p) {
  const q = norm(S.q.trim());
  return items.filter((it) => {
    if (it.cat !== S.cat) return false;
    if (S.pendientes && S.hechos.has(it.id)) return false;
    if (S.edad && it.e !== S.edad && it.e !== "na") return false;
    if (S.zona && it.z !== S.zona) return false;
    if (q) {
      const txt = norm([nombreDe(it, p.version), it.en, ZONAS[it.z], it.req, it.g].join(" "));
      if (!q.split(/\s+/).every((w) => txt.includes(w))) return false;
    }
    return true;
  });
}

const ICO_CHECK = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICO_CHEV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Skulltulas y corazones se identifican mejor por su ubicación que por su nombre.
const esUbicacion = (it) => it.cat === "skulltulas" || it.cat === "corazones";

function htmlItem(it, p) {
  const hecho = S.hechos.has(it.id);
  const abierto = S.abiertos.has(it.id);
  const nota = it.v?.[p.version];
  return `
    <article class="item ${hecho ? "hecho" : ""} ${abierto ? "abierto" : ""}" data-id="${it.id}">
      <div class="item-cab">
        <button class="check" data-acc="marcar" aria-pressed="${hecho}" aria-label="${hecho ? "Desmarcar" : "Marcar"} ${esc(nombreDe(it, p.version))}">${ICO_CHECK}</button>
        <button class="item-txt" data-acc="abrir" aria-expanded="${abierto}">
          <b>${esc(nombreDe(it, p.version))}${it.en && !esUbicacion(it) ? `<span class="en">${esc(it.en)}</span>` : ""}</b>
          ${esUbicacion(it) ? `<span class="resumen-g">${esc(it.g)}</span>` : ""}
          <span class="meta">
            ${S.cat !== "skulltulas" && S.cat !== "corazones" ? `<span class="tag">${esc(ZONAS[it.z])}</span>` : ""}
            <span class="tag ${it.e === "na" ? "" : it.e}">${EDADES[it.e]}</span>
            ${it.noche ? `<span class="tag noche">De noche</span>` : ""}
            ${it.req ? `<span class="tag">${esc(it.req)}</span>` : ""}
          </span>
        </button>
        <button class="chev" data-acc="abrir" aria-label="Ver guía">${ICO_CHEV}</button>
      </div>
      <div class="guia">
        <p>${esc(it.g)}</p>
        <p class="req"><b>Dónde:</b> ${esc(ZONAS[it.z])} · <b>Edad:</b> ${EDADES[it.e]}${it.noche ? " · <b>Solo de noche</b>" : ""}${it.req ? ` · <b>Necesitas:</b> ${esc(it.req)}` : ""}</p>
        ${nota ? `<p class="vnota">Nota ${VERSIONES[p.version].corto}: ${esc(nota)}</p>` : ""}
      </div>
    </article>`;
}

function htmlLista(lista, p) {
  if (!lista.length) {
    return `<p class="vacio">${S.pendientes && !S.q && !S.zona && !S.edad ? "¡Completaste esta categoría! 🎉" : "No hay elementos con estos filtros."}</p>`;
  }
  const agrupar = S.cat === "skulltulas" || S.cat === "corazones";
  if (S.cat === "extras") {
    const grupos = {};
    lista.forEach((it) => (grupos[it.grupo] ||= []).push(it));
    return Object.entries(grupos).map(([g, its]) => `<h3 class="grupo-t"><span>${esc(g)}</span></h3>${its.map((it) => htmlItem(it, p)).join("")}`).join("");
  }
  if (!agrupar) return lista.map((it) => htmlItem(it, p)).join("");
  const grupos = {};
  lista.forEach((it) => (grupos[it.z] ||= []).push(it));
  return Object.keys(grupos)
    .sort((a, b) => ORDEN_ZONAS.indexOf(a) - ORDEN_ZONAS.indexOf(b))
    .map((z) => {
      const its = grupos[z];
      const h = its.filter((it) => S.hechos.has(it.id)).length;
      return `<h3 class="grupo-t"><span>${esc(ZONAS[z])}</span><span>${h}/${its.length}</span></h3>${its.map((it) => htmlItem(it, p)).join("")}`;
    }).join("");
}

function renderTracker() {
  const p = partida();
  const items = elementosDe(p);
  const r = calcular(items);
  const pct = r.total ? Math.floor((r.hechos / r.total) * 1000) / 10 : 0;
  const C = 2 * Math.PI * 54;
  const zonasCat = [...new Set(items.filter((it) => it.cat === S.cat).map((it) => it.z))]
    .sort((a, b) => ORDEN_ZONAS.indexOf(a) - ORDEN_ZONAS.indexOf(b));
  if (S.zona && !zonasCat.includes(S.zona)) S.zona = "";
  const fichas = items.filter((it) => it.cat === "skulltulas" && S.hechos.has(it.id)).length;

  $app.innerHTML = `
    ${!S.user ? `<div class="aviso"><p>Estás sin cuenta: el progreso se guarda solo en este navegador.</p><button class="btn btn-google chico" data-acc="entrar">${G_LOGO}Guardar en mi cuenta</button></div>` : ""}
    ${avisoImportar()}

    <div class="partida-bar">
      <select id="sel-partida" aria-label="Partida">
        ${S.partidas.map((x) => `<option value="${x.id}" ${x.id === S.pid ? "selected" : ""}>${esc(x.nombre)}</option>`).join("")}
      </select>
      <span class="etiqueta-ver">${VERSIONES[p.version]?.corto || p.version}${p.master_quest ? " · Master Quest" : ""}</span>
      <button class="btn chico" data-acc="nueva">+ Nueva</button>
      <button class="btn chico" data-acc="opciones">Opciones</button>
    </div>

    <section class="resumen">
      <div class="anillo" role="img" aria-label="${pct}% completado">
        <svg viewBox="0 0 120 120"><circle class="pista" cx="60" cy="60" r="54" fill="none" stroke-width="10"/><circle class="valor" cx="60" cy="60" r="54" fill="none" stroke-width="10" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - r.hechos / (r.total || 1))}"/></svg>
        <div class="centro"><b>${pct}%</b><small>${r.hechos} / ${r.total}</small></div>
      </div>
      <div class="barras">
        ${CATEGORIAS.map((c) => {
          const x = r.porCat[c.id];
          const w = x.total ? (x.hechos / x.total) * 100 : 0;
          return `<button class="barra ${x.hechos === x.total ? "completa" : ""} ${c.id === S.cat ? "activa" : ""}" data-acc="cat" data-cat="${c.id}">
            <span class="fila"><span>${c.nombre}</span><span>${x.hechos}/${x.total}</span></span>
            <span class="riel"><i style="width:${w}%"></i></span></button>`;
        }).join("")}
      </div>
    </section>

    <nav class="pestanas" role="tablist">
      ${CATEGORIAS.map((c) => `<button class="pestana" role="tab" data-acc="cat" data-cat="${c.id}" aria-selected="${c.id === S.cat}">${c.corto}<em>${r.porCat[c.id].hechos}/${r.porCat[c.id].total}</em></button>`).join("")}
    </nav>

    <div class="filtros">
      <label class="buscar"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5" stroke-linecap="round"/></svg>
        <input id="f-buscar" type="search" placeholder="Buscar (ej. gancho, lago, noche…)" value="${esc(S.q)}" aria-label="Buscar"></label>
      <button class="chip-f" data-acc="pendientes" aria-pressed="${S.pendientes}">Solo pendientes</button>
      <select id="f-edad" aria-label="Edad">
        <option value="">Todas las edades</option>
        <option value="n" ${S.edad === "n" ? "selected" : ""}>Link niño</option>
        <option value="a" ${S.edad === "a" ? "selected" : ""}>Link adulto</option>
      </select>
      ${zonasCat.length > 1 ? `<select id="f-zona" aria-label="Zona"><option value="">Todas las zonas</option>${zonasCat.map((z) => `<option value="${z}" ${S.zona === z ? "selected" : ""}>${esc(ZONAS[z])}</option>`).join("")}</select>` : ""}
    </div>

    ${S.cat === "skulltulas" ? `<div class="recompensas" aria-label="Recompensas de la Casa de las Skulltulas">${RECOMPENSAS_SKULLTULA.map(([n, txt]) =>
      `<span class="${fichas >= n ? "ok" : ""}">${n}: ${n === 20 && p.version === "3ds" ? "Fragmento de la Agonía" : txt}</span>`).join("")}</div>` : ""}
    ${p.master_quest && S.cat === "skulltulas" ? `<p class="nota" style="margin-top:10px">Master Quest: las Skulltulas fuera de mazmorras no cambian.${p.version === "3ds" ? " En 3DS el mundo de Master Quest está en espejo (izquierda y derecha invertidas)." : ""}</p>` : ""}

    <div id="lista" class="lista">${htmlLista(filtrar(items, p), p)}</div>`;
}

function render() {
  renderCuenta();
  if (!S.partidas.length || !partida()) renderBienvenida();
  else renderTracker();
}
function renderLista() {
  const p = partida();
  const el = document.getElementById("lista");
  if (el && p) el.innerHTML = htmlLista(filtrar(elementosDe(p), p), p);
}

// ───────── Diálogos ─────────
function abrirDlg(html) { $dlg.innerHTML = html; $dlg.showModal(); }
function dlgNueva() {
  abrirDlg(formPartida({ titulo: "Nueva partida", boton: "Crear", p: { id: "nueva", nombre: `Partida ${S.partidas.length + 1}` } }));
}
function dlgOpciones() {
  const p = partida();
  abrirDlg(`${formPartida({ titulo: "Opciones de la partida", boton: "Guardar", p })}
    <div class="separa"></div>
    <div class="acciones" style="justify-content:space-between">
      <button class="btn chico" data-acc="reiniciar">Reiniciar progreso</button>
      <button class="btn chico peligro" data-acc="borrar">Borrar partida</button>
    </div>`);
}

// ───────── Acciones ─────────
async function entrar() {
  if (S.googleActivo === false) {
    toast("El inicio con Google aún no está activado en el servidor. Tu progreso sigue guardado en este navegador.");
    return;
  }
  const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin } });
  if (error) toast("No se pudo iniciar sesión: " + error.message);
}

async function marcar(id) {
  const p = partida(); if (!p) return;
  const valor = !S.hechos.has(id);
  valor ? S.hechos.add(id) : S.hechos.delete(id);
  actualizarVista();
  try { await store.marcar(p.id, id, valor); }
  catch (e) {
    console.error(e);
    valor ? S.hechos.delete(id) : S.hechos.add(id);
    actualizarVista();
    toast("No se guardó el cambio. Revisa tu conexión e inténtalo de nuevo.");
  }
}

// Re-render conservando el foco y el scroll.
function actualizarVista() {
  const y = window.scrollY;
  const activo = document.activeElement;
  const idFoco = activo?.closest?.(".item")?.dataset.id;
  const accFoco = activo?.dataset?.acc;
  renderTracker();
  window.scrollTo(0, y);
  if (idFoco) document.querySelector(`.item[data-id="${idFoco}"] [data-acc="${accFoco}"]`)?.focus({ preventScroll: true });
}

async function guardarForm(form) {
  const fd = new FormData(form);
  const datos = {
    nombre: String(fd.get("nombre") || "").trim().slice(0, 60) || "Mi partida",
    version: fd.get("version") === "3ds" ? "3ds" : "n64",
    master_quest: fd.get("mq") === "on",
  };
  const btn = form.querySelector("[type=submit]");
  btn.disabled = true;
  try {
    if (form.dataset.modo === "editar") {
      await store.actualizar(S.pid, datos);
      Object.assign(partida(), datos);
      $dlg.close(); render(); toast("Partida actualizada");
    } else {
      const p = await store.crear(datos);
      S.partidas.push(p);
      if ($dlg.open) $dlg.close();
      S.cat = "objetos";
      elegirPartida(p.id);
      toast(`Partida «${p.nombre}» creada`);
    }
  } catch (e) {
    console.error(e); toast("No se pudo guardar la partida.");
  } finally { btn.disabled = false; }
}

document.addEventListener("click", async (ev) => {
  const el = ev.target.closest("[data-acc]");
  if (!el) return;
  const acc = el.dataset.acc;
  const item = el.closest(".item");
  switch (acc) {
    case "entrar": entrar(); break;
    case "salir": await sb.auth.signOut(); break;
    case "marcar": marcar(item.dataset.id); break;
    case "abrir": {
      const id = item.dataset.id;
      S.abiertos.has(id) ? S.abiertos.delete(id) : S.abiertos.add(id);
      item.classList.toggle("abierto");
      item.querySelector(".item-txt").setAttribute("aria-expanded", S.abiertos.has(id));
      break;
    }
    case "cat":
      S.cat = el.dataset.cat; S.zona = ""; S.abiertos.clear();
      renderTracker();
      if (el.classList.contains("barra")) document.querySelector(".filtros")?.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelector(`.pestana[data-cat="${S.cat}"]`)?.scrollIntoView({ inline: "center", block: "nearest" });
      break;
    case "pendientes": S.pendientes = !S.pendientes; el.setAttribute("aria-pressed", S.pendientes); renderLista(); break;
    case "nueva": dlgNueva(); break;
    case "opciones": dlgOpciones(); break;
    case "cerrar-dlg": $dlg.close(); break;
    case "reiniciar": {
      if (!confirm("¿Desmarcar todo el progreso de esta partida?")) return;
      try {
        if (S.user) { const { error } = await sb.from("progreso").delete().eq("partida_id", S.pid); if (error) throw error; }
        else local.guardarProgreso(S.pid, new Set());
        S.hechos.clear(); $dlg.close(); render(); toast("Progreso reiniciado");
      } catch (e) { console.error(e); toast("No se pudo reiniciar."); }
      break;
    }
    case "borrar": {
      const p = partida();
      if (!confirm(`¿Borrar la partida «${p.nombre}» y todo su progreso? No se puede deshacer.`)) return;
      try {
        await store.borrar(p.id);
        S.partidas = S.partidas.filter((x) => x.id !== p.id);
        $dlg.close();
        if (S.partidas[0]) elegirPartida(S.partidas[0].id); else { S.pid = null; render(); }
        toast("Partida borrada");
      } catch (e) { console.error(e); toast("No se pudo borrar."); }
      break;
    }
    case "importar": {
      el.disabled = true;
      try { const n = await importarLocales(); toast(`${n} partida(s) pasadas a tu cuenta`); await cargarTodo(); }
      catch (e) { console.error(e); toast("No se pudieron importar. Inténtalo de nuevo."); el.disabled = false; }
      break;
    }
  }
});

document.addEventListener("click", (ev) => {
  const b = ev.target.closest(".ver[data-ver]");
  if (!b || b.disabled) return;
  const form = b.closest("form");
  form.querySelectorAll(".ver").forEach((x) => x.setAttribute("aria-pressed", x === b));
  form.elements.version.value = b.dataset.ver;
});

document.addEventListener("submit", (ev) => {
  if (ev.target.id !== "form-partida") return;
  ev.preventDefault();
  guardarForm(ev.target);
});

document.addEventListener("change", (ev) => {
  const t = ev.target;
  if (t.id === "sel-partida") elegirPartida(t.value);
  if (t.id === "f-edad") { S.edad = t.value; renderLista(); }
  if (t.id === "f-zona") { S.zona = t.value; renderLista(); }
});
document.addEventListener("input", (ev) => {
  if (ev.target.id === "f-buscar") { S.q = ev.target.value; renderLista(); }
});

// ───────── Arranque ─────────
fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY } })
  .then((r) => r.json()).then((s) => { S.googleActivo = !!s?.external?.google; }).catch(() => {});

let ultimoUid;
sb.auth.onAuthStateChange((_evt, session) => {
  const uid = session?.user?.id ?? null;
  S.user = session?.user ?? null;
  if (uid === ultimoUid) { renderCuenta(); return; }
  ultimoUid = uid;
  setTimeout(cargarTodo, 0);
});
