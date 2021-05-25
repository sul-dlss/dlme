#!/bin/bash

echo "Updating Puma"

# Install Puma
gem install puma -v 5.3.1
puma --version;
