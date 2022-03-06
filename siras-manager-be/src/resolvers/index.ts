import site from './site.resolver';
import { Resolvers } from '../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    site,
  }
};

export default resolvers;
