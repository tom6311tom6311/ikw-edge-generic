import mockData from '../../../data/mockData';
import { QueryResolvers, Site } from '../../generated/graphql';

type SitesResolver = QueryResolvers['sites'];

const sites: SitesResolver = (parent, { siteIds }) => siteIds
  .map(
    (siteId) => (mockData.sites[siteId])
  )
  .filter((site: Site) => site);

export default sites;
