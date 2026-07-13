#!/bin/bash
cd /home/bruno_bogochvol/git/Veiculando-Workspace/aurum-landing-page
export PATH="$PATH:/home/bruno_bogochvol/.antigravity-server/bin/1.21.9-cc6cd32816d350ee4a1ea2b4694b43f749418957"
npm install lightningcss-linux-x64-gnu --no-save
node node_modules/next/dist/bin/next build
