import { useGetSitesQuery } from "./SiteListPage.graphql.generated";
import SiteOverview from '../../components/SiteOverview/SiteOverview';


const SITE_IDS = ['A123456789', 'A223456789'];

const SiteListPage = (props:{changePageName:Function, changeDisplaySite:Function}) => {
  const { loading, error, data } = useGetSitesQuery({ variables: { siteIds: SITE_IDS }});
  if (loading || error || !data?.sites) {
    return <></>;
  }
  const sites = data.sites;
  const {
    changePageName,
    changeDisplaySite,
  } = props
  return (
    <div className="sitelist_container">
      {sites.map(({
        siteId,
        status,
        companyNameChin,
        county,
        district,
        numSiras,
        speciesList,
        capacity,
        area}) => (
          <SiteOverview 
            key={siteId} 
            status={status} 
            siteId={siteId} 
            companyName={companyNameChin} 
            location={location} 
            numSiras={numSiras} 
            speciesList={speciesList} 
            capacity={capacity} 
            area={area}
            changePageName={changePageName}
            changeDisplaySite={changeDisplaySite} />
      ))}
      {sites.map(({ siteId, status,
        companyName,
        location,
        numSiras,
        speciesList,
        capacity,
        area}) => (
          <SiteOverview 
            key={siteId} 
            status={status} 
            siteId={siteId} 
            companyName={companyName} 
            location={location} 
            numSiras={numSiras} 
            speciesList={speciesList} 
            capacity={capacity} 
            area={area}
            changePageName={changePageName}
            changeDisplaySite={changeDisplaySite} />
      ))}
    </div>
  );
}

export default SiteListPage;
