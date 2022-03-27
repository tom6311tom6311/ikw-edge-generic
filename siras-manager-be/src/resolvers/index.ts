import site from './site.resolver';
import sites from './sites.resolver';
import op from './op.resolver';
import sensorData  from './sensorData.resolver';
import { Resolvers } from '../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    site,
    sites,
    op,
    sensorData,
  }
};

export default resolvers;
