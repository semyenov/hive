/*
  https://github.com/octokit/webhooks-methods.js/issues/45
  That's why we patch package.json of @octokit/webhooks-methods and replace the value of `main` with the value from `source`.
*/
import fs from 'fs';
import { createRequire } from 'module';
import { join, resolve, dirname } from 'path';

function patchPackage(name, patchFn) {
  const require = createRequire(import.meta.url);
  const indexFile = require.resolve(name, {
    paths: [
      join(process.cwd(), 'node_modules', '.pnpm', 'node_modules'),
      join(process.cwd(), 'node_modules'),
    ],
  });
  const nameParts = name.split('/');
  const packagePath = findPackageJson(dirname(indexFile), nameParts[nameParts.length - 1]);
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  patchFn(pkg);

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');
  console.log(`[patch-manifests] Patched ${name}`);
}

function findPackageJson(dir, until) {
  const possiblePath = join(dir, 'package.json');

  if (fs.existsSync(possiblePath)) {
    return possiblePath;
  }

  if (dir.endsWith(until)) {
    throw new Error(`Package.json file not found. Reached ${dir}`);
  }

  return findPackageJson(resolve(dir, '..'), until);
}

// /*
//   https://github.com/octokit/webhooks-methods.js/issues/45
//   That's why we patch package.json of universal-github-app-jwt and replace the value of `main` with the value from `source`.
// */
// patchPackage('universal-github-app-jwt', pkg => {
//   delete pkg.module;
// });


/*
  https://github.com/octokit/webhooks-methods.js/issues/45
  That's why we patch package.json of @octokit/webhooks-methods and replace the value of `main` with the value from `source`.
*/
// patchPackage('@octokit/webhooks-methods', pkg => {
//   pkg.main = 'dist/index.js';
//   delete pkg.module;
// });


/*
  TSUP (but really esbuild) bundles all node_modules, this is expected, we want that.
  Unfortunately, `apollo-graphql` and `@apollo/*` libraries are CJS only, and we end up with CJS and ESM versions of graphql.
  The very quick fix means we need to patch the graphql module to be CJS-only.
*/
patchPackage('lightningcss', pkg => {
  pkg.main = 'index.js';
  delete pkg.module;
});
