FROM fedora:40

RUN dnf groupinstall -y "Development Tools" "Development Libraries"

RUN dnf install -y \
    libsecret-devel \
    libglibutil-devel \
    rustup \
    argon2 \
    libargon2-devel \
    gcc-c++ \
    libxcrypt-compat \
    rpm-build \
    nodejs

RUN rustup-init -y

RUN source "$HOME/.cargo/env" && \
    rustup target add x86_64-unknown-linux-musl
