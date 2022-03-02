#!/bin/bash

set -euo pipefail

(cd ../wiremock.org-preview && git pull origin gh-pages)

bundle exec jekyll build
cp -rf _site/* ../wiremock.org-preview/

pushd ../wiremock.org-preview 
echo 'private-preview.wiremock.org' > CNAME
git add --all
git commit -m "Updated docs"
git push origin gh-pages
popd
