import { createHive } from "@lib/apollo";

export function createHiveClient() {
  return createHive({
    enabled: true,
    debug: true, // Enable debug logs
    token: process.env.HIVE_TOKEN || "YOUR-TOKEN",
    reporting: {
      author: "app-server",
      commit: "local-dev",
    },
    usage: {
      clientInfo: (req) => {
        const clientName = req.headers["x-graphql-client-name"];
        const clientVersion = req.headers["x-graphql-client-version"];

        if (
          typeof clientName === "string" &&
          typeof clientVersion === "string"
        ) {
          return {
            name: clientName,
            version: clientVersion,
          };
        }

        return null;
      },
    },
  });
}
