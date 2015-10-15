all: compilemd

compilemd:
	node ./compiler/index.js

build: compilemd
	gulp build

