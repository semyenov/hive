import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  cleanDistDir: true,
  eslint: { ignoreDuringBuilds: true },

  experimental: {
    turbo: {
      sourceMaps: true,
      treeShaking: true,
    },
  },


  env: {
    SITE_URL: 'https://the-guild.dev/graphql/hive',
    NEXT_BASE_PATH: process.env.NEXT_BASE_PATH,
  },
  nextraConfig: {
    codeHighlight: true,
    contentDirBasePath: '/content',
  },
 
  rewrites: () => [
    {
      source: '/content/:path*',
      destination: '/content/:path*',
    },
  ],
  webpack: (config, { webpack }) => {
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );

    config.externals['node:fs'] = 'commonjs fs';
    config.externals['node:path'] = 'commonjs path';
    
    return config;
  },
});
