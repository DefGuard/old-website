#!/bin/bash
wget https://github.com/sass/dart-sass-embedded/releases/download/1.59.3/sass_embedded-1.59.3-linux-x64.tar.gz
mkdir /deps
tar -xf sass_embedded-1.59.3-linux-x64.tar.gz -C /deps
export PATH="$PATH:/deps/sass_embedded"
hugo --minify
