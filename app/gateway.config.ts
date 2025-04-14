// import {
//   createInlineSigningKeyProvider,
//   defineConfig,
//   extractFromCookie,
//   extractFromHeader,
// } from '@graphql-hive/gateway';

// export const gatewayConfig = defineConfig({
//   logging: 'debug',

//   graphqlEndpoint: '/',

//   proxy: {
//     endpoint: 'http://localhost:3001/graphql',
//   },

//   jwt: {
//     // Look and extract for the token in the 'authorization' header, with the 'Bearer' prefix.
//     tokenLookupLocations: [
//       extractFromHeader({ name: 'Authorization', prefix: 'Bearer' }),
//       extractFromCookie({ name: 'sAccessToken' }),
//     ],
//     // Decode and validate the token using the provided signing key.
//     singingKeyProviders: [createInlineSigningKeyProvider('secretsecret')],
//     // Forward the verified token payload to the upstream GraphQL subgraphs.
//     forward: {
//       payload: true,
//       token: true,
//     },
//   },

//   schema: {
//     type: 'hive',
//     endpoint: 'http://localhost:4010/artifacts/v1/bb89998d-4862-46af-b7d7-b09938839169',
//     key: 'hv2ZWZmMWQxZDAtYTYwNS00ZDY0LTliOGEtYWUzOTk4YjYxMWJjOmQwY2I4M2YzNzRjYTU4MDU0Yzk5ZmQ2MjgxOGZhMTgzYjg1NmFlNmM=',
//   },
// });
