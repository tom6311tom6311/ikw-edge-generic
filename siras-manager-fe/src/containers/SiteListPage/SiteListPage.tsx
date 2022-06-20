import React from 'react';
import { useGetSitesQuery } from './GetSitesQuery.graphql.generated';
import SiteOverview from '../../components/SiteOverview/SiteOverview';

function SiteListPage() {
  const { loading, error, data } = useGetSitesQuery();
  if (loading || error || !data?.sites) {
    return null;
  }
  const { sites } = data;
  return (
    <div className="o-sitelist-container">
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
