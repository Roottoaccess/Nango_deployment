#!/usr/bin/env bash

set -ex

dir="$(pwd)"

echo "$dir/packages/server/dist/server.js"

# connect ui
if [ "$FLAG_SERVE_CONNECT_UI" = "true" ]; then
  node "$dir/packages/server/dist/server.js" &
  pid1=$!

  # This is not recommended, you should serve Connect UI from a dedicated static website hosting
  npm run -w @nangohq/connect-ui serve:unsafe &
  pid2=$!

  # Wait for either to exit, then kill the other
  while kill -0 $pid1 2>/dev/null && kill -0 $pid2 2>/dev/null; do
    sleep 1
  done

  # Optionally kill any remaining child (if you want to stop both on one exit)
  kill $pid1 $pid2 2>/dev/null || true

  # Exit with nonzero if any failed
  wait $pid1
  code1=$?
  wait $pid2
  code2=$?
  exit $((code1 != 0 ? code1 : code2))
else
  node "$dir/packages/server/dist/server.js"
fi
