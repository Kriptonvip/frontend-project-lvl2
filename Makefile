install:
	npm ci 
gendiff:
	node bin/gendiff.js
diff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
publish:
	npm publish --dry-run
lint:
	eslint .
test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8
