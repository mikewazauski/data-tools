#!/usr/bin/env bash
npm install
npm install -g @angular/cli
export NODE_OPTIONS=--max_old_space_size=8096
node --max-old-space-size=8096
./node_modules/ng-swagger-gen/ng-swagger-gen
ng build
