# json-one

**Parse JSON string only with first layer. Nodejs, C++, and Python(WIP)**

## How to use

* Please check `test` file in each directory. It should be a very easy class for user to embed.

## Run Testing

* For Nodejs

```
# Windows
docker run --rm --name=test -v ${PWD}/node:/tmp/test node:alpine node /tmp/test/test.js
# OSX
docker run --rm --name=test -v $(pwd)/node:/tmp/test node:alpine node /tmp/test/test.js
```
