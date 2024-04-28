# Containerized build

## Debian

`./build.sh`

## Fedora

[Required build tools](https://contributing.bitwarden.com/getting-started/clients/desktop/)

```bash
sudo dnf groupinstall "Development Tools" "Development Libraries"

sudo dnf install libsecret-devel libglibutil-devel rustup argon2 libargon2-devel gcc-c++ libxcrypt-compat

rustup-init

rustup target add x86_64-unknown-linux-musl
```

`./containerized-build.sh`

## Browser extension

[Edit Bitwarden Chrome extension](https://github.com/quexten/clients/pull/3) to allow Linux biometric unlock and add the extension ID to:

`~/.config/google-chrome/NativeMessagingHosts/com.8bit.bitwarden.json`

```json
"chrome-extension://palnbbhihpkngcohjfbmmkmjmgmkmiei/"
```
