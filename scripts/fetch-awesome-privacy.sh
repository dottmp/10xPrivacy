#!/usr/bin/env bash

set -euo pipefail

URL="https://raw.githubusercontent.com/Lissy93/awesome-privacy/main/awesome-privacy.yml"
OUT="$(dirname "$0")/../src/lib/data/awesome-privacy.yml"

echo "Fetching $URL ..."
curl -fsSL "$URL" -o "$OUT"
echo "Saved to $OUT"
