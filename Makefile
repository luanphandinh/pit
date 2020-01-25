t:
	node tests/t_test.js
	node tests/collection_test.js
	node tests/fs_test.js
suite:
	node example/collection.js > example/tests/test.postman_collection.json
newman: suite
	newman run example/tests/test.postman_collection.json
