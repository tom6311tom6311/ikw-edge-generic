import * as React from 'react';
import { GetSitesQuery } from '../../containers/SiteListPage/SiteListPage.graphql.generated';

type CaseItemProps = {
  siteData: GetSitesQuery['sites'][number];
  changePageName:Function;
  changeDisplaySite:Function;
}

export default function CaseItem (props: CaseItemProps) {
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
    <div className='caseitem_container' > 
      <div className='caseitem_head_container'>
        <p className='caseitem_subhead'>案場</p>
        <div>
          <p className='caseitem_caseId'>{siteId}</p>
          <div className='bnt caseitem_button' onClick={() =>{ changePageName('SiteManagementPage'); changeDisplaySite(siteId)}}> 案場管理</div>
        </div>
      </div>
      <div className='caseitem_body_container'>
        <div className='caseitem_info_container'><p className='caseitem_info_key'>公司</p><p className='caseitem_info_value'>{companyNameChin}</p></div>
        <div className='caseitem_info_container'><p className='caseitem_info_key'>地點</p><p className='caseitem_info_value'>{`${county} ${district}`}</p></div>
        <div className='caseitem_info_container'><p className='caseitem_info_key'>SiRAS</p><p className='caseitem_info_value'>{numSiras}</p><p className='caseitem_info_unit'>U</p></div>
        <div className='caseitem_info_container' style={{height:'85px'}}><p className='caseitem_info_key'>魚種</p><p className='caseitem_info_value'  style={{width:'200px', height:'54px'}} >{speciesList}</p></div>
        <div className='caseitem_info_container'><p className='caseitem_info_key'>產量</p><p className='caseitem_info_value'>{capacity}</p><p className='caseitem_info_unit'>台斤</p></div>
        <div className='caseitem_info_container' style={{borderWidth:'0'}}><p className='caseitem_info_key'>面積</p><p className='caseitem_info_value'>{area}</p><p className='caseitem_info_unit'>公頃</p></div>
        <div className='bnt basicdata_button'>養殖場基本資料表</div>
      </div>
    </div>
  );
}
