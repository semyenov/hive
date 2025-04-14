
var prettierConfig = require('@theguild/prettier-config');

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  importOrderParserPlugins: prettierConfig.importOrderParserPlugins.concat([
    'importAssertions',
    // `using` keyword
    'explicitResourceManagement',
  ]),
  plugins: prettierConfig.plugins.concat([
    'prettier-plugin-sql',
    // For sort CSS classes.
    // Make sure to keep this one last, see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
    'prettier-plugin-tailwindcss',
  ]),
  // prettier-plugin-sql options
  language: 'postgresql',
  keywordCase: 'upper',
};
