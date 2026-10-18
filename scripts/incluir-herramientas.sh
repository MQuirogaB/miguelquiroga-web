#!/usr/bin/env bash
# Copia la carpeta docs (o dist, si hay que compilar) de cada herramienta (repos de MQuirogaB) dentro del sitio ya construido:
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
  if [[ -f "$origen/docs/index.html" ]]; then
    carpeta="$origen/docs"
  elif [[ -f "$origen/package.json" ]]; then
    # herramienta que hay que compilar (por ejemplo Vite): se usa su carpeta dist
    # (su configuración debe tener base "/<repo>/" para que funcione en miguelquiroga.es/<repo>/)
    if [[ ! -f "$origen/dist/index.html" ]]; then
      if ! (cd "$origen" && npm ci --silent && npm run build --silent); then
        echo "::warning::No se pudo compilar $repo"; fallos=$((fallos+1)); continue
      fi
    fi
    carpeta="$origen/dist"
  else
    echo "::warning::$repo no tiene docs/index.html ni package.json"; fallos=$((fallos+1)); continue
  fi
  mkdir -p "$SITIO/$repo"
  cp -r "$carpeta/." "$SITIO/$repo/"
  echo "OK  $repo -> $SITIO/$repo/ ($(find "$SITIO/$repo" -type f | wc -l) archivos)"
done < "$LISTA"
rm -rf "$TMP"
echo "Herramientas con problemas: $fallos"
