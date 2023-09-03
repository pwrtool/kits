#!/bin/bash

tsc
npm publish --access public


rm *.js
rm *.d.ts
rm *.js.map
rm ./**/*.d.ts
rm ./**/*.js
rm ./**/*.js.map
