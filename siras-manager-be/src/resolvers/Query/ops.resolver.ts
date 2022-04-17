import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type OpsResolver = QueryResolvers['ops'];

const ops: OpsResolver = (parent, { opIds }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return opIds.map((opId) => (mockData.ops[opId] || null)).filter((op) => op);
};

export default ops;
