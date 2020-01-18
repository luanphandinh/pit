test:
	node example/fun_suite.js > example/tests/example.postman_collection.json
t:
	node example/fun_suite.js
test-newman: test
	newman run example/tests/example.postman_collection.json
