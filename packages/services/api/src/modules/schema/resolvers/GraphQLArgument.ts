import { stringifyDefaultValue, usage } from "../utils";
import type {
  GraphQLArgumentResolvers,
  GraphQlArgumentResolvers,
} from "./../../../__generated__/types";

export const GraphQLArgument: GraphQLArgumentResolvers = {
  name: (a) => a.entity.name,
  description: (a) => a.entity.description ?? null,
  type: (a) => a.entity.type,
  defaultValue: (a) => stringifyDefaultValue(a.entity.defaultValue),
  deprecationReason: (a) => a.entity.deprecationReason ?? null,
  isDeprecated: (a) => typeof a.entity.deprecationReason === "string",
  usage,
  usage: ({ usage }, _arg, _ctx) => {
    /* GraphQLArgument.usage resolver is required because GraphQLArgument.usage and GraphQLArgumentMapper.usage are not compatible */
    return usage;
  },
};
