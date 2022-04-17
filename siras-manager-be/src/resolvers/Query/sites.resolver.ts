import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers, Site } from '../../generated/graphql';

type SitesResolver = QueryResolvers['sites'];

const sites: SitesResolver = (parent, { siteIds }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return siteIds
    .map(
      (siteId) => (mockData.sites[siteId])
    )
    .filter((site: Site) => site);
}

export default sites;
