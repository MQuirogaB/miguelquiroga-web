---
title: "Vectorizar imagen"
icon: "🌹"
---

{{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/1.jpg" alt="pieza de madera grabada y cortada a partir de la imagen vectorizada del Principito" >}}

En este tutorial vectorizaremos una imagen para poder editarla y trabajar con ella y así, hacer un grabado en madera dándole un borde adecuado.

1. Elegimos una imagen. En este tutorial, utilizaremos esta [www.pngegg.com](https://www.pngegg.com/es/png-yvpbz)
   {{< file src="files/corte-laser/proyectos-didacticos/vectorizar-imagen/Principito.png" text="Principito.png — imagen de partida (PNG)" >}}
2. Con la imagen descargada, la incorporamos a inkscape.
   {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/2.jpg" alt="imagen del Principito incorporada al lienzo de Inkscape" >}}
3. Notaremos que no podemos hacer gran cosa con ella, ya que no es un archivo vectorial, sino una imagen. Procedemos a vectorizarla.
4. Par ello vamos a Trayecto 👉 Vectorizar mapa de bits.
   {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/3.jpg" alt="menú Trayecto > Vectorizar mapa de bits" >}}
5. En el menú lateral tenemos varias opciones. En este caso, para hacer el grabado seleccionaremos Pasada simple 👉 Detección de bordes.
   {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/4.jpg" alt="opción Pasada simple > Detección de bordes en la ventana de vectorizado" >}}
6. Le damos a aplicar. Aunque no lo parezca, se ha aplicado bien, solo que están superpuestas las imágenes.
7. Vamos a Capas 👉 Capas y objetos y veremos que está tanto el vector (path1) como la imagen (image1).
8. Poniendo el cursor sobre la imagen en el menú de la derecha, podemos hacer que no se vea clicando en el ojo.
   {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/5.jpg" alt="panel de Capas y objetos ocultando la imagen original mediante el icono del ojo" >}}
9. Ahora ya tenemos la imagen vectorizada viendo bien los bordes.
10. Vamos a coger el borde exterior para hacer el contorno de la imagen. Para ello, vamos a Trayecto 👉 Descombinar.
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/6.jpg" alt="aplicación de Trayecto > Descombinar sobre el vector" >}}
11. Por defecto lo pone todo con relleno, por eso se ve tan raro. No te preocupes, quítale relleno a todo y añade un trazo negro (te recomiendo que bajes el grosor del trazo al mínimo: 0.1 mm, para poder ver bien la figura).
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/7.jpg" alt="trayectos sin relleno y con trazo negro de 0,1 mm" >}}
12. Seleccionamos el borde exterior tanto de la corona como del resto del dibujo.
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/8.jpg" alt="selección del borde exterior de la corona y del resto del dibujo" >}}
13. Le damos a Edición 👉 Invertir selección.
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/9.jpg" alt="menú Edición > Invertir selección" >}}
14. Y borramos todo, quedándonos con el borde.
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/10.jpg" alt="resultado tras borrar, quedando solo el borde exterior" >}}
15. Marcamos todo y le damos a Trayecto 👉 Ampliar, tantas veces como nos guste (será útil tras hacerlo un par de veces volver a Capas 👉 Capas y objetos y activar de nuevo la imagen).
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/11.jpg" alt="trayecto ampliado varias veces con Trayecto > Ampliar" >}}
16. Seleccionamos los dos vectores (corona y dibujo) y vamos a Trayecto 👉 Unión, para que se unan.
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/12.jpg" alt="selección de los dos vectores (corona y dibujo) antes de aplicar Trayecto > Unión" >}}
17. Por último, ponemos el color del trayecto en rojo.
    {{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/13.jpg" alt="trayecto final coloreado en rojo" >}}
18. Y listo, ya lo podemos llevar a la cortadora:
    1. Rojo: Cortar
    2. Imagen: Grabar

{{< img src="images/corte-laser/proyectos-didacticos/vectorizar-imagen/14.jpg" alt="pieza de madera terminada, grabada y cortada con el diseño del Principito" >}}

> Os dejo por aquí el archivo por si fuese de utilidad.

{{< file src="files/corte-laser/proyectos-didacticos/vectorizar-imagen/Principito.svg" text="Principito.svg — archivo editable de Inkscape (SVG)" >}}
