# Hive Client for GraphQL Yoga

[Hive](https://the-guild.dev/graphql/hive) is a fully open-source schema registry, analytics,
metrics and gateway for [GraphQL federation](https://the-guild.dev/graphql/hive/federation) and
other GraphQL APIs.

---

[Documentation](https://the-guild.dev/graphql/hive/docs/other-integrations/graphql-yoga)

## Migration from `@lib/client`

The `@lib/client` package has been deprecated in favor of library-specific packages.

1. Install the `@lib/yoga` package.
1. Remove the `@lib/client` package from your dependencies.
1. Replace `@lib/client` with `@lib/yoga` in your codebase.
1. Replace `useYogaHive` with `useHive`, and `createYogaHive` with `createHive` in your codebase.
1. Done
