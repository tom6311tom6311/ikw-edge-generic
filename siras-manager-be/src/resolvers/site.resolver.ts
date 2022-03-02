import mockData from '../../data/mockData';

type SiteArgs = {
  siteId: string;
}

const site = (parent: unknown, args: SiteArgs) => (mockData.sites[args.siteId] || null);

export default site;
