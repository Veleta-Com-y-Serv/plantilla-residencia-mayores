// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión de una familia. `nota` es opcional (quién es: «Hija de una residente», «Estancia temporal»…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
/**
 * Línea de horario. En «un día en la casa» se usa `hora` + `actividad` («8:30» · «Desayuno…»);
 * también vale `dia` + `horas` (horario de apertura). Se pinta lo que haya.
 */
export interface Horario { hora: string; actividad: string; dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/**
 * Estancia o servicio con precio (plaza residencial, centro de día, estancia temporal, ayuda a domicilio).
 * `precio` siempre como cadena («desde 1.890 €»); `periodo` es a qué se refiere («al mes», «al día», «la hora»);
 * `incluye` es UNA cadena separada por «;» o comas («Pensión completa; enfermería 24 h»), nunca una lista.
 */
export interface Estancia { nombre: string; texto: string; precio: string; periodo: string; incluye: string; imagen: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  /** estancias */
  estancias: Estancia[];
  /** visita: frase bajo el botón */
  nota?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v).trim());
/** Botón válido (con destino) o undefined. */
const enlace = (v: unknown): Enlace | undefined => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : undefined;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    cta: enlace(s.cta),
    cta_secundario: enlace(s.cta_secundario),
    // Los elementos sin título no se pintan (filas vacías que deja el editor).
    items: lista<Crudo>(s.items)
      .filter((i) => texto(i.titulo))
      .map((i) => ({ titulo: texto(i.titulo), texto: texto(i.texto), icono: texto(i.icono), imagen: texto(i.imagen) })),
    personas: lista<Crudo>(s.personas)
      .filter((p) => texto(p.nombre))
      .map((p) => ({ nombre: texto(p.nombre), cargo: texto(p.cargo), foto: texto(p.foto), texto: texto(p.texto) })),
    testimonios: lista<Crudo>(s.testimonios)
      .filter((t) => texto(t.texto))
      .map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario)
      .map((h) => ({ hora: texto(h.hora), actividad: texto(h.actividad), dia: texto(h.dia), horas: texto(h.horas) }))
      .filter((h) => h.hora || h.actividad || h.dia || h.horas),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    estancias: lista<Crudo>(s.estancias)
      .filter((e) => texto(e.nombre))
      .map((e) => ({
        nombre: texto(e.nombre),
        texto: texto(e.texto),
        precio: texto(e.precio),
        periodo: texto(e.periodo),
        incluye: texto(e.incluye),
        imagen: texto(e.imagen),
      })),
    nota: texto(s.nota),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi residencia',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#4f5d2a', acento: '#c98a2e', fondo: '#f6efe0', texto: '#2b2a1f', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url) && texto(e?.texto)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'NursingHome',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Nombres de las estancias de las secciones activas (para el desplegable del formulario de visita). */
export function nombresEstancias(): string[] {
  return [...new Set(Object.values(site.secciones).filter((s) => s.activa).flatMap((s) => s.estancias.map((e) => e.nombre)))];
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** Valores de una cadena separada por comas o punto y coma («Wifi, desayuno; chimenea»). */
export const valores = (t?: string) => (t ? t.split(/[,;]/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Es un enlace a otra web? (se abre en pestaña nueva) */
export const externo = (u?: string) => !!u && /^https?:\/\//.test(u);
/** Atributos para abrir en pestaña nueva los enlaces a otras webs. */
export const nueva = (u?: string) => (externo(u) ? { rel: 'noopener', target: '_blank' } : {});
