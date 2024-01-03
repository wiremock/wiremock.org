#!/usr/bin/env bash

set -eo pipefail

rm -f wiremock-org-amplify.zip
zip -r wiremock-org-amplify.zip _site/*

deploymentData=$(aws amplify create-deployment --app-id d1rkup1qsf4ckf --branch-name prod)
jobId=$(echo $deploymentData | jq -r '.jobId')
uploadUrl=$(echo $deploymentData | jq -r '.zipUploadUrl')

curl -v -X PUT -H 'content-type:application/zip' -T wiremock-org-amplify.zip "$uploadUrl"

aws amplify start-deployment --app-id d1rkup1qsf4ckf --job-id $jobId --branch-name prod