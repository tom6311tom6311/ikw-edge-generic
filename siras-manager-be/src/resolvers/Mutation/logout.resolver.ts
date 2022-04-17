import { MutationResolvers } from '../../generated/graphql';

type LogoutResolver = MutationResolvers['logout'];

const logout: LogoutResolver = (parent, args, { claims }) => {
  return claims !== null;
};

export default logout;
