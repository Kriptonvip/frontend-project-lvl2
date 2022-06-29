import fs from 'fs';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export default readFile;
