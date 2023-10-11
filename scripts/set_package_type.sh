#!/bin/sh
jq -n '{type: "module"}' > dist/esm/package.json
jq -n '{type: "commonjs"}' > dist/cjs/package.json
