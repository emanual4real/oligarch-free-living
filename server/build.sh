#! /bin/bash

echo "Clearing dist directory"

npm run clean
rm dist/*.tgz

echo "Building typescript application"

npm run pre-build

echo "Copying package.json and .env"

cp package.json dist/package.json
cp .env.prod dist/.env

echo "Installing Node dependencies"

cd dist
npm i
tar -cvzf ./server.tar.gz .