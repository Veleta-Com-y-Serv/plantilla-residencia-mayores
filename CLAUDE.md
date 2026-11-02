# Plantilla «Residencia y centro de día» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **cálido**, a ancho completo (bandas de borde a borde, fotos a sangre).
Todo en castellano de España, frases cortas, sin jerga. La leen familias y personas mayores: letra grande, claridad y calma.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga, lo tipa y lo normaliza; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = verde oliva, acento = ocre, fondo = crema, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los derivados (`--oliva-honda`, `--ocre-texto`, `--ocre-luz`, `--trigo`, `--salvia`, `--sobre-oliva`, `--sobre-ocre`, `--linea`, `--linea-clara`) se calculan con `color-mix` en `src/styles/global.css`. El diseño cuenta con un primario oscuro, un acento cálido medio y un fondo claro.
- **Tipografías y aspecto general**: `src/styles/global.css` (serif cálida del sistema —Charter, Sitka, Cambria, Georgia de respaldo— en redonda seminegra para títulos; sans del sistema a 18 px para el texto; antetítulos en versalitas con raya ocre). Bandas `.banda--crema|trigo|salvia|oliva|honda|ocre`, filas a sangre `.partida` (y `.partida--invertida`), mosaico `.mosaico`, el motivo de la «hoja» (`--hoja`: esquinas opuestas muy redondeadas en fotos, iconos y bloques). Fuentes del sistema: no añadas fuentes externas.
- **Cabecera**: `src/components/Header.astro` (pegajosa y siempre sólida: franja oliva con teléfono y horario que se va al hacer scroll, y fila crema con marca, menú y botón). **Pie**: `src/components/Footer.astro` (banda oliva con el teléfono enorme y cuatro columnas en oliva honda).
- **Imágenes**: en `public/`. Fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` muestra `/placeholders/<mismo nombre>.svg`. Personas: siempre `/placeholders/persona.svg`, nunca caras generadas. Nunca fotos con caras de residentes sin su permiso.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = hoja oliva + nombre en serif y la localidad debajo.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis; esta plantilla es de plan presencia).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro` (pantalla completa: foto a sangre + panel oliva con esquina de hoja abajo a la izquierda)
- `servicios` → `servicios.astro` (rejilla de 4 columnas separada por filetes, sin tarjetas)
- `cifras` → `cifras.astro` (banda ocre con cifras enormes; sin cifras no se pinta)
- `estancias` → `estancias.astro` (columnas con foto en hoja, precio y lo que incluye, sobre oliva honda)
- `instalaciones` → `instalaciones.astro` (mosaico de fotos de borde a borde)
- `un-dia` → `un-dia.astro` (foto a sangre + línea del día con horas grandes)
- `equipo` → `equipo.astro` (4 columnas con foto en marco de ventana)
- `visita` → `visita.astro` (ocre con pasos + formulario sobre oliva honda, a sangre)
- `opiniones` → `opiniones.astro` (cita enorme sobre oliva; sin opiniones no se pinta)
- `preguntas` → `preguntas.astro` (acordeón `details/summary`; sin preguntas no se pinta)
- `contacto` → `contacto.astro` (vías de contacto en grande + formulario)
- `texto` → `texto.astro` (apartado genérico para `tipo: texto`: con foto, fila a sangre; sin foto, dos columnas)

## Campos propios de esta plantilla (además del esquema común)
- `hero`: `cta` (sin él, el botón llama), `cta_secundario`, `items` [{titulo, icono}] = ventajas en dos columnas dentro del panel (hasta 6).
- `servicios.items` [{titulo, texto, icono}].
- `cifras.items` [{titulo, texto}]: `titulo` es la cifra como cadena («42», «24 h»), `texto` qué es. **Nunca inventes cifras**: si el cliente no las da, `items: []` y la banda no sale.
- `estancias.estancias` [{nombre, texto, precio, periodo, incluye, imagen}]: `precio` SIEMPRE como cadena (`"desde 1.890 €"`), `periodo` a qué se refiere (`al mes`, `al día`, `la hora`); vacíos = no se pintan. `incluye` es UNA cadena separada por «;» (o por comas si no hay «;»), nunca una lista. `cta` opcional al final.
- `instalaciones.galeria`: lista de rutas (6 o 12 cierran el mosaico en escritorio).
- `un-dia.horario` [{hora, actividad}] («8:30» · «Desayuno…»); `imagen` (foto a sangre) y `texto` opcionales.
- `equipo.personas` [{nombre, cargo, foto, texto}].
- `visita`: `items` [{titulo, texto}] = pasos numerados, `cta` (llamar o WhatsApp; sin él, llama al teléfono de contacto), `nota` (frase bajo el botón). El formulario ofrece en un desplegable los `nombre` de `estancias`.
- `opiniones.testimonios` [{texto, autor, nota}]: la primera sale enorme; `nota` = quién es («Hija de una residente»). Sin estrellas.
- Iconos útiles: `corazon`, `hoja`, `cubiertos`, `casa`, `usuarios`, `lapiz`, `estrella`, `coche`, `mensaje`, `arbol`, `sol`, `cama`, `taza`, `reloj`, `calendario` (lista completa en `src/components/ui/Icono.astro`).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, estancias, precios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Varios valores = una cadena separada por «;» (`incluye`). Máximo 24 elementos por lista.
5. **Nunca inventes** precios, cifras, plazas ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan). Nada de datos de salud de residentes en la web.
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, empezando por una `<section class="banda banda--oliva cabeza-interior">` (la cabecera es pegajosa y no tapa nada); enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
7. **Apartado nuevo**: añade `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `servicios`, `estancias`, `instalaciones`, `un-dia`, `equipo`, `preguntas`… (el diseño que quiera reutilizar). `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (solo hay el que cierra el menú móvil), bandas de borde a borde, 16 px de margen lateral del texto en móvil (`.contenedor`), letra de 18 px, botones de 52 px de alto y sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`, o el `nombre` de la ficha); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
