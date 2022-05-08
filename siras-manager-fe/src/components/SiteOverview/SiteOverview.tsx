import * as React from 'react';
import { Link } from 'react-router-dom';
import { GetSitesQuery } from '../../containers/SiteListPage/GetSitesQuery.graphql.generated';

type SiteOverviewProps = {
  siteData: GetSitesQuery['sites'][number];
  link: string;
}

export default function SiteOverview(props: SiteOverviewProps) {
  const {
    siteData: {
      siteId,
      companyNameChin,
      county,
      district,
      sirasIds,
      speciesList,
      capacity,
      area,
    },
    link,
  } = props;
  return (
    <div className="siteoverview_container">
      <div className="siteoverview_head_container">
        <p className="siteoverview_subhead">案場</p>
        <div>
          <p className="siteoverview_caseId">{siteId}</p>
          <Link to={link}>
            <div className="bnt siteoverview_button">案場管理</div>
          </Link>
        </div>
      </div>
      <div className="siteoverview_body_container">
        <div className="siteoverview_info_container">
          <p className="siteoverview_info_key">公司</p>
          <p className="siteoverview_info_value">{companyNameChin}</p>
        </div>
        <div className="siteoverview_info_container">
          <p className="siteoverview_info_key">地點</p>
          <p className="siteoverview_info_value">{`${county} ${district}`}</p>
        </div>
        <div className="siteoverview_info_container">
          <p className="siteoverview_info_key">SiRAS</p>
          <p className="siteoverview_info_value">{sirasIds.length}</p>
          <p className="siteoverview_info_unit">U</p>
        </div>
        <div className="siteoverview_info_container" style={{ height: '85px' }}>
          <p className="siteoverview_info_key">魚種</p>
          <p className="siteoverview_info_value" style={{ width: '200px', height: '54px' }}>{speciesList}</p>
        </div>
        <div className="siteoverview_info_container">
          <p className="siteoverview_info_key">產量</p>
          <p className="siteoverview_info_value">{capacity}</p>
          <p className="siteoverview_info_unit">台斤</p>
        </div>
        <div className="siteoverview_info_container" style={{ borderWidth: '0' }}>
          <p className="siteoverview_info_key">面積</p>
          <p className="siteoverview_info_value">{area}</p>
          <p className="siteoverview_info_unit">公頃</p>
        </div>
        <div className="bnt basicdata_button">養殖場基本資料表</div>
      </div>
    </div>
  );
}
