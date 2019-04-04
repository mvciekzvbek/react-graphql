#!/usr/bin/env sh

cd "$(dirname "$0")/.."
echo "Current dir: $(pwd)"

docker run -it \
    --name react-graphql \
    -v ${PWD}:/usr/src/app \
    -v /usr/src/app/node_modules \
    -p 8000:3000 \
    --rm \
    react-graphql