import * as React from 'react';

 type ISiteManagementPageProps = {
  displaySite: String;
}

export default function SiteManagementPage (props: ISiteManagementPageProps) {
  const {
    displaySite,
  } = props
  
  const [bookmarkNow, changeBookmark] = React.useState('siteStatus')

  return (
    <div>
      <div className='siteManage_Header_container'>
        <div>
          <p className='siteManage_Header_siteId'>{displaySite}</p>
          <img className='siteManage_Header_search_icon' src={require('../../img/search.png')} alt='searching' />
        </div>
        <div>
          <div className={bookmarkNow==='siteStatus'?'siteManage_bookmark_on':'siteManage_bookmark_off'}>案場狀態</div>
          <div className={bookmarkNow==='SiRASList'?'siteManage_bookmark_on':'siteManage_bookmark_off'}>SiRAS列表</div>
          <img className='siteManage_Header_moreInfo_icon' src={require('../../img/moreInfo.png')} alt='more info' />
        </div>
      </div>
      <div className='siteManage_body_container'>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>基本資料</p>
            <p className='siteManage_body_option'>看更多</p>
          </div>
          <div>
            <div className='siteManage_body_basicItem'>
              <p className='siteManage_body_item_name'>SiRAS</p>
              <p className='siteManage_body_item_value'>99</p>
              <p className='siteManage_body_item_unit'>U</p>
            </div>
            <div className='siteManage_body_basicItem'>
              <p className='siteManage_body_item_name'>數量</p>
              <p className='siteManage_body_item_value'>9999</p>
              <p className='siteManage_body_item_unit'>尾</p>
            </div>
            <div className='siteManage_body_basicItem'>
              <p className='siteManage_body_item_name'>面積</p>
              <p className='siteManage_body_item_value'>0.1</p>
              <p className='siteManage_body_item_unit'>公頃</p>
            </div>
          </div>
        </div>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>監測圖表</p>
            <p className='siteManage_body_option'>看更多</p>
          </div>
          <div>
            <div className='siteManage_body_basicItem' style={{height:'168px'}}>
              
            </div>
          </div>
        </div>
        <div className='siteManage_body_subcontainer' style={{height:'105px'}}>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>中央系統數據</p>
            <p className='siteManage_body_option'>設定</p>
          </div>
          <div>
            <div className='siteManage_body_paraItem'>
              <div>
                <p className='siteManage_body_item_name' style={{float:'right', width:'33px',margin:'13px 243px 15px 0',padding:'0'}}>打氣</p>
                <div className='siteManage_paralight_blue'></div>
              </div>
              <div>
                <p className='siteManage_body_item_unit' style={{width:'60px',}}>即時數據</p>
                <p className='siteManage_body_item_value' style={{marginRight:'10px', width:'193px'}}>14.77 A</p>
              </div>
            </div>
          </div>
        </div>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>亞硝酸採樣</p>
            <p className='siteManage_body_option'>＋新增採樣</p>
          </div>
          <div>
            
          </div>
        </div>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>現場監控影像</p>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
