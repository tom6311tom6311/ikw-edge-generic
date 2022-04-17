import mockData from '../../../data/mockData';
import { MutationResolvers } from '../../generated/graphql';
import JwtUtils from '../../utils/JwtUtils';

type LoginResolver = MutationResolvers['login'];

const login: LoginResolver = (parent, { email, password }) => {
  if (!password || password !== mockData.userCredentials?.[email]) {
    return null;
  }
  return JwtUtils.createToken(email, process.env.JWT_SECRET || '');
};

export default login;
