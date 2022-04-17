import { MutationResolvers } from '../../generated/graphql';

type LogoutResolver = MutationResolvers['logout'];

const logout: LogoutResolver = () => {
  return true;
};

export default logout;
