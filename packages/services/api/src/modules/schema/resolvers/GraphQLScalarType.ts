import { Kind } from "graphql";
import { __isTypeOf, usage } from "../utils";
import type {
  GraphQLScalarTypeResolvers,
  GraphQlScalarTypeResolvers,
} from "./../../../__generated__/types";

export const GraphQLScalarType: GraphQLScalarTypeResolvers = {
  __isTypeOf: __isTypeOf(Kind.SCALAR_TYPE_DEFINITION),
  name: (t) => t.entity.name,
  description: (t) => t.entity.description ?? null,
  usage,
  supergraphMetadata: (t) =>
    t.supergraph
      ? { ownedByServiceNames: t.supergraph.ownedByServiceNames }
      : null,
  usage: ({ usage }, _arg, _ctx) => {
    /* GraphQLScalarType.usage resolver is required because GraphQLScalarType.usage and GraphQLScalarTypeMapper.usage are not compatible */
    return usage;
  },
};
