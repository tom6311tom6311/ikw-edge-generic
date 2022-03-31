import mockData from '../../data/mockData';
import { QueryResolvers } from '../generated/graphql';

type OpResolver = QueryResolvers['op'];

const op: OpResolver = (parent, args) => (mockData.ops[args.opId] || null);

export default op;
