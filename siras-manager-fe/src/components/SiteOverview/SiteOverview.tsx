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
    <div className="o-siteoverview">
      <div className="o-siteoverview__head">
        <p className="c-siteoverview__head__text">案場</p>
        <div>
          <p className="c-siteoverview-caseId">{siteId}</p>
          <Link to={link}>
            <div className="bnt c-siteoverview-button">案場管理</div>
          </Link>
        </div>
      </div>
      <div className="o-siteoverview__body">
        <div className="o-siteoverview-info">
          <p className="c-siteoverview-info__key">公司</p>
          <p className="c-siteoverview-info__value">{companyNameChin}</p>
        </div>
        <div className="o-siteoverview-info">
          <p className="c-siteoverview-info__key">地點</p>
          <p className="c-siteoverview-info__value">{`${county} ${district}`}</p>
        </div>
        <div className="o-siteoverview-info">
          <p className="c-siteoverview-info__key">SiRAS</p>
          <p className="c-siteoverview-info__value">{sirasIds.length}</p>
          <p className="c-siteoverview-info__unit">U</p>
        </div>
        <div className="o-siteoverview-info" style={{ height: '85px' }}>
          <p className="c-siteoverview-info__key">魚種</p>
          <p className="c-siteoverview-info__value" style={{ width: '200px', height: '54px' }}>{speciesList}</p>
        </div>
        <div className="o-siteoverview-info">
          <p className="c-siteoverview-info__key">產量</p>
          <p className="c-siteoverview-info__value">{capacity}</p>
          <p className="c-siteoverview-info__unit">台斤</p>
        </div>
        <div className="o-siteoverview-info" style={{ borderWidth: '0' }}>
          <p className="c-siteoverview-info__key">面積</p>
          <p className="c-siteoverview-info__value">{area}</p>
          <p className="c-siteoverview-info__unit">公頃</p>
        </div>
        <div className="bnt c-siteoverview-basicdata-button">養殖場基本資料表</div>
      </div>
    </div>
  );
}
