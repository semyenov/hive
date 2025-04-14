import { usage } from "../utils";
import type {
  GraphQLEnumValueResolvers,
  GraphQlEnumValueResolvers,
} from "./../../../__generated__/types";

export const GraphQLEnumValue: GraphQLEnumValueResolvers = {
  name: (v) => v.entity.name,
  description: (v) => v.entity.description ?? null,
  isDeprecated: (v) => typeof v.entity.deprecationReason === "string",
  deprecationReason: (v) => v.entity.deprecationReason ?? null,
  usage,
  supergraphMetadata: (v) =>
    v.supergraph
      ? { ownedByServiceNames: v.supergraph.ownedByServiceNames }
      : null,
  usage: ({ usage }, _arg, _ctx) => {
    /* GraphQLEnumValue.usage resolver is required because GraphQLEnumValue.usage and GraphQLEnumValueMapper.usage are not compatible */
    return usage;
  },
};
