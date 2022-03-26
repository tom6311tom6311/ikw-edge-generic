import React from 'react';
import { useGetSitesQuery } from './SiteListPage.graphql.generated';
import SiteOverview from '../../components/SiteOverview/SiteOverview';

const SITE_IDS = ['A123456789', 'A223456789'];

function SiteListPage() {
  const { loading, error, data } = useGetSitesQuery({ variables: { siteIds: SITE_IDS } });
  if (loading || error || !data?.sites) {
    return null;
  }
  const { sites } = data;
  return (
    <div className="sitelist_container">
      {sites.map((site) => (
        <SiteOverview
          key={site.siteId}
          siteData={site}
          link={`/site/${site.siteId}`}
        />
      ))}
    </div>
  );
}

export default SiteListPage;
