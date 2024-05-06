# Containerized build

To build Bitwarden desktop via a container run:

`./build.sh`

## Linux Browser extension biometric unlock

Either:

- [Manually update Bitwarden browser extension settings to allow biometric unlock](https://github.com/quexten/goldwarden/wiki/Browser-Biometric-Approval#browser-extension-20240401-and-newer)
- Or alternatively [Edit the Bitwarden extension](https://github.com/quexten/clients/pull/3/files) then sideload it into Chromium and update the extension ID in: `~/.config/google-chrome/NativeMessagingHosts/com.8bit.bitwarden.json`
