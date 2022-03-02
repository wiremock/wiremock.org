#!/bin/bash

set -euo pipefail

bundle exec jekyll build
cp -rf _site/* ../wiremock.org-preview/

pushd ../wiremock.org-preview 
git add --all
git commit -m "Updated docs"
git push origin gh-pages
popd
