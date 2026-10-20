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
UMAMI_ID="7746ca97-b2bd-4630-9ba6-501cebc3faa5"
UMAMI_TAG="<script defer src=\"https://cloud.umami.is/script.js\" data-website-id=\"$UMAMI_ID\"></script>"
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
  # Analítica (Umami): se inserta antes de </head> en cada página de la herramienta (sin tocar el repo de la herramienta)
  while IFS= read -r -d '' pagina; do
    if ! grep -q "$UMAMI_ID" "$pagina" && grep -qi '</head>' "$pagina"; then
      UMAMI_TAG="$UMAMI_TAG" perl -0pi -e 's{</head>}{$ENV{UMAMI_TAG}</head>}i' "$pagina"
    fi
  done < <(find "$SITIO/$repo" -type f -name '*.html' -print0)
  echo "OK  $repo -> $SITIO/$repo/ ($(find "$SITIO/$repo" -type f | wc -l) archivos)"
done < "$LISTA"
rm -rf "$TMP"
echo "Herramientas con problemas: $fallos"
