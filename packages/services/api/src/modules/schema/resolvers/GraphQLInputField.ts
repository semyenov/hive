import type   { GraphQlInputFieldResolvers } from './../../../__generated__/types';
import { stringifyDefaultValue } from "../utils";
import type { GraphQLInputFieldResolvers } from "./../../../__generated__/types";

export const GraphQLInputField: GraphQlInputFieldResolvers = {
  name: (f) => f.entity.name,
  description: (f) => f.entity.description ?? null,
  type: (f) => f.entity.type,
  defaultValue: (f) => stringifyDefaultValue(f.entity.defaultValue),
  isDeprecated: (f) => typeof f.entity.deprecationReason === "string",
  deprecationReason: (f) => f.entity.deprecationReason ?? null,
  // usage,
  supergraphMetadata: (f) =>
    f.supergraph
      ? {
          ownedByServiceNames: f.supergraph.ownedByServiceNames,
        }
      : null,,
  // usage: ({ usage }, _arg, _ctx) => {
  //   /* GraphQLInputField.usage resolver is required because GraphQLInputField.usage and GraphQLInputFieldMapper.usage are not compatible */
  //   return usage;
  // },
    usage: ({ usage }, _arg, _ctx) => {
                        /* GraphQLInputField.usage resolver is required because GraphQLInputField.usage and GraphQLInputFieldMapper.usage are not compatible */
                        return usage
                      }
};
