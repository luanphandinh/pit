t:
	node tests/t_test.js
	node tests/extract_test.js
suite:
	node example/fun_suite.js > example/tests/test.postman_collection.json
newman: suite
	newman run example/tests/test.postman_collection.json
