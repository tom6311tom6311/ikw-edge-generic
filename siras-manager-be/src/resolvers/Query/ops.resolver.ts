import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type OpsResolver = QueryResolvers['ops'];

const ops: OpsResolver = (parent, args) => args.opIds.map((opId) => (mockData.ops[opId] || null)).filter((op) => op);

export default ops;
