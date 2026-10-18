#!/usr/bin/env bash
# Copia la carpeta docs de cada herramienta (repos de MQuirogaB) dentro del sitio ya construido:
#   public/<repo>/  ->  miguelquiroga.es/<repo>/
# Uso: scripts/incluir-herramientas.sh [carpeta-del-sitio]   (por defecto: public)
# Para probar sin red: LOCAL_SRC=/ruta/a/carpeta/con/los/repos scripts/incluir-herramientas.sh /tmp/salida
set -u
SITIO="${1:-public}"
LISTA="$(dirname "$0")/../herramientas.txt"
TMP="$(mktemp -d)"
fallos=0
while read -r repo; do
  [[ -z "$repo" || "$repo" == \#* ]] && continue
  origen="$TMP/$repo"
  if [[ -n "${LOCAL_SRC:-}" ]]; then
    origen="$LOCAL_SRC/$repo"
  elif ! git clone --quiet --depth 1 "https://github.com/MQuirogaB/$repo.git" "$origen"; then
    echo "::warning::No se pudo descargar $repo"; fallos=$((fallos+1)); continue
  fi
  if [[ ! -f "$origen/docs/index.html" ]]; then
    echo "::warning::$repo no tiene docs/index.html"; fallos=$((fallos+1)); continue
  fi
  mkdir -p "$SITIO/$repo"
  cp -r "$origen/docs/." "$SITIO/$repo/"
  echo "OK  $repo -> $SITIO/$repo/ ($(find "$SITIO/$repo" -type f | wc -l) archivos)"
done < "$LISTA"
rm -rf "$TMP"
echo "Herramientas con problemas: $fallos"
