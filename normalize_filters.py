#!/usr/bin/env python3
"""
Normaliza el frontmatter de materiales/ y laboratorio/ para poder construir
filtros por curso/temática/etc:
  - laboratorio: renombra bloque->tematica y tipo->tipologia (nombres inconsistentes
    de la migración original; el contenido es el mismo concepto).
  - convierte curso/bloque/tipo/tipologia/tematica de string a lista YAML,
    quitando el sufijo " (+N más)" de Notion (guardamos solo el valor visible;
    el resto quedó truncado en Notion y no se pudo recuperar).
  - si había truncamiento, añade un comentario HTML de aviso justo debajo del
    frontmatter (mismo estilo que los demás avisos de revision-manual.md).
  - calcula los valores distintos por campo y los escribe en content/materiales/_index.md
    y content/laboratorio/_index.md bajo `filtros:` para que la plantilla los use.
"""
import re
import glob
import yaml

TRUNC_RE = re.compile(r"\s*\(\+\d+\s*m[aá]s\)\s*$", re.IGNORECASE)

def split_frontmatter(text):
    m = re.match(r"^---\n(.*?\n)---\n(.*)$", text, re.DOTALL)
    if not m:
        raise ValueError("no frontmatter found")
    return m.group(1), m.group(2)

def to_list(value):
    """'1º Bach (+1 más)' -> (['1º Bach'], True)   'Boletín' -> (['Boletín'], False)"""
    truncated = bool(TRUNC_RE.search(value))
    clean = TRUNC_RE.sub("", value).strip()
    return [clean], truncated

def process_dir(dirpath, field_map, filter_fields):
    """field_map: old_key -> new_key renames applied before listifying.
       filter_fields: keys (post-rename) to convert to lists / collect distinct values."""
    distinct = {f: set() for f in filter_fields}
    truncated_files = []

    for path in sorted(glob.glob(f"{dirpath}/*.md")):
        if path.endswith("_index.md"):
            continue
        raw = open(path, encoding="utf-8").read()
        fm_text, body = split_frontmatter(raw)
        fm = yaml.safe_load(fm_text) or {}

        # renombra campos legacy
        for old, new in field_map.items():
            if old in fm and new not in fm:
                fm[new] = fm.pop(old)
            elif old in fm and new in fm:
                fm.pop(old)  # ya tiene el nuevo, descarta el legacy duplicado

        file_truncated = False
        for f in filter_fields:
            if f in fm and isinstance(fm[f], str):
                values, trunc = to_list(fm[f])
                fm[f] = values
                distinct[f].update(values)
                if trunc:
                    file_truncated = True
            elif f in fm and isinstance(fm[f], list):
                distinct[f].update(fm[f])

        if file_truncated:
            truncated_files.append(path)
            if "<!-- FILTRO INCOMPLETO" not in body:
                warn = (
                    "\n<!-- FILTRO INCOMPLETO: Notion mostraba más de un valor en "
                    "curso/bloque/tipo/tipología/temática para esta página (\"+N más\") "
                    "y la vista pública no deja ver los valores ocultos. Se ha guardado "
                    "solo el valor visible; si quieres que aparezca también en los demás "
                    "filtros, dime cuáles son los valores que faltan y los añado. -->\n"
                )
                body = warn + body

        new_fm_text = yaml.dump(fm, allow_unicode=True, sort_keys=False, width=1000)
        new_text = f"---\n{new_fm_text}---\n{body}"
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(new_text)

    return distinct, truncated_files


if __name__ == "__main__":
    mat_distinct, mat_trunc = process_dir(
        "content/materiales",
        field_map={},
        filter_fields=["curso", "bloque", "tipo"],
    )
    lab_distinct, lab_trunc = process_dir(
        "content/laboratorio",
        field_map={"bloque": "tematica", "tipo": "tipologia"},
        filter_fields=["tipologia", "tematica"],
    )

    print("=== materiales ===")
    for k, v in mat_distinct.items():
        print(k, sorted(v))
    print("truncated:", len(mat_trunc))

    print("=== laboratorio ===")
    for k, v in lab_distinct.items():
        print(k, sorted(v))
    print("truncated:", len(lab_trunc))

    import json
    with open("/tmp/filter_values.json", "w", encoding="utf-8") as fh:
        json.dump({
            "materiales": {k: sorted(v) for k, v in mat_distinct.items()},
            "laboratorio": {k: sorted(v) for k, v in lab_distinct.items()},
            "materiales_truncated": mat_trunc,
            "laboratorio_truncated": lab_trunc,
        }, fh, ensure_ascii=False, indent=2)
