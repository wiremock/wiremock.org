#!/usr/bin/env bash

set -eo pipefail

rm -f wiremock-org-amplify.zip
(cd site && zip -q -r ../wiremock-org-amplify.zip *)

deploymentData=$(aws amplify create-deployment --app-id d1rkup1qsf4ckf --branch-name prod)
jobId=$(echo $deploymentData | jq -r '.jobId')
uploadUrl=$(echo $deploymentData | jq -r '.zipUploadUrl')

curl -X PUT -H 'content-type:application/zip' -T wiremock-org-amplify.zip "$uploadUrl"

aws amplify start-deployment --app-id d1rkup1qsf4ckf --job-id $jobId --branch-name prod