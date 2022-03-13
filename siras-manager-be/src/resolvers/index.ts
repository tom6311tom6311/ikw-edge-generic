import site from './site.resolver';
import sites from './sites.resolver';
import { Resolvers } from '../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    site,
    sites,
  }
};

export default resolvers;
