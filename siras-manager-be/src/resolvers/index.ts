import site from './site.resolver';
import sites from './sites.resolver';
import op from './op.resolver';
import ops from './ops.resolver';
import sensorData  from './sensorData.resolver';
import { Resolvers } from '../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    site,
    sites,
    op,
    ops,
    sensorData,
  }
};

export default resolvers;
