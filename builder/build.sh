#!/usr/bin/env bash

set -e

sudo rm -Rf ../apps/desktop/desktop_native/target
sudo rm -Rf ../apps/desktop/desktop_native/napi/desktop_napi.linux-x64-musl.node
sudo rm -Rf ../apps/desktop/build
sudo rm -Rf ../apps/desktop/dist

podman build --no-cache --pull -t bitwarden-builder .

podman run --rm \
  -v $(pwd)/..:/bitwarden-build:z \
  bitwarden-builder /bitwarden-build/builder/containerized-build.sh

podman system prune -f
