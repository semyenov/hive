# Hive Client for Apollo Server

[Hive](https://the-guild.dev/graphql/hive) is a fully open-source schema registry, analytics,
metrics and gateway for [GraphQL federation](https://the-guild.dev/graphql/hive/federation) and
other GraphQL APIs.

---

[Documentation](https://the-guild.dev/graphql/hive/docs/other-integrations/apollo-server)

## Migration from `@lib/client`

The `@lib/client` package has been deprecated in favor of library-specific packages.

1. Install the `@lib/apollo` package.
1. Remove the `@lib/client` package from your dependencies.
1. Replace `@lib/client` with `@lib/apollo` in your codebase.
1. Replace `hiveApollo` with `useHive` in your codebase.
1. Done
