import mockData from '../../data/mockData';
import { QueryResolvers } from '../generated/graphql';

type SitesResolver = QueryResolvers['sites'];

const sites: SitesResolver = (parent, args) => args.siteIds.map((siteId) => (mockData.sites[siteId] || null)).filter((site) => site);

export default sites;
