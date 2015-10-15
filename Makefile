all: compilemd

compilemd:
	node ./compiler/index.js

build:
	make compilemd
	gulp build

