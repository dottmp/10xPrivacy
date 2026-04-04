#!/usr/bin/env bash

set -euo pipefail

#----------------------------------------------------------------------
# create branch
#----------------------------------------------------------------------
SCRIPTS_DIR="$(dirname "$0")"
BRANCH="data/$(date +%Y-%m-%dT%H-%M-%S)"

echo "Creating branch $BRANCH ..."
git switch -c "$BRANCH"

#----------------------------------------------------------------------
# fetch scripts
#----------------------------------------------------------------------
"$SCRIPTS_DIR/fetch-awesome-privacy.sh"
