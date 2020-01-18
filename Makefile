t:
	node test/fun_suite.js > test/tests/test.postman_collection.json
newman: t
	newman run test/tests/test.postman_collection.json
