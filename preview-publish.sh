#!/bin/bash

set -euo pipefail

(cd ../wiremock.org-preview && git pull origin gh-pages)

bundle exec jekyll build --baseurl https://private-preview.wiremock.org
cp -rf _site/* ../wiremock.org-preview/

# Add the git hash
git rev-parse HEAD > ../wiremock.org-preview/assets/version.txt

pushd ../wiremock.org-preview 
rm -f *.sh
echo 'private-preview.wiremock.org' > CNAME
git add --all
git commit -m "Updated docs"
git push origin gh-pages
popd
