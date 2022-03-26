import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  Line, LineChart, Tooltip, XAxis,
} from 'recharts';
import SearchImg from '../../img/search.png';
import MoreInfoImg from '../../img/moreInfo_black.png';
import NitriteSampleImg from '../../img/nitrite_sample.png';
import CctvImg from '../../img/CCTV_1.png';

const VALUES = {
  air: 14.77,
  air_temp: 33,
  light: 99,
  O2: 20.9,
  ammonia: 0,
};

const WARNING_THRESHOLDS = {
  air: 10,
  air_temp: 35,
  light: 70,
  O2: 35,
  ammonia: 25,
};

const SAMPLE_SERIES = [
  { x: 0, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 10 },
];

function SiteManagementPage() {
  const { siteId } = useParams();
  const [bookmarkNow] = React.useState('siteStatus');

  return (
    <div className="siteManage_container">
      <div className="siteManage_Header_container">
        <div>
          <p className="siteManage_Header_siteId">{siteId}</p>
          <img className="siteManage_Header_search_icon" src={SearchImg} alt="searching" />
        </div>
        <div>
          <div className={bookmarkNow === 'siteStatus' ? 'siteManage_bookmark_on' : 'siteManage_bookmark_off'}>案場狀態</div>
          <div className={bookmarkNow === 'SiRASList' ? 'siteManage_bookmark_on' : 'siteManage_bookmark_off'}>SiRAS列表</div>
          <img className="siteManage_Header_moreInfo_icon" src={MoreInfoImg} alt="more info" />
        </div>
      </div>
      <div className="siteManage_divider" />
      <div className="siteManage_body_container">
        <div className="siteManage_body_subcontainer">
          <div className="siteManage_body_item_header">
            <p className="siteManage_body_title">基本資料</p>
            <p className="siteManage_body_option">看更多</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
              <div className="siteManage_body_basicItem">
                <p className="siteManage_body_item_name">公司</p>
                <div style={{ flex: '1' }}>
                  <p className="siteManage_body_item_companyName">愛諾華特</p>
                  <p className="siteManage_body_item_unit" style={{ borderColor: 'white' }} />
                </div>
              </div>
              <div className="siteManage_body_basicItem">
                <p className="siteManage_body_item_name">SiRAS</p>
                <div style={{ flex: '1' }}>
                  <p className="siteManage_body_item_info">99</p>
                  <p className="siteManage_body_item_unit">U</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
              <div className="siteManage_body_basicItem">
                <p className="siteManage_body_item_name">數量</p>
                <div style={{ flex: '1' }}>
                  <p className="siteManage_body_item_info">9999</p>
                  <p className="siteManage_body_item_unit">尾</p>
                </div>
              </div>
              <div className="siteManage_body_basicItem">
                <p className="siteManage_body_item_name">面積</p>
                <div style={{ flex: '1' }}>
                  <p className="siteManage_body_item_info">0.1</p>
                  <p className="siteManage_body_item_unit">公頃</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="siteManage_body_subcontainer">
          <div className="siteManage_body_item_header">
            <p className="siteManage_body_title">監測圖表</p>
            <p className="siteManage_body_option">看更多</p>
          </div>
          <div>
            <div className="siteManage_body_basicItem" style={{ width: 'calc(100% - 10px)', height: '386px' }}>
              <LineChart
                width={400}
                height={400}
                data={SAMPLE_SERIES}
              >
                <XAxis dataKey="x" />
                <Tooltip />
                <Line dataKey="y" />
              </LineChart>
            </div>
          </div>
        </div>
        <div className="siteManage_body_subcontainer" style={{ height: 'fit-content' }}>
          <div className="siteManage_body_item_header">
            <p className="siteManage_body_title">中央系統數據</p>
            {/* <p className='siteManage_body_option'>設定</p> */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
              <div className="siteManage_body_basicItem" style={{ height: '105px' }}>
                <div>
                  <div className={VALUES.air <= WARNING_THRESHOLDS.air ? 'siteManage_paralight_red' : 'siteManage_paralight_blue'} />
                  <p
                    className="siteManage_body_item_name"
                    style={{
                      float: 'left', width: 'auto', margin: '13px 0 0 0', padding: '0',
                    }}
                  >
                    打氣
                  </p>
                </div>
                <div style={{ flex: '1' }}>
                  <p className={VALUES.air <= WARNING_THRESHOLDS.air ? 'siteManage_body_item_alert' : 'siteManage_body_item_normal'}>
                    {VALUES.air}
                    {' '}
                    A
                  </p>
                  {
                    VALUES.air <= WARNING_THRESHOLDS.air
                      ? <p className="siteManage_body_item_unit" style={{ width: '110px', color: '#E53A17', borderColor: '#E53A17' }}>打氣異常</p>
                      : <p className="siteManage_body_item_unit" style={{ width: '70px' }}>即時數據</p>
                  }
                </div>
              </div>
              <div className="siteManage_body_basicItem" style={{ height: '105px' }}>
                <div>
                  <div className={VALUES.air_temp >= WARNING_THRESHOLDS.air_temp ? 'siteManage_paralight_red' : 'siteManage_paralight_blue'} />
                  <p
                    className="siteManage_body_item_name"
                    style={{
                      float: 'left', width: 'auto', margin: '13px 0 0 0', padding: '0',
                    }}
                  >
                    風管溫度
                  </p>
                </div>
                <div style={{ flex: '1' }}>
                  <p className={VALUES.air_temp >= WARNING_THRESHOLDS.air_temp ? 'siteManage_body_item_alert' : 'siteManage_body_item_normal'}>
                    {VALUES.air_temp}
                    {' '}
                    °C
                  </p>
                  {
                    VALUES.air_temp >= WARNING_THRESHOLDS.air_temp
                      ? <p className="siteManage_body_item_unit" style={{ width: '110px', color: '#E53A17', borderColor: '#E53A17' }}>風管溫度異常</p>
                      : <p className="siteManage_body_item_unit" style={{ width: '70px' }}>即時數據</p>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
              <div className="siteManage_body_basicItem" style={{ height: '105px' }}>
                <div>
                  <div className={VALUES.light <= WARNING_THRESHOLDS.light ? 'siteManage_paralight_red' : 'siteManage_paralight_blue'} />
                  <p
                    className="siteManage_body_item_name"
                    style={{
                      float: 'left', width: 'auto', margin: '13px 0 0 0', padding: '0',
                    }}
                  >
                    光照計
                  </p>
                </div>
                <div style={{ flex: '1' }}>
                  <p className={VALUES.light <= WARNING_THRESHOLDS.light ? 'siteManage_body_item_alert' : 'siteManage_body_item_normal'}>
                    {VALUES.light}
                    {' '}
                    lux
                  </p>
                  {
                    VALUES.light <= WARNING_THRESHOLDS.light
                      ? <p className="siteManage_body_item_unit" style={{ width: '110px', color: '#E53A17', borderColor: '#E53A17' }}>光照異常</p>
                      : <p className="siteManage_body_item_unit" style={{ width: '70px' }}>即時數據</p>
                  }
                </div>
              </div>
              <div className="siteManage_body_basicItem" style={{ height: '105px' }}>
                <div>
                  <div className={VALUES.O2 <= WARNING_THRESHOLDS.O2 ? 'siteManage_paralight_red' : 'siteManage_paralight_blue'} />
                  <p
                    className="siteManage_body_item_name"
                    style={{
                      float: 'left', width: 'auto', margin: '13px 0 0 0', padding: '0',
                    }}
                  >
                    O2
                  </p>
                </div>
                <div style={{ flex: '1' }}>
                  <p className={VALUES.O2 <= WARNING_THRESHOLDS.O2 ? 'siteManage_body_item_alert' : 'siteManage_body_item_normal'}>
                    {VALUES.O2}
                    {' '}
                    %
                  </p>
                  {
                    VALUES.O2 <= WARNING_THRESHOLDS.O2
                      ? <p className="siteManage_body_item_unit" style={{ width: '110px', color: '#E53A17', borderColor: '#E53A17' }}>氧氣含量異常</p>
                      : <p className="siteManage_body_item_unit" style={{ width: '70px' }}>即時數據</p>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
              <div className="siteManage_body_basicItem" style={{ height: '105px' }}>
                <div>
                  <div className={VALUES.ammonia >= WARNING_THRESHOLDS.ammonia ? 'siteManage_paralight_red' : 'siteManage_paralight_blue'} />
                  <p
                    className="siteManage_body_item_name"
                    style={{
                      float: 'left', width: 'auto', margin: '13px 0 0 0', padding: '0',
                    }}
                  >
                    氨氣
                  </p>
                </div>
                <div style={{ flex: '1' }}>
                  <p className={VALUES.ammonia >= WARNING_THRESHOLDS.ammonia ? 'siteManage_body_item_alert' : 'siteManage_body_item_normal'}>
                    {VALUES.ammonia}
                    {' '}
                    ppm
                  </p>
                  {
                    VALUES.ammonia >= WARNING_THRESHOLDS.ammonia
                      ? <p className="siteManage_body_item_unit" style={{ width: '110px', color: '#E53A17', borderColor: '#E53A17' }}>氨氣含量異常</p>
                      : <p className="siteManage_body_item_unit" style={{ width: '70px' }}>即時數據</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="siteManage_body_subcontainer">
          <div className="siteManage_body_item_header">
            <p className="siteManage_body_title">亞硝酸採樣</p>
            <p className="siteManage_body_option">＋新增採樣</p>
          </div>
          <div>
            <div
              className="siteManage_body_basicItem"
              style={{
                width: 'calc(100% - 10px)', height: '150px', padding: '5px', flexDirection: 'row',
              }}
            >
              <img src={NitriteSampleImg} alt="nitrite_sample" style={{ flex: '1', height: '130px', margin: '5px' }} />
              <div style={{ margin: '5px', flex: '1' }}>
                <p className="siteManage_body_item_descr">採樣時間</p>
                <p className="siteManage_body_item_sampleTime">10:00 am 111年1月26日</p>
              </div>
            </div>
          </div>
        </div>
        <div className="siteManage_body_subcontainer">
          <div className="siteManage_body_item_header">
            <p className="siteManage_body_title">現場監控影像</p>
          </div>
          <div>
            <div className="siteManage_body_basicItem" style={{ width: 'calc(100% - 10px)', height: '384px', borderWidth: '0' }}>
              <div style={{ flexDirection: 'row', display: 'flex', height: '192px' }}>
                <div style={{ flex: '1' }}>
                  <img src={CctvImg} alt="CCTV_1" className="siteManage_body_CCTVImg" />
                  <div className="siteManage_body_CCTVtxt">鏡頭名稱/位置</div>
                </div>
                <div style={{ flex: '1' }}>
                  <img src={CctvImg} alt="CCTV_1" className="siteManage_body_CCTVImg" />
                  <div className="siteManage_body_CCTVtxt">鏡頭名稱/位置</div>
                </div>
              </div>
              <div style={{ flexDirection: 'row', display: 'flex', height: '192px' }}>
                <div style={{ flex: '1' }}>
                  <img src={CctvImg} alt="CCTV_1" className="siteManage_body_CCTVImg" />
                  <div className="siteManage_body_CCTVtxt">鏡頭名稱/位置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteManagementPage;
