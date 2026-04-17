import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

// ── Brand colors ─────────────────────────────────────────────────────────────
const B = {
  blue:      "#0342FC",   // azul principal
  blueLight: "#7B9CC0",   // azul secundario / sombra del logo
  blueDark:  "#0230B8",   // azul oscuro para hover/fondos
  bluePale:  "#E8EFFE",   // azul muy claro para fondos suaves
  white:     "#FFFFFF",
  gray50:    "#F8F9FF",
  gray100:   "#EEF1FB",
  gray300:   "#C5CEEA",
  gray500:   "#6B7A9F",
  gray700:   "#2D3A5E",
  text:      "#0D1B4B",   // casi negro azulado
};

// ── Logo SVG (recreado fielmente del original) ────────────────────────────────
const LOGO_SRC = "data:image/png;base64,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";

const Logo = ({ height = 44 }) => (
  <img src={LOGO_SRC} alt="Formando Campeones" style={{ height, width:"auto", display:"block" }} />
);

const LogoWhite = ({ height = 44 }) => (
  <img src={LOGO_SRC} alt="Formando Campeones" style={{ height, width:"auto", display:"block", filter:"brightness(0) invert(1)" }} />
);

// ── Google Drive via Claude API + MCP ────────────────────────────────────────
const DRIVE_FILENAME = "formando_campeones_crm.json";

async function callClaude(messages, systemPrompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
      mcp_servers: [{ type: "url", url: "https://drivemcp.googleapis.com/mcp/v1", name: "google-drive" }],
    }),
  });
  return await res.json();
}

async function buscarArchivoEnDrive() {
  const data = await callClaude(
    [{ role: "user", content: `Busca en Google Drive un archivo llamado exactamente "${DRIVE_FILENAME}". Si existe, devuelve SOLO el file ID. Si no existe responde: NO_EXISTE` }],
    "Responde ÚNICAMENTE con el file ID o con NO_EXISTE."
  );
  const txt = data.content?.filter(b => b.type === "text").map(b => b.text).join("").trim();
  if (!txt || txt === "NO_EXISTE") return null;
  const m = txt.match(/[A-Za-z0-9_-]{20,}/);
  return m ? m[0] : null;
}

async function leerArchivoDrive(fileId) {
  const data = await callClaude(
    [{ role: "user", content: `Lee el archivo de Google Drive con ID: ${fileId}. Devuelve SOLO el JSON.` }],
    "Devuelve SOLO el contenido del archivo sin explicaciones."
  );
  const txt = data.content?.filter(b => b.type === "text").map(b => b.text).join("").trim();
  try { return JSON.parse(txt.replace(/```json|```/g, "").trim()); } catch { return null; }
}

async function guardarEnDrive(datos, fid) {
  const json = JSON.stringify(datos, null, 2);
  const msg = fid
    ? `Actualiza el archivo de Google Drive con ID "${fid}" con este JSON (reemplaza todo):\n\n${json}\n\nResponde SOLO con el file ID.`
    : `Crea un archivo en Google Drive llamado "${DRIVE_FILENAME}" con este JSON:\n\n${json}\n\nResponde SOLO con el file ID.`;
  const data = await callClaude([{ role: "user", content: msg }], "Responde ÚNICAMENTE con el file ID.");
  const txt = data.content?.filter(b => b.type === "text").map(b => b.text).join("").trim();
  const m = txt.match(/[A-Za-z0-9_-]{20,}/);
  return m ? m[0] : fid;
}

async function loadLocal(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}
async function saveLocal(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

// ── Seed data ────────────────────────────────────────────────────────────────
const SEED_P = [
  { id:"p1", nombre:"Fundación Educacional Pedregales", contacto:"Directora María González", email:"mgonzalez@pedregales.cl", telefono:"+56 9 8765 4321", estado:"cliente", notas:"Contrato firmado abril 2026. Talleres de Flamenco, Fútbol y Hockey.", creadoEn:"2026-01-15" },
  { id:"p2", nombre:"Colegio San Ignacio El Bosque", contacto:"Coordinador Pedro Soto", email:"psoto@sanignacio.cl", telefono:"+56 9 1234 5678", estado:"negociacion", notas:"Interesados en talleres de fútbol y básquetbol.", creadoEn:"2026-03-20" },
  { id:"p3", nombre:"Instituto Chileno-Británico", contacto:"Carolina Muñoz", email:"cmunoz@chileno-britanico.cl", telefono:"+56 9 9988 7766", estado:"prospecto", notas:"Contacto inicial por Instagram. Piden propuesta.", creadoEn:"2026-04-10" },
];
const SEED_D = [
  { id:"d1", prospectoId:"p1", tipo:"contrato", titulo:"Contrato Talleres 2026 - Pedregales", fecha:"2026-04-16", estado:"firmado" },
];

const ESTADOS = [
  { id:"prospecto",   label:"Prospecto",        color:"#6B7A9F" },
  { id:"contactado",  label:"Contactado",        color:"#0342FC" },
  { id:"negociacion", label:"Negociación",       color:"#F59E0B" },
  { id:"propuesta",   label:"Propuesta enviada", color:"#8B5CF6" },
  { id:"cliente",     label:"Cliente",           color:"#10B981" },
  { id:"perdido",     label:"Perdido",           color:"#EF4444" },
];
const TALLERES_BASE = ["Fútbol","Flamenco","Gimnasia Artística","Hockey","Básquetbol","Tenis","Natación","Yoga","Teatro"];
const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const EDADES = ["PK y K","1 a 2 Básico","1 a 3 Básico","3 a 5 Básico","6 a 8 Básico","1 a 4 Medio"];

const uid = () => "id" + Math.random().toString(36).slice(2,9);
const hoy = () => new Date().toISOString().split("T")[0];
const fmt = d => { if(!d) return ""; const [y,m,dd]=d.split("-"); return `${dd}/${m}/${y}`; };

function genContrato({ colegio,rep,domicilio,fecha,talleres,vigencia,personeria,repNombre,repRut }) {
  const tab = talleres.length ? talleres.map(t=>`  • ${t.taller} | ${t.edades} | ${t.dia} | ${t.hora}`).join("\n") : "  [Sin talleres definidos]";
  return `CONTRATO DE TALLERES EXTRAPROGRAMÁTICOS\n\nEn Santiago, a ${fecha||hoy()}, entre ${colegio||"___"}, representada por don ${rep||"___"}, domiciliado en ${domicilio||"___"}, en adelante "El Colegio"; y FORMANDO CAMPEONES SpA, RUT N° 77.504.341-5, representada por don Francisco de Borja Vicuña Alliende.\n\nSEGUNDO: INVERSIÓN\nFormando Campeones invirtió en la instalación de Pasto Sintético a cambio de realizar talleres hasta diciembre 2026. Otorgará al Colegio el 7,5% de las ventas de talleres no deportivos.\n\nTERCERO: TALLERES\n${tab}\n\nVIGENCIA: ${vigencia||"___"}\n\n${personeria||"Personería del Colegio: ___"}\n\n___________________________          ___________________________\nFrancisco de Borja Vicuña            ${repNombre||"___"}\nRUT: 16.608.287-0                    RUT: ${repRut||"___"}\n`;
}
function genCotizacion({ colegio,contacto,fecha,talleres,porcentaje,notas }) {
  const tab = talleres.length ? talleres.map(t=>`  • ${t.taller} | ${t.edades} | ${t.dia} | ${t.hora}${t.precio?` | $${Number(t.precio).toLocaleString("es-CL")} mensual`:""}`).join("\n") : "  [Sin talleres]";
  return `COTIZACIÓN DE TALLERES EXTRAPROGRAMÁTICOS\nFORMANDO CAMPEONES SpA\n\nFecha: ${fecha||hoy()}\nPara: ${colegio||"___"} · Atención: ${contacto||"___"}\n\nTALLERES:\n${tab}\n\nCONDICIONES:\n• El Colegio recibe el ${porcentaje||"7,5"}% de ingresos de talleres no deportivos.\n${notas?`\nNOTAS: ${notas}\n`:""}\nValidez: 30 días.\n\n___________________________\nFrancisco de Borja Vicuña · Formando Campeones SpA\n`;
}

// ── UI primitivos ─────────────────────────────────────────────────────────────
const Badge = ({ estado }) => {
  const e = ESTADOS.find(s=>s.id===estado)||ESTADOS[0];
  return <span style={{ background:e.color+"18", color:e.color, border:`1px solid ${e.color}40`, padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.4 }}>{e.label}</span>;
};

const Modal = ({ title, onClose, children }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(3,66,252,0.12)", backdropFilter:"blur(4px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
    <div style={{ background:B.white, borderRadius:20, width:"100%", maxWidth:700, maxHeight:"90vh", overflow:"auto", boxShadow:`0 24px 64px rgba(3,66,252,0.18)`, border:`1px solid ${B.gray100}` }}>
      <div style={{ padding:"22px 28px 16px", borderBottom:`1px solid ${B.gray100}`, display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:B.white, zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:4, height:22, background:B.blue, borderRadius:4 }} />
          <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:17, fontWeight:800, color:B.text }}>{title}</span>
        </div>
        <button onClick={onClose} style={{ border:"none", background:B.gray100, width:30, height:30, borderRadius:8, cursor:"pointer", fontSize:16, color:B.gray500, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
      </div>
      <div style={{ padding:"22px 28px 28px" }}>{children}</div>
    </div>
  </div>
);

const Inp = ({ label, ...p }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={{ display:"block", fontSize:11, fontWeight:700, color:B.gray500, textTransform:"uppercase", letterSpacing:0.8, marginBottom:5 }}>{label}</label>}
    <input {...p} style={{ width:"100%", padding:"9px 12px", border:`1.5px solid ${B.gray300}`, borderRadius:9, fontSize:14, color:B.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border .15s", ...p.style }}
      onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.gray300} />
  </div>
);
const Txta = ({ label, ...p }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={{ display:"block", fontSize:11, fontWeight:700, color:B.gray500, textTransform:"uppercase", letterSpacing:0.8, marginBottom:5 }}>{label}</label>}
    <textarea {...p} style={{ width:"100%", padding:"9px 12px", border:`1.5px solid ${B.gray300}`, borderRadius:9, fontSize:14, color:B.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", minHeight:80, ...p.style }} />
  </div>
);
const Sel = ({ label, options, ...p }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={{ display:"block", fontSize:11, fontWeight:700, color:B.gray500, textTransform:"uppercase", letterSpacing:0.8, marginBottom:5 }}>{label}</label>}
    <select {...p} style={{ width:"100%", padding:"9px 12px", border:`1.5px solid ${B.gray300}`, borderRadius:9, fontSize:14, color:B.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit", background:B.white }}>
      {options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
    </select>
  </div>
);
const Btn = ({ children, variant="primary", ...p }) => {
  const s = {
    primary:   { background:B.blue,     color:B.white,   border:"none", boxShadow:`0 4px 14px rgba(3,66,252,0.3)` },
    secondary: { background:B.gray100,  color:B.gray700, border:"none", boxShadow:"none" },
    danger:    { background:"#FEE2E2",  color:"#DC2626", border:"none", boxShadow:"none" },
    outline:   { background:"transparent", color:B.blue, border:`1.5px solid ${B.blue}`, boxShadow:"none" },
    green:     { background:"#D1FAE5",  color:"#065F46", border:"none", boxShadow:"none" },
  };
  return <button {...p} style={{ ...s[variant], padding:"9px 18px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"opacity .15s", ...p.style }}
    onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{children}</button>;
};


const ModalConfirm = ({ mensaje, onConfirm, onCancel }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(3,66,252,0.15)", backdropFilter:"blur(4px)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
    <div style={{ background:B.white, borderRadius:16, padding:"28px 24px", maxWidth:320, width:"100%", boxShadow:`0 20px 50px rgba(3,66,252,0.2)`, textAlign:"center" }}>
      <div style={{ fontSize:36, marginBottom:12 }}>🗑️</div>
      <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:B.text, marginBottom:8 }}>¿Confirmar eliminación?</div>
      <div style={{ fontSize:13, color:B.gray500, marginBottom:24 }}>{mensaje}</div>
      <div style={{ display:"flex", gap:10 }}>
        <Btn variant="secondary" onClick={onCancel} style={{ flex:1 }}>Cancelar</Btn>
        <Btn variant="danger" onClick={onConfirm} style={{ flex:1, background:"#EF4444", color:"#fff" }}>Eliminar</Btn>
      </div>
    </div>
  </div>
);

const SyncBadge = ({ estado }) => {
  const cfg = {
    idle:    { color:"#10B981", bg:"#D1FAE5", icon:"✓", label:"Drive sincronizado" },
    saving:  { color:B.blue,    bg:B.bluePale, icon:"⟳", label:"Guardando…" },
    error:   { color:"rgba(255,255,255,0.7)", bg:"rgba(255,255,255,0.15)", icon:"💾", label:"Local" },
    loading: { color:B.blue,    bg:B.bluePale, icon:"⟳", label:"Conectando…" },
  }[estado]||{};
  return <span style={{ background:cfg.bg, color:cfg.color, padding:"5px 13px", borderRadius:20, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
    <span style={{ display:"inline-block", animation:["saving","loading"].includes(estado)?"spin 1s linear infinite":"none" }}>{cfg.icon}</span>{cfg.label}
  </span>;
};

// ── KPI Card ──────────────────────────────────────────────────────────────────
const KPICard = ({ label, val, icon, accent }) => (
  <div style={{ background:B.white, borderRadius:14, padding:"18px 22px", border:`1px solid ${B.gray100}`, boxShadow:`0 2px 12px rgba(3,66,252,0.06)`, display:"flex", alignItems:"center", gap:14 }}>
    <div style={{ width:46, height:46, borderRadius:12, background:accent+"14", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
    <div>
      <div style={{ fontSize:26, fontWeight:800, color:accent, fontFamily:"'Nunito',sans-serif", lineHeight:1 }}>{val}</div>
      <div style={{ fontSize:11, color:B.gray500, fontWeight:600, textTransform:"uppercase", letterSpacing:0.6, marginTop:3 }}>{label}</div>
    </div>
  </div>
);

// ── Modales ───────────────────────────────────────────────────────────────────
function ModalProspecto({ prospecto, onSave, onClose }) {
  const [f, setF] = useState(prospecto||{id:uid(),nombre:"",contacto:"",email:"",telefono:"",estado:"prospecto",notas:"",creadoEn:hoy()});
  const s=(k,v)=>setF(x=>({...x,[k]:v}));
  return (
    <Modal title={prospecto?"Editar Prospecto":"Nuevo Prospecto"} onClose={onClose}>
      <Inp label="Nombre del Colegio / Institución" value={f.nombre} onChange={e=>s("nombre",e.target.value)} placeholder="Ej: Colegio San Ignacio" />
      <Inp label="Nombre del Contacto" value={f.contacto} onChange={e=>s("contacto",e.target.value)} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Inp label="Email" value={f.email} onChange={e=>s("email",e.target.value)} />
        <Inp label="Teléfono" value={f.telefono} onChange={e=>s("telefono",e.target.value)} />
      </div>
      <Sel label="Estado" value={f.estado} onChange={e=>s("estado",e.target.value)} options={ESTADOS.map(e=>({value:e.id,label:e.label}))} />
      <Txta label="Notas" value={f.notas} onChange={e=>s("notas",e.target.value)} placeholder="Observaciones, historial, próximos pasos..." />
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn onClick={()=>{ if(f.nombre) onSave(f); }}>Guardar</Btn>
      </div>
    </Modal>
  );
}

function ModalDocumento({ doc, prospectos, onSave, onClose }) {
  const [f, setF] = useState(doc||{id:uid(),prospectoId:prospectos[0]?.id||"",tipo:"contrato",titulo:"",fecha:hoy(),estado:"borrador"});
  const [talleres, setTalleres] = useState(doc?._talleres||[]);
  const [ec, setEc] = useState(doc?._ec||{rep:"",domicilio:"",vigencia:"31 de diciembre de 2026",personeria:"",repNombre:"",repRut:""});
  const [eq, setEq] = useState(doc?._eq||{porcentaje:"7,5",notas:""});
  const [preview, setPreview] = useState(doc?._texto||"");
  const [tab, setTab] = useState("datos");
  const s=(k,v)=>setF(x=>({...x,[k]:v}));
  const prosp=prospectos.find(p=>p.id===f.prospectoId);
  const addT=()=>setTalleres(t=>[...t,{id:uid(),taller:"Fútbol",edades:"PK y K",dia:"Martes",hora:"13:45 a 15:00",precio:""}]);
  const updT=(id,k,v)=>setTalleres(t=>t.map(x=>x.id===id?{...x,[k]:v}:x));
  const delT=(id)=>setTalleres(t=>t.filter(x=>x.id!==id));
  const genP=()=>{ const base={colegio:prosp?.nombre,contacto:prosp?.contacto,fecha:f.fecha,talleres}; setPreview(f.tipo==="contrato"?genContrato({...base,...ec}):genCotizacion({...base,...eq})); setTab("preview"); };
  const guardar=()=>{ if(!f.prospectoId) return; const titulo=f.titulo||`${f.tipo==="contrato"?"Contrato":"Cotización"} - ${prosp?.nombre} - ${fmt(f.fecha)}`; onSave({...f,titulo,_talleres:talleres,_ec:ec,_eq:eq,_texto:preview}); };

  const tabStyle = (id) => ({ border:"none", background:"none", padding:"10px 16px", fontSize:13, fontWeight:tab===id?700:500, color:tab===id?B.blue:B.gray500, borderBottom:tab===id?`2px solid ${B.blue}`:"2px solid transparent", cursor:"pointer", marginBottom:-2, fontFamily:"inherit" });

  return (
    <Modal title={doc?"Editar Documento":"Nuevo Documento"} onClose={onClose}>
      <div style={{ display:"flex", gap:2, marginBottom:22, borderBottom:`2px solid ${B.gray100}` }}>
        {[["datos","📋 Datos"],["talleres","⚽ Talleres"],["preview","👁 Vista previa"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={tabStyle(id)}>{lbl}</button>
        ))}
      </div>
      {tab==="datos"&&<>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Sel label="Tipo" value={f.tipo} onChange={e=>s("tipo",e.target.value)} options={[{value:"contrato",label:"📄 Contrato"},{value:"cotizacion",label:"💰 Cotización"}]} />
          <Inp label="Fecha" type="date" value={f.fecha} onChange={e=>s("fecha",e.target.value)} />
        </div>
        <Sel label="Prospecto / Cliente" value={f.prospectoId} onChange={e=>s("prospectoId",e.target.value)} options={prospectos.map(p=>({value:p.id,label:p.nombre}))} />
        <Inp label="Título (opcional)" value={f.titulo} onChange={e=>s("titulo",e.target.value)} placeholder="Se genera automáticamente" />
        {f.tipo==="contrato"?<>
          <Inp label="Representante del Colegio" value={ec.rep} onChange={e=>setEc(x=>({...x,rep:e.target.value}))} />
          <Inp label="Domicilio" value={ec.domicilio} onChange={e=>setEc(x=>({...x,domicilio:e.target.value}))} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Inp label="Nombre para Firma" value={ec.repNombre} onChange={e=>setEc(x=>({...x,repNombre:e.target.value}))} />
            <Inp label="RUT para Firma" value={ec.repRut} onChange={e=>setEc(x=>({...x,repRut:e.target.value}))} />
          </div>
          <Inp label="Vigencia hasta" value={ec.vigencia} onChange={e=>setEc(x=>({...x,vigencia:e.target.value}))} />
          <Txta label="Personería" value={ec.personeria} onChange={e=>setEc(x=>({...x,personeria:e.target.value}))} />
        </>:<>
          <Inp label="% para el Colegio" value={eq.porcentaje} onChange={e=>setEq(x=>({...x,porcentaje:e.target.value}))} />
          <Txta label="Notas adicionales" value={eq.notas} onChange={e=>setEq(x=>({...x,notas:e.target.value}))} />
        </>}
        <Sel label="Estado" value={f.estado} onChange={e=>s("estado",e.target.value)} options={[{value:"borrador",label:"Borrador"},{value:"enviado",label:"Enviado"},{value:"firmado",label:"Firmado"},{value:"rechazado",label:"Rechazado"}]} />
      </>}
      {tab==="talleres"&&<>
        <div style={{ marginBottom:14 }}><Btn variant="outline" onClick={addT}>⚽ Agregar taller</Btn></div>
        {talleres.length===0&&<div style={{ textAlign:"center", padding:"28px 0", color:B.gray500, fontSize:13, background:B.gray50, borderRadius:12, border:`1.5px dashed ${B.gray300}` }}>No hay talleres. Haz clic en "Agregar taller".</div>}
        {talleres.map(t=>(
          <div key={t.id} style={{ background:B.bluePale, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${B.blue}22` }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Sel label="Taller" value={t.taller} onChange={e=>updT(t.id,"taller",e.target.value)} options={TALLERES_BASE} />
              <Sel label="Edades" value={t.edades} onChange={e=>updT(t.id,"edades",e.target.value)} options={EDADES} />
              <Sel label="Día" value={t.dia} onChange={e=>updT(t.id,"dia",e.target.value)} options={DIAS} />
              <Inp label="Horario" value={t.hora} onChange={e=>updT(t.id,"hora",e.target.value)} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
              <Inp label="Precio mensual ($)" value={t.precio} onChange={e=>updT(t.id,"precio",e.target.value)} style={{ marginBottom:0, maxWidth:200 }} />
              <Btn variant="danger" onClick={()=>delT(t.id)} style={{ fontSize:11, padding:"6px 12px" }}>Eliminar</Btn>
            </div>
          </div>
        ))}
      </>}
      {tab==="preview"&&<>
        {!preview&&<div style={{ textAlign:"center", padding:"28px 0", color:B.gray500, fontSize:13, background:B.gray50, borderRadius:12, border:`1.5px dashed ${B.gray300}` }}>Haz clic en "Vista previa" para generar el documento.</div>}
        {preview&&<pre style={{ background:B.gray50, border:`1px solid ${B.gray300}`, borderRadius:10, padding:16, fontSize:12, lineHeight:1.75, whiteSpace:"pre-wrap", maxHeight:380, overflow:"auto", fontFamily:"'Courier New',monospace", color:B.text }}>{preview}</pre>}
      </>}
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:18, paddingTop:16, borderTop:`1px solid ${B.gray100}`, flexWrap:"wrap" }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn variant="outline" onClick={genP}>👁 Vista previa</Btn>
        <Btn onClick={guardar}>💾 Guardar</Btn>
      </div>
    </Modal>
  );
}

// ── Vista CRM ─────────────────────────────────────────────────────────────────
function VistaCRM({ prospectos, docs, onNuevo, onEditar, onEliminar, onNuevoDoc }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const filtrados = prospectos.filter(p=>(p.nombre.toLowerCase().includes(busqueda.toLowerCase())||p.contacto?.toLowerCase().includes(busqueda.toLowerCase()))&&(filtro==="todos"||p.estado===filtro));
  const conteo = ESTADOS.reduce((a,e)=>{ a[e.id]=prospectos.filter(p=>p.estado===e.id).length; return a; },{});

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:20 }}>
        <KPICard label="Total prospectos" val={prospectos.length} icon="🏫" accent={B.blue} />
        <KPICard label="En negociación" val={(conteo.negociacion||0)+(conteo.propuesta||0)} icon="🤝" accent="#F59E0B" />
        <div style={{ gridColumn:"1 / -1" }}>
          <KPICard label="Clientes activos" val={conteo.cliente||0} icon="🏆" accent="#10B981" />
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ flex:1, position:"relative" }}>
            <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:B.gray500, fontSize:14 }}>🔍</span>
            <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar..." style={{ width:"100%", padding:"9px 12px 9px 34px", border:`1.5px solid ${B.gray300}`, borderRadius:9, fontSize:13, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
          </div>
          <select value={filtro} onChange={e=>setFiltro(e.target.value)} style={{ padding:"9px 12px", border:`1.5px solid ${B.gray300}`, borderRadius:9, fontSize:13, fontFamily:"inherit", background:B.white, outline:"none", color:B.text, maxWidth:160 }}>
            <option value="todos">Todos</option>
            {ESTADOS.map(e=><option key={e.id} value={e.id}>{e.label} ({conteo[e.id]||0})</option>)}
          </select>
        </div>
        <Btn onClick={onNuevo} style={{ width:"100%" }}>+ Nuevo prospecto</Btn>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtrados.length===0&&<div style={{ textAlign:"center", color:B.gray500, padding:50, background:B.white, borderRadius:14, border:`1px solid ${B.gray100}` }}>No hay prospectos que coincidan.</div>}
        {filtrados.map(p=>{
          const docsP=docs.filter(d=>d.prospectoId===p.id);
          return (
            <div key={p.id} style={{ background:B.white, borderRadius:14, padding:"14px 16px", border:`1px solid ${B.gray100}`, boxShadow:`0 2px 10px rgba(3,66,252,0.05)` }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${B.blue}, ${B.blueDark})`, color:B.white, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, fontFamily:"'Nunito',sans-serif", flexShrink:0, boxShadow:`0 4px 10px rgba(3,66,252,0.3)` }}>
                  {p.nombre.charAt(0)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:800, fontSize:14, color:B.text, fontFamily:"'Nunito',sans-serif", marginBottom:4 }}>{p.nombre}</div>
                  <Badge estado={p.estado} />
                </div>
              </div>
              <div style={{ fontSize:12, color:B.gray500, marginBottom:6, display:"flex", flexDirection:"column", gap:3 }}>
                {p.contacto&&<span>👤 {p.contacto}</span>}
                {p.email&&<span>✉️ {p.email}</span>}
                {p.telefono&&<span>📞 {p.telefono}</span>}
              </div>
              {p.notas&&<div style={{ fontSize:12, color:B.gray500, marginBottom:8 }}>📝 {p.notas.slice(0,90)}{p.notas.length>90?"…":""}</div>}
              {docsP.length>0&&<div style={{ marginBottom:10, display:"flex", gap:6, flexWrap:"wrap" }}>
                {docsP.map(d=><span key={d.id} style={{ background:B.bluePale, color:B.blue, borderRadius:7, padding:"2px 9px", fontSize:11, fontWeight:700 }}>{d.tipo==="contrato"?"📄":"💰"} {d.titulo.slice(0,30)}</span>)}
              </div>}
              <div style={{ display:"flex", gap:8, borderTop:`1px solid ${B.gray100}`, paddingTop:10 }}>
                <Btn variant="outline" style={{ fontSize:12, padding:"7px 0", flex:1 }} onClick={()=>onNuevoDoc(p)}>+ Doc</Btn>
                <Btn variant="secondary" style={{ fontSize:12, padding:"7px 0", flex:1 }} onClick={()=>onEditar(p)}>Editar</Btn>
                <Btn variant="danger" style={{ fontSize:12, padding:"7px 14px" }} onClick={()=>onEliminar(p.id)}>✕</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Vista Documentos ──────────────────────────────────────────────────────────
function VistaDocumentos({ docs, prospectos, onNuevo, onEditar, onEliminar }) {
  const [filtro, setFiltro] = useState("todos");
  const estadoColor={borrador:B.gray500,enviado:B.blue,firmado:"#10B981",rechazado:"#EF4444"};
  const filtrados=docs.filter(d=>filtro==="todos"||d.tipo===filtro);
  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:18, alignItems:"center", flexWrap:"wrap" }}>
        <select value={filtro} onChange={e=>setFiltro(e.target.value)} style={{ padding:"9px 12px", border:`1.5px solid ${B.gray300}`, borderRadius:9, fontSize:13, fontFamily:"inherit", background:B.white, outline:"none", color:B.text }}>
          <option value="todos">Todos los tipos</option>
          <option value="contrato">📄 Solo contratos</option>
          <option value="cotizacion">💰 Solo cotizaciones</option>
        </select>
        <Btn onClick={onNuevo}>+ Nuevo documento</Btn>
      </div>
      {filtrados.length===0&&<div style={{ textAlign:"center", color:B.gray500, padding:50, background:B.white, borderRadius:14, border:`1px solid ${B.gray100}` }}>No hay documentos aún.</div>}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtrados.map(d=>{
          const p=prospectos.find(x=>x.id===d.prospectoId);
          const c=estadoColor[d.estado]||B.gray500;
          return (
            <div key={d.id} style={{ background:B.white, borderRadius:14, padding:"16px 20px", border:`1px solid ${B.gray100}`, boxShadow:`0 2px 10px rgba(3,66,252,0.05)`, display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:B.bluePale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{d.tipo==="contrato"?"📄":"💰"}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:14, color:B.text, marginBottom:3, fontFamily:"'Nunito',sans-serif" }}>{d.titulo}</div>
                <div style={{ fontSize:12, color:B.gray500, display:"flex", gap:12, flexWrap:"wrap" }}>
                  {p&&<span>🏫 {p.nombre}</span>}
                  <span>📅 {fmt(d.fecha)}</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                <span style={{ background:c+"18", color:c, border:`1px solid ${c}40`, padding:"3px 11px", borderRadius:20, fontSize:11, fontWeight:700, textTransform:"uppercase" }}>{d.estado}</span>
                <Btn variant="secondary" style={{ fontSize:11, padding:"6px 11px" }} onClick={()=>onEditar(d)}>Editar</Btn>
                <Btn variant="danger" style={{ fontSize:11, padding:"6px 11px" }} onClick={()=>onEliminar(d.id)}>✕</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [vista, setVista] = useState("crm");
  const [prospectos, setProspectos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [syncEstado, setSyncEstado] = useState("loading");
  const [driveFileId, setDriveFileId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [modalP, setModalP] = useState(null);
  const [modalD, setModalD] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null); // {mensaje, onConfirm}
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      // 1. Load local data immediately — no waiting, no spinner
      const hasLocal = await loadLocal("fc_initialized");
      const lp = await loadLocal("fc_prospectos") || (hasLocal ? [] : SEED_P);
      const ld = await loadLocal("fc_documentos") || (hasLocal ? [] : SEED_D);
      await saveLocal("fc_initialized", true);
      setProspectos(lp); setDocs(ld);
      setCargando(false);
      setSyncEstado("error"); // default to local until Drive confirms

      // 2. Try Drive in background (non-blocking)
      try {
        const cachedFid = await loadLocal("fc_drive_fid");
        if (!cachedFid) return; // no Drive configured, stay local silently
        setSyncEstado("loading");
        const datos = await leerArchivoDrive(cachedFid);
        if (datos?.prospectos) {
          setProspectos(datos.prospectos); setDocs(datos.documentos||[]);
          setDriveFileId(cachedFid);
          setSyncEstado("idle");
        } else {
          setSyncEstado("error");
        }
      } catch {
        setSyncEstado("error");
      }
    })();
  }, []);

  const triggerSave = useCallback((p, d, fid) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncEstado("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        const nfid=await guardarEnDrive({prospectos:p,documentos:d,actualizadoEn:new Date().toISOString()},fid);
        setDriveFileId(nfid); await saveLocal("fc_drive_fid",nfid);
        await saveLocal("fc_prospectos",p); await saveLocal("fc_documentos",d);
        await saveLocal("fc_initialized", true);
        setSyncEstado("idle");
      } catch {
        await saveLocal("fc_prospectos",p); await saveLocal("fc_documentos",d);
        await saveLocal("fc_initialized", true);
        setSyncEstado("error");
      }
    }, 1500);
  }, []);

  const guardarProspecto=(p)=>{ const n=prospectos.find(x=>x.id===p.id)?prospectos.map(x=>x.id===p.id?p:x):[...prospectos,p]; setProspectos(n); triggerSave(n,docs,driveFileId); setModalP(null); };
  const eliminarProspecto=(id)=>{ setModalConfirm({ mensaje:"Se eliminará el prospecto y todos sus documentos.", onConfirm:()=>{ const np=prospectos.filter(p=>p.id!==id),nd=docs.filter(d=>d.prospectoId!==id); setProspectos(np);setDocs(nd);triggerSave(np,nd,driveFileId); setModalConfirm(null); } }); };
  const guardarDoc=(d)=>{ const n=docs.find(x=>x.id===d.id)?docs.map(x=>x.id===d.id?d:x):[...docs,d]; setDocs(n);triggerSave(prospectos,n,driveFileId);setModalD(null); };
  const eliminarDoc=(id)=>{ setModalConfirm({ mensaje:"Se eliminará este documento permanentemente.", onConfirm:()=>{ const nd=docs.filter(d=>d.id!==id); setDocs(nd);triggerSave(prospectos,nd,driveFileId); setModalConfirm(null); } }); };

  if (cargando) return (
    <div style={{ minHeight:"100vh", background:B.gray50 }} />
  );

  const navItems=[{id:"crm",label:"Prospectos",icon:"🏫",count:prospectos.length},{id:"docs",label:"Documentos",icon:"📄",count:docs.length}];

  return (
    <>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}} *{box-sizing:border-box;}`}</style>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ minHeight:"100vh", background:B.gray50, fontFamily:"'Nunito',sans-serif" }}>

        {/* Header */}
        <div style={{ background:`linear-gradient(135deg, ${B.blueDark} 0%, ${B.blue} 100%)`, boxShadow:`0 4px 20px rgba(3,66,252,0.25)` }}>
          {/* Logo + sync row */}
          <div style={{ padding:"10px 16px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <LogoWhite height={36} />
            <SyncBadge estado={syncEstado} />
          </div>
          {/* Nav row */}
          <nav style={{ display:"flex", gap:2, padding:"6px 12px 0" }}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setVista(n.id)} style={{ border:"none", background:vista===n.id?"rgba(255,255,255,0.18)":"transparent", color:vista===n.id?B.white:"rgba(255,255,255,0.6)", padding:"10px 14px", fontSize:13, fontWeight:700, cursor:"pointer", borderRadius:"10px 10px 0 0", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, transition:"all .15s", flex:1, justifyContent:"center" }}>
                {n.icon} {n.label}
                <span style={{ background:vista===n.id?B.white:"rgba(255,255,255,0.2)", color:vista===n.id?B.blue:"rgba(255,255,255,0.8)", borderRadius:10, padding:"1px 7px", fontSize:11, fontWeight:800 }}>{n.count}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Alerta error */}
        {syncEstado==="error"&&<div style={{ background:"#EEF1FB", borderBottom:`1px solid ${B.gray300}`, padding:"7px 16px", fontSize:12, color:B.gray500 }}>💾 Datos guardados localmente · Conecta Google Drive en Settings para sincronizar</div>}

        {/* Contenido */}
        <div style={{ maxWidth:940, margin:"0 auto", padding:"16px 12px" }}>
          <div style={{ marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div>
              <h1 style={{ fontFamily:"'Nunito',sans-serif", fontSize:24, fontWeight:900, color:B.text, margin:0, letterSpacing:-0.3 }}>
                {vista==="crm"?"Pipeline de Prospectos":"Contratos y Cotizaciones"}
              </h1>
              <p style={{ color:B.gray500, fontSize:13, marginTop:3 }}>
                {driveFileId ? `💚 Sincronizado con Google Drive · ${DRIVE_FILENAME}` : "💾 Guardado localmente · activa Drive en Settings"}
              </p>
            </div>
          </div>

          {vista==="crm"&&<VistaCRM prospectos={prospectos} docs={docs} onNuevo={()=>setModalP("nuevo")} onEditar={p=>setModalP(p)} onEliminar={eliminarProspecto} onNuevoDoc={()=>setModalD("nuevo")} />}
          {vista==="docs"&&<VistaDocumentos docs={docs} prospectos={prospectos} onNuevo={()=>setModalD("nuevo")} onEditar={d=>setModalD(d)} onEliminar={eliminarDoc} />}
        </div>
      </div>

      {modalP&&<ModalProspecto prospecto={modalP==="nuevo"?null:modalP} onSave={guardarProspecto} onClose={()=>setModalP(null)} />}
      {modalD&&<ModalDocumento doc={modalD==="nuevo"?null:modalD} prospectos={prospectos.length>0?prospectos:SEED_P} onSave={guardarDoc} onClose={()=>setModalD(null)} />}
      {modalConfirm&&<ModalConfirm mensaje={modalConfirm.mensaje} onConfirm={modalConfirm.onConfirm} onCancel={()=>setModalConfirm(null)} />}
    </>
  );
}
