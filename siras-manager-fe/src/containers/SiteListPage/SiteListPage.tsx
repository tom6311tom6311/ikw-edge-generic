import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchSite, selectSites } from "../../features/sitesSlice";


const SITE_IDS = ['a123456789'];

const SiteListPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    SITE_IDS.forEach((siteId) => {
      dispatch(fetchSite(siteId));
    })
  }, [dispatch]);
  const sites = useAppSelector(selectSites(SITE_IDS));
  return (
    <div>
      {sites.map(({ siteId, status,
        companyName,
        location,
        numSiras,
        speciesList,
        capacity,
        area}) => (
          <table className="table" key={siteId}>
            {/* This should be a SiteOverview component */}
            <tbody>
              <tr>
                <th scope="row">公司</th>
                <td>{companyName}</td>
              </tr>
              <tr>
                <th scope="row">地點</th>
                <td>{location}</td>
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
