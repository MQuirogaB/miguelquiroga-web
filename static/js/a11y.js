(function () {
  "use strict";

  var STORAGE_KEY = "mq-a11y-settings";
  var FS_STEPS = [0.9, 1, 1.1, 1.2, 1.3];

  function loadSettings() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) || {};
    } catch (e) {
      return {};
    }
  }

  function saveSettings(s) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch (e) {
      /* almacenamiento no disponible: seguimos sin persistir */
    }
  }

  var settings = Object.assign(
    { fsIndex: 1, contrast: false, reduceMotion: false, dyslexia: false },
    loadSettings()
  );

  function apply() {
    var html = document.documentElement;
    html.style.setProperty("--a11y-fs-scale", FS_STEPS[settings.fsIndex]);
    html.classList.toggle("a11y-contrast", !!settings.contrast);
    html.classList.toggle("a11y-reduce-motion", !!settings.reduceMotion);
    html.classList.toggle("a11y-dyslexia", !!settings.dyslexia);
  }

  // Aplicar lo antes posible para evitar parpadeo
  apply();

  function persist() {
    saveSettings(settings);
    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var fab = document.getElementById("a11y-fab");
    var panel = document.getElementById("a11y-panel");
    var closeBtn = document.getElementById("a11y-close");
    var decBtn = document.getElementById("a11y-fs-dec");
    var incBtn = document.getElementById("a11y-fs-inc");
    var resetFsBtn = document.getElementById("a11y-fs-reset");
    var contrastToggle = document.getElementById("a11y-toggle-contrast");
    var motionToggle = document.getElementById("a11y-toggle-motion");
    var dyslexiaToggle = document.getElementById("a11y-toggle-dyslexia");
    var resetAllBtn = document.getElementById("a11y-reset-all");

    if (!fab || !panel) return;

    contrastToggle.checked = !!settings.contrast;
    motionToggle.checked = !!settings.reduceMotion;
    dyslexiaToggle.checked = !!settings.dyslexia;

    function openPanel() {
      panel.hidden = false;
      fab.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    }
    function closePanel() {
      panel.hidden = true;
      fab.setAttribute("aria-expanded", "false");
      fab.focus();
    }

    fab.addEventListener("click", function () {
      if (panel.hidden) openPanel();
      else closePanel();
    });
    closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) closePanel();
    });
    document.addEventListener("click", function (e) {
      if (
        !panel.hidden &&
        !panel.contains(e.target) &&
        e.target !== fab
      ) {
        closePanel();
      }
    });

    decBtn.addEventListener("click", function () {
      settings.fsIndex = Math.max(0, settings.fsIndex - 1);
      persist();
    });
    incBtn.addEventListener("click", function () {
      settings.fsIndex = Math.min(FS_STEPS.length - 1, settings.fsIndex + 1);
      persist();
    });
    resetFsBtn.addEventListener("click", function () {
      settings.fsIndex = 1;
      persist();
    });

    contrastToggle.addEventListener("change", function () {
      settings.contrast = contrastToggle.checked;
      persist();
    });
    motionToggle.addEventListener("change", function () {
      settings.reduceMotion = motionToggle.checked;
      persist();
    });
    dyslexiaToggle.addEventListener("change", function () {
      settings.dyslexia = dyslexiaToggle.checked;
      persist();
    });

    resetAllBtn.addEventListener("click", function () {
      settings = { fsIndex: 1, contrast: false, reduceMotion: false, dyslexia: false };
      contrastToggle.checked = false;
      motionToggle.checked = false;
      dyslexiaToggle.checked = false;
      persist();
    });
  });
})();
