import { useGetSitesQuery } from "./SiteListPage.graphql.generated";
import SiteOverview from '../../components/SiteOverview/SiteOverview';


const SITE_IDS = ['A123456789', 'A223456789'];

const SiteListPage = (props:{sideBarState:Boolean, changePageName:Function, changeDisplaySite:Function}) => {
  const { loading, error, data } = useGetSitesQuery({ variables: { siteIds: SITE_IDS }});
  if (loading || error || !data?.sites) {
    return <></>;
  }
  const sites = data.sites;
  const {
    changePageName,
    changeDisplaySite,
    sideBarState,
  } = props
  return (
    <div className={sideBarState?"sitelist_container sidebar_on":"sitelist_container"}>
      {sites.map((site) => (
          <SiteOverview 
            key={site.siteId}
            siteData={site}
            changePageName={changePageName}
            changeDisplaySite={changeDisplaySite} />
      ))}
    </div>
  );
}

export default SiteListPage;
