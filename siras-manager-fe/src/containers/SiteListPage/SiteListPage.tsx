import { useGetSitesQuery } from "./SiteListPage.graphql.generated";


const SITE_IDS = ['A123456789', 'A223456789'];

const SiteListPage = () => {
  const { loading, error, data } = useGetSitesQuery({ variables: { siteIds: SITE_IDS }});
  if (loading || error || !data?.sites) {
    return <></>;
  }

  const sites = data.sites;
  return (
    <div>
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
          <table className="table" key={siteId}>
            {/* This should be a SiteOverview component */}
            <tbody>
              <tr>
                <th scope="row">公司</th>
                <td>{companyNameChin}</td>
              </tr>
              <tr>
                <th scope="row">地點</th>
                <td>{`${county} ${district}`}</td>
              </tr>
              <tr>
                <th scope="row">SiRAS</th>
                <td>{`${numSiras} U`}</td>
              </tr>
              <tr>
                <th scope="row">魚種</th>
                <td>{speciesList.join('、')}</td>
              </tr>
              <tr>
                <th scope="row">產量</th>
                <td>{`${capacity} 台斤`}</td>
              </tr>
              <tr>
                <th scope="row">面積</th>
                <td>{`${area} 公頃`}</td>
              </tr>
            </tbody>
          </table>
      ))}
    </div>
  );
}

export default SiteListPage;
