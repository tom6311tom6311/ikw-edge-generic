import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type OpResolver = QueryResolvers['op'];

const op: OpResolver = (parent, { opId }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return mockData.ops[opId] || null;
};

export default op;
