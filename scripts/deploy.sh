#!/usr/bin/env bash
set -euo pipefail

# Always serve from this project's root, regardless of where the script is called from
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( dirname "$SCRIPT_DIR" )"
cd "$PROJECT_ROOT"

PORT=5176
MODE="${1:-dev}"

echo "Project : $PROJECT_ROOT"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

if [[ "$MODE" == "build" ]]; then
  echo "Building for production..."
  npm run build
  echo ""
  echo "Done. Output is in: $PROJECT_ROOT/dist"
else
  echo "Port    : $PORT"
  echo ""
  echo "Dev server starting → http://localhost:${PORT}"
  echo ""
  npx vite --port "$PORT" --strictPort
fi
