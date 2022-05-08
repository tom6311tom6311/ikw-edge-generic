import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers, Siras } from '../../generated/graphql';

type SirasesResolver = QueryResolvers['sirases'];

const sirases: SirasesResolver = (parent, { sirasIds }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return sirasIds
    .map(
      (sirasId) => (mockData.sirases[sirasId])
    )
    .filter((siras: Siras) => siras);
}

export default sirases;
