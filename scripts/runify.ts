// It was ported from `bob runify --single` command.
// The idea here is to compile a node service to a single file (not in case of next) and make it executable.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { build as tsup } from 'tsup';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const entryPoints = parseArgs({
  allowPositionals: true,
  strict: false,
}).positionals;

interface BuildOptions {
  external?: string[];
}

runify(normalize(join(process.cwd(), 'package.json')));

async function runify(packagePath: string) {
  const cwd = packagePath.replace(`${sep}package.json`, '');
  const pkg = await readPackageJson(cwd);
  const buildOptions: BuildOptions = pkg.buildOptions || {};
  console.log(`Building...`);

  await compile(
    cwd,
    entryPoints?.length ? entryPoints : 'src/index.ts',
    buildOptions,
    Object.keys(pkg.dependencies ?? {}).concat(Object.keys(pkg.devDependencies ?? {})),
    pkg.type === 'module',
  );
  await rewritePackageJson(pkg, cwd);

  console.log(`Built!`);
}

export async function readPackageJson(baseDir: string) {
  return JSON.parse(
    readFileSync(resolve(baseDir, 'package.json'), {
      encoding: 'utf-8',
    }),
  );
}

async function rewritePackageJson(
  pkg: Record<string, any>,
  cwd: string,
  modify?: (pkg: any) => any,
) {
  let filename = 'index.js';
  let newPkg: Record<string, any> = { bin: filename };
  const fields = ['name', 'version', 'description', 'registry', 'repository', 'type'];

  fields.forEach(field => {
    if (typeof pkg[field] !== 'undefined') {
      newPkg[field] = pkg[field];
    }
  });

  if (modify) {
    newPkg = modify(newPkg);
  }

  writeFileSync(join(cwd, 'dist', 'package.json'), JSON.stringify(newPkg, null, 2), {
    encoding: 'utf-8',
  });
}

async function compile(
  cwd: string,
  entryPoint: string | string[],
  buildOptions: BuildOptions,
  dependencies: string[],
  useEsm = false,
) {
  const outDir = normalize(join(cwd, 'dist'));
  const requireShim = readFileSync(normalize(join(__dirname, './banner.js')), {
    encoding: 'utf-8',
  });

  await tsup({
    entryPoints: (Array.isArray(entryPoint) ? entryPoint : [entryPoint]).map(entryPoint =>
      normalize(join(cwd, entryPoint)),
    ),
    outDir,
    target: 'node22',
    format: [useEsm ? 'esm' : 'cjs'],
    splitting: false,
    sourcemap: 'inline',
    clean: true,
    shims: true,
    skipNodeModulesBundle: false,
    noExternal: dependencies,
    external: buildOptions.external,
    banner: { js: requireShim },
  });
}
