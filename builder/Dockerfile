FROM rust:1.77-bookworm

RUN apt update && apt upgrade -y && \
    apt install -y \
    build-essential \
    libsecret-1-dev \
    libglib2.0-dev \
    nodejs \
    npm \
    rpm

RUN rustup target add x86_64-unknown-linux-musl
