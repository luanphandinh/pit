suite:
	node test/fun_suite.js > test/tests/test.postman_collection.json
t:
	node t_test.js
newman: suite
	newman run test/tests/test.postman_collection.json
