#!/usr/bin/env bash

cd /bitwarden-build
npm install
cd apps/desktop/desktop_native
source "$HOME/.cargo/env"
export PKG_CONFIG_ALL_STATIC=1
export PKG_CONFIG_ALLOW_CROSS=1
npm run build -- --target x86_64-unknown-linux-musl
cd ..
npm run build
npm run pack:lin
