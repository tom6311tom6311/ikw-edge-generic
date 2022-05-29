import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type SitesResolver = QueryResolvers['sites'];

const sites: SitesResolver = (parent, _ , { claims }) => {
  if (claims === null || !claims.email) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return Object
    .values(mockData.sites)
    .filter((site) => site.owners.find((owner) => (owner?.email === claims.email)));
}

export default sites;
