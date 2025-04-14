import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;
const cliPackageJsonAt = join(__dirname, '..', 'package.json');
const corePackageJsonAt = join(__dirname, '..', '..', 'core', 'package.json');

const version = JSON.parse(readFileSync(corePackageJsonAt, 'utf-8')).version;

const newPkg = readFileSync(cliPackageJsonAt, 'utf-8').replace(
  '"@lib/core": "workspace:*"',
  `"@lib/core": "${version}"`,
);

writeFileSync(cliPackageJsonAt, newPkg);
