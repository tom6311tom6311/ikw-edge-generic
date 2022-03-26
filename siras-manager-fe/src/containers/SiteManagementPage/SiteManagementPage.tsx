import * as React from 'react';
import { Line, LineChart, Tooltip, XAxis } from 'recharts';

 type ISiteManagementPageProps = {
  displaySite: String;
  sideBarState: Boolean;
}

export default function SiteManagementPage (props: ISiteManagementPageProps) {
  const {
    displaySite,
    sideBarState,
  } = props
  
  const [bookmarkNow, changeBookmark] = React.useState('siteStatus')
  const value = {
    'air':14.77,
    'air_temp':33,
    'light':99,
    'O2':20.9,
    'ammonia':0
  }
  const warning_value = {
    'air':10,
    'air_temp':35,
    'light':70,
    'O2':35,
    'ammonia':25
  }

  const dataset1 = [
    { x: 0, y: 3 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 10 },
  ];
  
  return (
    <div className={sideBarState?'siteManang_container':''}>
      <div className={sideBarState?'siteManage_Header_container sidebar_on':'siteManage_Header_container'}>
        <div>
          <p className='siteManage_Header_siteId'>{displaySite}</p>
          <img className='siteManage_Header_search_icon' src={require('../../img/search.png')} alt='searching' />
        </div>
        <div>
          <div className={bookmarkNow==='siteStatus'?'siteManage_bookmark_on':'siteManage_bookmark_off'}>案場狀態</div>
          <div className={bookmarkNow==='SiRASList'?'siteManage_bookmark_on':'siteManage_bookmark_off'}>SiRAS列表</div>
          <img className='siteManage_Header_moreInfo_icon' src={require('../../img/moreInfo_black.png')} alt='more info' />
        </div>
      </div>
      <div className={sideBarState?'siteManage_divider sidebar_on':'siteManage_divider'}></div>
      <div className='siteManage_body_container'>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>基本資料</p>
            <p className='siteManage_body_option'>看更多</p>
          </div>
          <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div style={{display:'flex', flexDirection:'row', flex:'1'}}>
              <div className='siteManage_body_basicItem'>
                <p className='siteManage_body_item_name'>公司</p>
                <div style={{flex:'1'}}>
                  <p className='siteManage_body_item_companyName'>愛諾華特</p>
                  <p className='siteManage_body_item_unit' style={{borderColor:'white'}}></p>
                </div>
              </div>
              <div className='siteManage_body_basicItem'>
                <p className='siteManage_body_item_name'>SiRAS</p>
                <div style={{flex:'1'}}>
                  <p className='siteManage_body_item_info'>99</p>
                  <p className='siteManage_body_item_unit'>U</p>
                </div>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', flex:'1'}}>
              <div className='siteManage_body_basicItem'>
                <p className='siteManage_body_item_name'>數量</p>
                <div style={{flex:'1'}}>
                  <p className='siteManage_body_item_info'>9999</p>
                  <p className='siteManage_body_item_unit'>尾</p>
                </div>
              </div>
              <div className='siteManage_body_basicItem'>
                <p className='siteManage_body_item_name'>面積</p>
                <div style={{flex:'1'}}>
                  <p className='siteManage_body_item_info'>0.1</p>
                  <p className='siteManage_body_item_unit'>公頃</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>監測圖表</p>
            <p className='siteManage_body_option'>看更多</p>
          </div>
          <div>
            <div className='siteManage_body_basicItem' style={{width:'calc(100% - 10px)',height:'386px'}}>
              <LineChart
                width={400}
                height={400}
                data={dataset1}
              >
                <XAxis dataKey="x" />
                <Tooltip />
                <Line dataKey='y' />
              </LineChart>
            </div>
          </div>
        </div>
        <div className='siteManage_body_subcontainer' style={{height:'fit-content'}}>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>中央系統數據</p>
            {/* <p className='siteManage_body_option'>設定</p> */}
          </div>
          <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div style={{display:'flex', flexDirection:'row', flex:'1'}}>
              <div className='siteManage_body_basicItem' style={{height:'105px'}}>
                <div>
                  <div className={value.air<=warning_value.air?"siteManage_paralight_red":"siteManage_paralight_blue"}></div>
                  <p className='siteManage_body_item_name' style={{float:'left', width:'auto',margin:'13px 0 0 0',padding:'0'}}>打氣</p>
                </div>
                <div style={{flex:'1'}}>
                  <p className={value.air<=warning_value.air?"siteManage_body_item_alert":"siteManage_body_item_normal"}>{value.air} A</p>
                  {
                    value.air<=warning_value.air?
                    <p className='siteManage_body_item_unit' style={{width:'110px', color:'#E53A17', borderColor:'#E53A17'}}>打氣異常</p>
                    :<p className='siteManage_body_item_unit' style={{width:'70px'}}>即時數據</p>
                  }                
                </div>
              </div>
              <div className='siteManage_body_basicItem' style={{height:'105px'}}>
                <div>
                  <div className={value.air_temp>=warning_value.air_temp?"siteManage_paralight_red":"siteManage_paralight_blue"}></div>
                  <p className='siteManage_body_item_name' style={{float:'left', width:'auto',margin:'13px 0 0 0',padding:'0'}}>風管溫度</p>
                </div>
                <div style={{flex:'1'}}>
                  <p className={value.air_temp>=warning_value.air_temp?"siteManage_body_item_alert":"siteManage_body_item_normal"}>{value.air_temp} °C</p>
                  {
                    value.air_temp>=warning_value.air_temp?
                    <p className='siteManage_body_item_unit' style={{width:'110px', color:'#E53A17', borderColor:'#E53A17'}}>風管溫度異常</p>
                    :<p className='siteManage_body_item_unit' style={{width:'70px'}}>即時數據</p>
                  }                
                </div>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', flex:'1'}}>
              <div className='siteManage_body_basicItem' style={{height:'105px'}}>
                <div>
                  <div className={value.light<=warning_value.light?"siteManage_paralight_red":"siteManage_paralight_blue"}></div>
                  <p className='siteManage_body_item_name' style={{float:'left', width:'auto',margin:'13px 0 0 0',padding:'0'}}>光照計</p>
                </div>
                <div style={{flex:'1'}}>
                  <p className={value.light<=warning_value.light?"siteManage_body_item_alert":"siteManage_body_item_normal"}>{value.light} lux</p>
                  {
                    value.light<=warning_value.light?
                    <p className='siteManage_body_item_unit' style={{width:'110px', color:'#E53A17', borderColor:'#E53A17'}}>光照異常</p>
                    :<p className='siteManage_body_item_unit' style={{width:'70px'}}>即時數據</p>
                  }                
                </div>
              </div>
              <div className='siteManage_body_basicItem' style={{height:'105px'}}>
                <div>
                  <div className={value.O2<=warning_value.O2?"siteManage_paralight_red":"siteManage_paralight_blue"}></div>
                  <p className='siteManage_body_item_name' style={{float:'left', width:'auto',margin:'13px 0 0 0',padding:'0'}}>O2</p>
                </div>
                <div style={{flex:'1'}}>
                  <p className={value.O2<=warning_value.O2?"siteManage_body_item_alert":"siteManage_body_item_normal"}>{value.O2} %</p>
                  {
                    value.O2<=warning_value.O2?
                    <p className='siteManage_body_item_unit' style={{width:'110px', color:'#E53A17', borderColor:'#E53A17'}}>氧氣含量異常</p>
                    :<p className='siteManage_body_item_unit' style={{width:'70px'}}>即時數據</p>
                  }
                </div>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', flex:'1'}}>
              <div className='siteManage_body_basicItem' style={{height:'105px'}}>
                <div>
                  <div className={value.ammonia>=warning_value.ammonia?"siteManage_paralight_red":"siteManage_paralight_blue"}></div>
                  <p className='siteManage_body_item_name' style={{float:'left', width:'auto',margin:'13px 0 0 0',padding:'0'}}>氨氣</p>
                </div>
                <div style={{flex:'1'}}>
                  <p className={value.ammonia>=warning_value.ammonia?"siteManage_body_item_alert":"siteManage_body_item_normal"}>{value.ammonia} ppm</p>
                  {
                    value.ammonia>=warning_value.ammonia?
                    <p className='siteManage_body_item_unit' style={{width:'110px', color:'#E53A17', borderColor:'#E53A17'}}>氨氣含量異常</p>
                    :<p className='siteManage_body_item_unit' style={{width:'70px'}}>即時數據</p>
                  }                
                </div>
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
            <div className='siteManage_body_basicItem' style={{width:'calc(100% - 10px)',height:'150px', padding:'5px', flexDirection:'row'}}>
              <img src={require('../../img/nitrite_sample.png')} alt='nitrite_sample' style={{flex:'1', height:'130px', margin:'5px'}} />
              <div style={{margin:'5px', flex:'1'}}>
                <p className='siteManage_body_item_descr'>採樣時間</p>
                <p className='siteManage_body_item_sampleTime'>10:00 am 111年1月26日</p>
              </div>
            </div>
          </div>
        </div>
        <div className='siteManage_body_subcontainer'>
          <div className='siteManage_body_item_header'>
            <p className='siteManage_body_title'>現場監控影像</p>
          </div>
          <div>
            <div className='siteManage_body_basicItem' style={{width:'calc(100% - 10px)',height:'384px',borderWidth:'0' }}>
              <div style={{flexDirection:'row', display:'flex', height:'192px'}}>
                <div style={{flex:'1'}}>
                  <img src={require('../../img/CCTV_1.png')} alt='CCTV_1' className='siteManage_body_CCTVImg' />
                  <div className='siteManage_body_CCTVtxt'>鏡頭名稱/位置</div>
                </div>
                <div style={{flex:'1'}}>
                  <img src={require('../../img/CCTV_1.png')} alt='CCTV_1' className='siteManage_body_CCTVImg' />
                  <div className='siteManage_body_CCTVtxt'>鏡頭名稱/位置</div>
                </div>
              </div>
              <div style={{flexDirection:'row', display:'flex', height:'192px'}}>
                <div style={{flex:'1'}}>
                  <img src={require('../../img/CCTV_1.png')} alt='CCTV_1' className='siteManage_body_CCTVImg' />
                  <div className='siteManage_body_CCTVtxt'>鏡頭名稱/位置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
