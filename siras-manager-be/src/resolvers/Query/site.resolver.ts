import { GraphQLYogaError } from '@graphql-yoga/node';
import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type SiteResolver = QueryResolvers['site'];

const site: SiteResolver = (parent, { siteId }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
  return mockData.sites[siteId] || null;
};

export default site;
