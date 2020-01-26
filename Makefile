t:
	node tests/t_test.js
	node tests/collection_test.js
	node tests/fs_test.js
	node tests/assert_test.js
links:
	npm link
	cd example && npm link pits
suite:
	cd example && node ../lib/extract.js
newman: suite
	newman run example/tests/test.postman_collection.json
