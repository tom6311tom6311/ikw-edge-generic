import site from './Query/site.resolver';
import sites from './Query/sites.resolver';
import op from './Query/op.resolver';
import ops from './Query/ops.resolver';
import sensorData  from './Query/sensorData.resolver';
import login from './Mutation/login.resolver';
import logout from './Mutation/logout.resolver';
import { Resolvers } from '../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    site,
    sites,
    op,
    ops,
    sensorData,
  },
  Mutation: {
    login,
    logout,
  }
};

export default resolvers;
