import jwt from 'jsonwebtoken';
import mockData from '../../../data/mockData';
import { MutationResolvers } from '../../generated/graphql';

type LoginResolver = MutationResolvers['login'];

const createToken = (email: string, secret: string) => jwt.sign({ email }, secret, { expiresIn: '1d' });

const login: LoginResolver = (parent, { email, password }) => {
  if (!password || password !== mockData.userCredentials?.[email]) {
    return null;
  }
  return createToken(email, 'testikwsecret');
};

export default login;
