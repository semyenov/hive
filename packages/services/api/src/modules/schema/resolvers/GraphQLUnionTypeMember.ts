import { usage } from "../utils";
import type {
  GraphQLUnionTypeMemberResolvers,
} from "./../../../__generated__/types";

export const GraphQLUnionTypeMember: GraphQLUnionTypeMemberResolvers = {
  name: (m) => m.entity.name,
  supergraphMetadata: (m) =>  
    m.supergraph
      ? { ownedByServiceNames: m.supergraph.ownedByServiceNames }
      : null,
  usage: ({ usage }, _arg, _ctx) => {
    /* GraphQLUnionTypeMember.usage resolver is required because GraphQLUnionTypeMember.usage and GraphQLUnionTypeMemberMapper.usage are not compatible */
    return usage;
  } as any,
};
