#!/usr/bin/env bash

set -e

podman build -t bitwarden-builder .

podman run --rm \
  -v $(pwd)/..:/bitwarden-build:Z \
  bitwarden-builder /bitwarden-build/builder/containerized-build.sh
