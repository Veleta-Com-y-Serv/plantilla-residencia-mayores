# Brief de diseño · Residencia y centro de día

- **id**: `residencia-mayores` · **orden**: 560 · **plan mínimo**: presencia · **estilo**: cálido
- **Base de origen**: `hotel-boutique` (solo la estructura técnica; el diseño es otro).
- **Tanda**: tercera tanda «ancho completo» (02/11/2026). Referencia de estilo: losmartesnohayluna.com.
- **Ejemplo**: «Casa do Souto», residencia y centro de día ficticios en Lugo.

## Concepto: «la casa del jardín»
Una casa de piedra rodeada de jardín: calma, cercanía, luz natural. Nada de aire de hospital. La web la leen hijos e
hijas que buscan sitio para sus padres y, a menudo, las propias personas mayores: letra grande, contraste alto, botones
amplios, frases cortas y el teléfono siempre a la vista.

## Paleta (site.yaml → colores)
- Primario **verde oliva** `#4f5d2a` (bandas oliva, panel de la portada, horas del día) y su derivado **oliva honda**
  (estancias, formulario de visita, pie).
- Acento **ocre** `#c98a2e` (botones, banda de cifras, bloque de visita, rayas de antetítulo).
- Fondo **crema** `#f6efe0` y derivados **trigo** (crema + ocre) y **salvia** (crema + oliva).
- Texto `#2b2a1f`. Todo con `color-mix`, así que aguanta que el cliente cambie los cuatro.

## Tipografía
- Títulos: serif cálida de sistema (Charter, Sitka, Cambria, Georgia), **redonda seminegra**, interletrado apretado;
  portada a 6 rem en escritorio y 2,6 rem en móvil.
- Texto: sans de sistema (Segoe UI, system-ui) a **18 px**, interlineado 1,65.
- Antetítulos: versalitas con interletrado y una raya ocre de 2,25 rem delante.

## Motivo: la «hoja»
Esquinas opuestas muy redondeadas (`--hoja`, hasta 10 rem): fotos de las estancias, iconos de servicios, botones del
acordeón, números de los pasos, redes del pie y la esquina del panel de la portada, del bloque de visita y de las fotos a
sangre. Bandas de bordes rectos (nada de cúpulas ni curvas de borde a borde, que son de la base).

## Ritmo de bandas
1. **Portada** (oliva honda): foto a sangre a pantalla completa + panel oliva anclado abajo a la izquierda con esquina de
   hoja, título enorme, dos botones y ventajas en dos columnas. En móvil, foto arriba y panel montado debajo.
2. **Servicios** (crema): titular partido + rejilla de 4 columnas con filetes verticales, sin tarjetas.
3. **Cifras** (ocre pleno): cifras enormes con raya.
4. **Estancias** (oliva honda): 4 columnas con foto vertical en hoja, precio + periodo entre filetes y lo que incluye.
5. **Instalaciones** (crema → mosaico a sangre): 4 columnas, una foto 2×2 y apaisadas, filetes crema de 4 px.
6. **Un día en la casa** (trigo): foto a sangre a la izquierda + línea del día con horas grandes en oliva.
7. **Equipo** (salvia): 4 columnas, fotos en marco de ventana (arriba en óvalo).
8. **Visita** (ocre | oliva honda, 50/50 a sangre): pasos numerados + formulario con servicio y día.
9. **Opiniones** (oliva): cita enorme con comilla ocre + dos citas pequeñas.
10. **Preguntas** (crema): titular a la izquierda, acordeón a la derecha.
11. **Contacto** (trigo): teléfono enorme, vías entre filetes y formulario en bloque crema con hojas.
- **Cabecera**: pegajosa, siempre sólida; franja oliva con teléfono y horario + fila crema con marca (hoja + nombre),
  menú (completo desde 1180 px) y botón ocre.
- **Pie**: banda oliva «Llámanos cuando lo necesites» con el teléfono enorme + 4 columnas en oliva honda.

## Lo que no debe cambiar
Contrato técnico de `docs/plantillas.md` (plataforma): `site.yaml` única fuente, listas planas, precios como cadena,
componentes que pintan bien vacíos, `index.astro`, `seo.ts` y endpoints intactos, formulario `mailto`, sin dependencias
ni fuentes externas, sin scroll horizontal a 375 px.
