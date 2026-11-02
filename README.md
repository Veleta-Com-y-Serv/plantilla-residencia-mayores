# Plantilla «Residencia y centro de día» · NoExpertise

Web cálida a ancho completo para residencias de mayores, centros de día, servicios de ayuda a domicilio y centros
geriátricos. Crema, verde oliva y ocre; serif cálida; letra grande para leer sin esfuerzo. Basada en AstroWind (MIT).

- **Contenido**: todo en `site.yaml` (ejemplo: «Casa do Souto», residencia ficticia de Lugo).
- **Secciones**: portada, servicios, cifras, estancias y precios, instalaciones, un día en la casa, equipo, concertar
  una visita, opiniones de las familias, preguntas frecuentes y contacto (más el genérico `texto`).
- **Campos propios**: `estancias` [{nombre, texto, precio, periodo, incluye, imagen}], `un-dia.horario` [{hora, actividad}],
  `visita.items` (pasos) y `visita.nota`. Detalle en `CLAUDE.md`; concepto visual en `DISEÑO.md`.
- **Fotos**: `fotos.json` (se generan aparte); respaldo en `public/placeholders/`.

```
npm ci
npm run build     # dist/
```

## Páginas propias
- Cada elemento de `secciones.estancias.estancias` con `detalle` tiene su página en `/estancias/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
