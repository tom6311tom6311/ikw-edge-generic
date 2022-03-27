import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Line, LineChart, Tooltip, XAxis, ResponsiveContainer,
} from 'recharts';
import { EuiSelect } from '@elastic/eui';
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

type SelectableOption = {
  target:{
    value: string;
  }
}

function SiteManagementPage() {
  const { siteId } = useParams();
  const [bookmarkNow] = React.useState('siteStatus');

  const sampledata = [
    {
      time: '09:00',
      air: 14.7,
      air_temp: 33,
      light: 99,
      O2: 18.8,
      ammonia: 0,
    },
    {
      time: '10:00',
      air: 15.3,
      air_temp: 32,
      light: 98,
      O2: 19.0,
      ammonia: 0,
    },
    {
      time: '11:00',
      air: 15.7,
      air_temp: 32,
      light: 99,
      O2: 19.3,
      ammonia: 0,
    },
    {
      time: '12:00',
      air: 16.0,
      air_temp: 31,
      light: 99,
      O2: 19.5,
      ammonia: 0,
    },
    {
      time: '13:00',
      air: 15.9,
      air_temp: 31,
      light: 99,
      O2: 19.4,
      ammonia: 0,
    },
    {
      time: '14:00',
      air: 15.5,
      air_temp: 31,
      light: 99,
      O2: 19.3,
      ammonia: 0,
    },
  ];

  const displaydataOptions = [
    { value: 'air/air_temp/light', text: '打氣/風管溫度/光照' },
  ];

  const displaytimeOptions = [
    { value: '0.5hr', text: '過去半小時' },
    { value: '1hr', text: '過去一小時' },
    { value: '3hr', text: '過去三小時' },
  ];

  const [displayTime, setDisplayTime] = useState(displaytimeOptions[0].value);
  const [displayData, setDisplayData] = useState(displaydataOptions[0].value);

  const onQueryTimeChange = (queryTime: SelectableOption) => {
    setDisplayTime(queryTime.target.value);
  };

  const onQueryDataChange = (queryData: SelectableOption) => {
    setDisplayData(queryData.target.value);
  };

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
              <ResponsiveContainer width="100%" height="85%">
                <LineChart
                  style={{ position: 'inherit' }}
                  margin={{
                    top: 30, right: 50, left: 50, bottom: 10,
                  }}
                  data={sampledata}
                >
                  <XAxis dataKey="time" />
                  <Tooltip />
                  <Line name="air voltage" type="monotone" dataKey="air" stroke="red" />
                  <Line name="air temp" type="monotone" dataKey="air_temp" stroke="yellow" />
                  <Line name="light" type="monotone" dataKey="light" stroke="blue" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 6 }}>
                  <EuiSelect
                    className="siteManage_EuiSelect"
                    id="DataSelector"
                    options={displaydataOptions}
                    value={displayData}
                    onChange={(e) => onQueryDataChange(e)}
                    aria-label="Use aria labels when no actual label is in use"
                  />
                </div>
                <div style={{ flex: 4 }}>
                  <EuiSelect
                    className="siteManage_EuiSelect"
                    id="timeSelector"
                    options={displaytimeOptions}
                    value={displayTime}
                    onChange={(e) => onQueryTimeChange(e)}
                    aria-label="Use aria labels when no actual label is in use"
                  />
                </div>
              </div>
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
                <div style={{ flex: '1' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteManagementPage;
