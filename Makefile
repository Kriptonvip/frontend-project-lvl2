install:
	npm ci 
gendiff:
	node bin/gendiff.js
diff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
	gendiff __fixtures__/file1.yml __fixtures__/file2.yml	
diffP:
	gendiff plain __fixtures__/file1.json __fixtures__/file2.json
	gendiff plain __fixtures__/file1.yml __fixtures__/file2.yml
diffJson:
	gendiff json __fixtures__/file1.json __fixtures__/file2.json
	gendiff json __fixtures__/file1.yml __fixtures__/file2.yml
publish:
	npm publish --dry-run
lint:
	npx eslint . 
test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js
test-coverage:
	node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage --coverageProvider=v8