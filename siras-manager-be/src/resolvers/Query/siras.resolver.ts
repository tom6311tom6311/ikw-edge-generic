import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type SirasResolver = QueryResolvers['siras'];

const siras: SirasResolver = (parent, { sirasId }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return mockData.sirases[sirasId] || null;
};

export default siras;
