---
title: "Fundamentos de la impresión 3D"
icon: "🖨️"
---

<!-- IMAGEN: esquema/foto genérica de una impresora 3D FDM -->

## Cómo funciona una impresora 3D. Introducción.

Una impresora 3D de tipo FDM (que significa "Modelado por Deposición Fundida") funciona básicamente como una pistola de pegamento caliente, pero mucho más precisa y automatizada.

- **El material:** Usa un plástico especial que viene en rollos, llamado filamento. Puede ser de diferentes tipos, como PLA o PETG, pero, para que te hagas una idea, es como un hilo de plástico.
- **El proceso:** Este filamento se calienta en una boquilla pequeñita (el "hotend" o boquilla) hasta que se derrite. Esa boquilla se mueve depositando el plástico derretido capa por capa, como si estuviera "dibujando" en 3D.
- **La base:** Las capas se colocan sobre una base plana (la "cama" o plataforma de impresión), que suele calentarse un poco para que el plástico se quede bien pegado.
- **El resultado:** Imagina que haces un pastel por pisos, colocando uno encima del otro. Así funciona: la impresora construye el objeto desde abajo hacia arriba hasta que está completo.

## Cómo damos las instrucciones a la impresora 3D. El laminado.

Cuando quieres imprimir algo en 3D, el archivo que tienes (que suele ser un modelo en 3D) no le dice directamente a la impresora cómo hacerlo. Necesitamos un paso intermedio, y ahí es donde entra el laminado. Vamos a verlo por partes.

<!-- IMAGEN: esquema del proceso de laminado (slicing) de un modelo 3D -->
*Tomado de [fabheads.com](https://www.google.com/url?sa=i&url=https%3A%2F%2Ffabheads.com%2Fblogs%2Fwhat-is-the-role-of-slicing-in-3d-printing%2F&psig=AOvVaw2Nvg4wKgycRtTzcSQAW43O&ust=1732570430101000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCe9P_19YkDFQAAAAAdAAAAABAE)*

- **Partir el modelo en capas:** El programa de laminado (llamado *slicer*, como Creality Print u OrcaSlicer) toma tu diseño 3D y lo divide en un montón de capas finitas, como si estuvieras cortando un pan en rebanadas súper finas.

<!-- IMAGEN: esquema de conversión de un modelo 3D a G-code -->
*Tomado de [scan2cad.com](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.scan2cad.com%2Fblog%2Fcad%2Fconvert-stl-gcode%2F&psig=AOvVaw1gxPZRoaY1vvEeRb7_ipXQ&ust=1732406872289000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjDq_KU8YkDFQAAAAAdAAAAABAE)*

- **Traducir el diseño para la impresora:** El programa de laminado convierte el modelo 3D en un archivo llamado G-code. Este archivo contiene una lista detallada de instrucciones que indican a la impresora cómo construir la pieza: dónde debe moverse, a qué velocidad, cuánta cantidad de plástico fundido debe depositar y en qué orden hacerlo para formar cada capa. Es como un manual de instrucciones que la impresora seguirá paso a paso.
- **Ajustar parámetros clave:** Durante el laminado, puedes decidir detalles importantes, como:
  - **Calidad:** Capas más finas para piezas detalladas o más gruesas para impresiones rápidas.
  - **Velocidad:** Si tienes prisa o si prefieres precisión.
  - **Relleno:** Elegir si el modelo será hueco, semisólido o completamente sólido.
- **Guardar y enviar:** Una vez que hayas ajustado todos los parámetros, el laminador genera el archivo G-code con las configuraciones que elegiste. Este archivo incluye todo lo que la impresora necesita saber para crear tu modelo exactamente como lo planeaste. Ahora solo tienes que guardarlo y enviarlo a la impresora para empezar a trabajar. ¡Listo para imprimir!

## Parámetros principales en la impresión 3D.

### Temperatura de boquilla y cama

La temperatura es clave para que todo funcione bien ya que debemos fundir el plástico. La boquilla (donde se derrite el filamento) necesita estar a la temperatura adecuada según el material. Por ejemplo, el PLA suele estar entre 190-220 °C, mientras que el PETG requiere más calor, unos 230-250 °C.

La cama caliente (la base donde se imprime) ayuda a que la pieza se pegue bien al inicio y no se despegue mientras se imprime. Para PLA, con 50-60 °C es suficiente, pero materiales más exigentes, como el PETG, necesitan más, unos 70-85 °C. Si no ajustas bien estas temperaturas, puedes tener problemas como que la pieza se despegue o el filamento no fluya correctamente.

### Altura de capa

La altura de capa define el grosor de cada rebanada del modelo que la impresora va a construir. Si eliges capas más finas (por ejemplo, 0,1 mm), obtendrás más detalle y un acabado más suave, pero la impresión tardará más. Si vas por capas más gruesas (como 0,2 o 0,3 mm), la impresión será más rápida, pero los detalles serán menos precisos.

<!-- IMAGEN: comparativa visual de distintas alturas de capa -->
*Tomado de [blog.prusa3d.com](https://blog.prusa3d.com/wp-content/uploads/2018/06/layer_height.jpg)*

Es como elegir entre pintar algo con un pincel fino o uno grueso: depende de lo que necesites y cuánto tiempo tengas.

### Velocidad

La velocidad determina qué tan rápido se mueve la impresora mientras imprime. Si configuras una velocidad alta, el trabajo se terminará antes, pero corres el riesgo de que la calidad baje y las capas no se adhieran bien. Si usas una velocidad baja, tendrás mejores acabados, pero tendrás que ser más paciente.

Una velocidad típica para empezar es entre 40-60 mm/s, pero si tienes una impresora más nueva, podrás animarte con unos 200-250 mm/s. Con el tiempo, puedes ajustar según el material y la complejidad de la pieza. ¡Es cuestión de encontrar el equilibrio entre calidad y rapidez!

### Porcentaje y tipos de relleno

El relleno es lo que va por dentro del modelo, y puedes elegir cuánto plástico usará. Por ejemplo, un relleno del 15-20% es suficiente para piezas decorativas o que no van a soportar peso. Pero si necesitas algo más resistente, como una pieza funcional, puedes subirlo al 50% o incluso 100%.

<!-- IMAGEN: comparativa de patrones de relleno -->
*Tomado de [bigrep.com](https://bigrep.com/wp-content/uploads/2023/07/infill-patterns.jpg)*

También puedes elegir el patrón del relleno, que afecta la resistencia y el tiempo de impresión. Los patrones comunes son:

- **Cuadrícula o líneas:** Rápidos y básicos.
- **Triangular o hexagonal (panal):** Más resistentes, ideales para piezas que soportan carga.
- **Concentrado o giroide:** Perfectos para diseños complejos o que necesitan flexibilidad.
