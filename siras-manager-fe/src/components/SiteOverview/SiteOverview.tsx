import * as React from 'react';
import { GetSitesQuery } from '../../containers/SiteListPage/SiteListPage.graphql.generated';

type SiteOverviewProps = {
  siteData: GetSitesQuery['sites'][number];
  changePageName:Function;
  changeDisplaySite:Function;
}

export default function SiteOverview (props: SiteOverviewProps) {
  const {
    siteData: {
      siteId,
      companyNameChin,
      county,
      district,
      numSiras,
      speciesList,
      capacity,
      area,
    },
    changePageName,
    changeDisplaySite
  } = props
  return (
    <div className='siteoverview_container' > 
      <div className='siteoverview_head_container'>
        <p className='siteoverview_subhead'>案場</p>
        <div>
          <p className='siteoverview_caseId'>{siteId}</p>
          <div className='bnt siteoverview_button' onClick={() =>{ changePageName('SiteManagementPage'); changeDisplaySite(siteId)}}> 案場管理</div>
        </div>
      </div>
      <div className='siteoverview_body_container'>
        <div className='siteoverview_info_container'><p className='siteoverview_info_key'>公司</p><p className='siteoverview_info_value'>{companyNameChin}</p></div>
        <div className='siteoverview_info_container'><p className='siteoverview_info_key'>地點</p><p className='siteoverview_info_value'>{`${county} ${district}`}</p></div>
        <div className='siteoverview_info_container'><p className='siteoverview_info_key'>SiRAS</p><p className='siteoverview_info_value'>{numSiras}</p><p className='siteoverview_info_unit'>U</p></div>
        <div className='siteoverview_info_container' style={{height:'85px'}}><p className='siteoverview_info_key'>魚種</p><p className='siteoverview_info_value'  style={{width:'200px', height:'54px'}} >{speciesList}</p></div>
        <div className='siteoverview_info_container'><p className='siteoverview_info_key'>產量</p><p className='siteoverview_info_value'>{capacity}</p><p className='siteoverview_info_unit'>台斤</p></div>
        <div className='siteoverview_info_container' style={{borderWidth:'0'}}><p className='siteoverview_info_key'>面積</p><p className='siteoverview_info_value'>{area}</p><p className='siteoverview_info_unit'>公頃</p></div>
        <div className='bnt basicdata_button'>養殖場基本資料表</div>
      </div>
    </div>
  );
}
