#!/bin/bash

echo "Installing Yarn"

# Install yarn
echo "Checking if Yarn is already installed"
if ! command -v yarn > /dev/null; then
  npm i -g yarn
  ln -s "$(npm bin --global)"/yarn /usr/bin/yarn
fi

yarn --version
