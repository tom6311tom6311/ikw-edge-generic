import mockData from '../../../data/mockData';
import { QueryResolvers } from '../../generated/graphql';

type SiteResolver = QueryResolvers['site'];

const site: SiteResolver = (parent, args) => (mockData.sites[args.siteId] || null);

export default site;
