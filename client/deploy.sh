#! /bin/bash

echo "Creating production build"
npm run build:production

echo "Compressing production build"
cd dist/app/browser
tar -cvzf ../../dist.tar.gz .

# do ftp stuff