t:
	node tests/t_test.js
	node tests/collection_test.js
	node tests/fs_test.js
	node tests/assert_test.js
suite:
	cd example && node ../lib/extract.js
newman: suite
	newman run example/tests/test.postman_collection.json
