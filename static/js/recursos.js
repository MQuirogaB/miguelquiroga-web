// Directorio de recursos: búsqueda, filtro por categoría y favoritos (guardados solo en este navegador).
(function () {
  var KEY = "mq-recursos-favoritos";
  function leer() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function guardar(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var favs = leer();
  var base = location.pathname.replace(/[^/]*\/?$/, "");
  function clave(id) { return (document.body.dataset.rxsec || sec()) + ":" + id; }
  function sec() { var m = location.pathname.match(/(corte-laser|impresion-3d)/); return m ? m[1] : "x"; }
  function esFav(id) { return favs.indexOf(clave(id)) >= 0; }
  function alternar(id) {
    var k = clave(id), i = favs.indexOf(k);
    if (i >= 0) favs.splice(i, 1); else favs.push(k);
    guardar(favs);
  }
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  // --- ficha individual ---
  var ff = document.getElementById("rx-ffav");
  if (ff) {
    var pintaF = function () {
      var on = esFav(ff.dataset.id);
      ff.setAttribute("aria-pressed", on);
      ff.textContent = on ? "★ En tus favoritos" : "☆ Guardar en favoritos";
    };
    ff.addEventListener("click", function () { alternar(ff.dataset.id); pintaF(); });
    pintaF();
  }

  // --- listado ---
  var root = document.querySelector("[data-rx]");
  if (!root) return;
  var q = document.getElementById("rx-q");
  var chips = [].slice.call(root.querySelectorAll(".rx-chip"));
  var cards = [].slice.call(root.querySelectorAll(".rx-card"));
  var groups = [].slice.call(root.querySelectorAll(".rx-group"));
  var favbtn = document.getElementById("rx-favbtn");
  var favn = document.getElementById("rx-favn");
  var count = document.getElementById("rx-count");
  var empty = document.getElementById("rx-empty");
  var total = +root.dataset.total;
  var cat = "all", soloFav = false;
  cards.forEach(function (c, i) { c._orden = i; c._txt = norm(c.dataset.search); });

  function pintaEstrellas() {
    var n = 0;
    cards.forEach(function (c) {
      var on = esFav(c.dataset.id), b = c.querySelector(".rx-star");
      if (on) n++;
      b.setAttribute("aria-pressed", on);
      b.textContent = on ? "★" : "☆";
      c.classList.toggle("is-fav", on);
    });
    favn.textContent = n;
  }
  function aplicar() {
    var t = norm(q.value).trim().split(/\s+/).filter(Boolean), vis = 0;
    cards.forEach(function (c) {
      var g = c.closest(".rx-group");
      var ok = (cat === "all" || g.dataset.cat === cat) &&
               (!soloFav || esFav(c.dataset.id)) &&
               t.every(function (w) { return c._txt.indexOf(w) >= 0; });
      c.hidden = !ok;
      if (ok) vis++;
    });
    groups.forEach(function (g) {
      g.hidden = !g.querySelector(".rx-card:not([hidden])");
      // favoritos primero dentro de cada grupo
      var grid = g.querySelector(".rx-grid");
      [].slice.call(grid.children).sort(function (a, b) {
        return (esFav(b.dataset.id) - esFav(a.dataset.id)) || (a._orden - b._orden);
      }).forEach(function (c) { grid.appendChild(c); });
    });
    count.textContent = "Mostrando " + vis + " de " + total + " recursos";
    empty.hidden = vis > 0;
  }

  q.addEventListener("input", aplicar);
  chips.forEach(function (b) {
    b.addEventListener("click", function () {
      cat = b.dataset.cat;
      chips.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      aplicar();
    });
  });
  favbtn.addEventListener("click", function () {
    soloFav = !soloFav;
    favbtn.setAttribute("aria-pressed", soloFav);
    aplicar();
  });
  cards.forEach(function (c) {
    c.querySelector(".rx-star").addEventListener("click", function () {
      alternar(c.dataset.id); pintaEstrellas(); aplicar();
    });
  });
  pintaEstrellas();
  aplicar();
})();
