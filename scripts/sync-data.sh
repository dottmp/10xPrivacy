#!/usr/bin/env bash

set -euo pipefail

#----------------------------------------------------------------------
# create branch
#----------------------------------------------------------------------
SCRIPTS_DIR="$(dirname "$0")"
DATE="$(date +%Y-%m-%dT%H-%M-%S)"
BRANCH="data/$DATE"

echo "Creating branch $BRANCH ..."
git switch -c "$BRANCH"

#----------------------------------------------------------------------
# fetch scripts
#----------------------------------------------------------------------
"$SCRIPTS_DIR/fetch-awesome-privacy.sh"

#----------------------------------------------------------------------
# commit and push
#----------------------------------------------------------------------
echo "Committing changes ..."
git add -A
git commit -m "data sync: $DATE"

echo "Pushing branch $BRANCH ..."
git push -u origin "$BRANCH"
