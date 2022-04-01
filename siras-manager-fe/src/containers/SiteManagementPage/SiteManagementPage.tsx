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
import nextPageIcon from '../../img/nextPage.png';
import { useGetSiteQuery } from './GetSiteQuery.graphql.generated';
import { useGetOpsQuery } from './GetOpsQuery.graphql.generated';
import { useGetSensorDataQuery } from './GetSensorDataQuery.graphql.generated';

type DataPoint = {
  [key: string]: string|number
};

const TAB_NAMES = ['案場狀態', 'SiRAS列表'];

// const VALUES = {
//   air: 14.77,
//   air_temp: 33,
//   light: 99,
//   O2: 20.9,
//   ammonia: 0,
// };

// const WARNING_THRESHOLDS = {
//   air: 10,
//   air_temp: 35,
//   light: 70,
//   O2: 35,
//   ammonia: 25,
// };

// const SAMPLE_SENSOR_DATA = [
//   {
//     time: '09:00',
//     air: 14.7,
//     air_temp: 33,
//     light: 99,
//     O2: 18.8,
//     ammonia: 0,
//   },
//   {
//     time: '10:00',
//     air: 15.3,
//     air_temp: 32,
//     light: 98,
//     O2: 19.0,
//     ammonia: 0,
//   },
//   {
//     time: '11:00',
//     air: 15.7,
//     air_temp: 32,
//     light: 99,
//     O2: 19.3,
//     ammonia: 0,
//   },
//   {
//     time: '12:00',
//     air: 16.0,
//     air_temp: 31,
//     light: 99,
//     O2: 19.5,
//     ammonia: 0,
//   },
//   {
//     time: '13:00',
//     air: 15.9,
//     air_temp: 31,
//     light: 99,
//     O2: 19.4,
//     ammonia: 0,
//   },
//   {
//     time: '14:00',
//     air: 15.5,
//     air_temp: 31,
//     light: 99,
//     O2: 19.3,
//     ammonia: 0,
//   },
// ];

const SAMPLE_SIRAS_LIST = [
  {
    sirasId: 'B123456781',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456782',
    species: '斑點石鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456783',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456784',
    species: '斑點石鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456785',
    species: null,
    amount: null,
    status: null,
  },
  {
    sirasId: 'B123456786',
    species: '黑毛',
    amount: 999,
    status: '換池中',
  },
  {
    sirasId: 'B123456787',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456788',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456789',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456790',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
];

type SelectableOption = {
  target:{
    value: string;
  }
}

function SiteManagementPage() {
  const { siteId } = useParams();
  const displaytimeOptions = [
    { value: '0.5hr', text: '過去半小時' },
    { value: '1hr', text: '過去一小時' },
    { value: '3hr', text: '過去三小時' },
  ];
  const [currTabIdx, setCurrTabIdx] = useState<Number>(0);
  const [displayTime, setDisplayTime] = useState(displaytimeOptions[0].value);
  const [currPageIdx, setCurrpageIdx] = useState<Number>(0);
  const { loading: isGetSiteLoading, error: getSiteError, data: getSiteData } = useGetSiteQuery({ variables: { siteId: siteId || '' } });
  const isGetSiteReady = !(isGetSiteLoading || getSiteError || !getSiteData?.site);
  const { loading: isGetOpsLoading, error: getOpsError, data: getOpsData } = useGetOpsQuery({
    skip: !isGetSiteReady,
    variables: { opIds: getSiteData?.site?.centralDevice?.opIds || [] },
  });
  const isGetOpsReady = !(isGetOpsLoading || getOpsError || !getOpsData?.ops);
  const {
    loading: isGetSensorDataLoading,
    error: getSensorDataError,
    data: getSensorDataData,
  } = useGetSensorDataQuery({
    skip: !isGetOpsReady,
    variables: {
      deviceId: getSiteData?.site?.centralDevice?.deviceId || '',
      opIds: getSiteData?.site?.centralDevice?.opIds || [],
      timeStart: Math.floor(Date.now() / 1000) - 30 * 60,
      timeEnd: Math.floor(Date.now() / 1000),
    },
  });
  const isGetSensorDataReady = !(
    isGetSensorDataLoading || getSensorDataError || !getSensorDataData?.sensorData
  );

  const opNames = getOpsData?.ops.map(({ name }) => name);
  let chartData: DataPoint[] = [];
  if (isGetSensorDataReady && getSensorDataData.sensorData[0].timeSeries) {
    chartData = getSensorDataData.sensorData[0].timeSeries.map(({ timestamp }, dataPointIdx) => {
      const dataPoint: DataPoint = { timestamp };
      opNames?.forEach((name, opIdx) => {
        dataPoint[name] = getSensorDataData.sensorData[opIdx].timeSeries[dataPointIdx].value;
      });
      return dataPoint;
    });
  }

  const onQueryTimeChange = (queryTime: SelectableOption) => {
    setDisplayTime(queryTime.target.value);
  };

  return (
    <div className="siteManage_container">
      <div className="siteManage_Header_container">
        <div>
          <p className="siteManage_Header_siteId">{getSiteData?.site?.siteId}</p>
          <img className="siteManage_Header_search_icon" src={SearchImg} alt="searching" />
        </div>
        <div>
          {TAB_NAMES.map((tabName, tabIdx) => (
            <button
              key={tabName}
              type="button"
              className={`siteManage_bookmark ${tabIdx === currTabIdx ? 'siteManage_bookmark_on' : ''}`}
              onClick={() => { setCurrTabIdx(tabIdx); }}
            >
              {tabName}
            </button>
          ))}
          <img className="siteManage_Header_moreInfo_icon" src={MoreInfoImg} alt="more info" />
        </div>
      </div>
      <div className="siteManage_divider" />
      {
        currTabIdx === 0
          ? (
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
                      <div className="siteManage_body_item_container">
                        <p className="siteManage_body_item_companyName">{getSiteData?.site?.companyNameChin}</p>
                        <p className="siteManage_body_item_unit" style={{ borderColor: 'white' }} />
                      </div>
                    </div>
                    <div className="siteManage_body_basicItem">
                      <p className="siteManage_body_item_name">SiRAS</p>
                      <div className="siteManage_body_item_container">
                        <p className="siteManage_body_item_info">{getSiteData?.site?.numSiras}</p>
                        <p className="siteManage_body_item_unit">U</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
                    <div className="siteManage_body_basicItem">
                      <p className="siteManage_body_item_name">數量</p>
                      <div className="siteManage_body_item_container">
                        <p className="siteManage_body_item_info">{getSiteData?.site?.capacity}</p>
                        <p className="siteManage_body_item_unit">尾</p>
                      </div>
                    </div>
                    <div className="siteManage_body_basicItem">
                      <p className="siteManage_body_item_name">面積</p>
                      <div className="siteManage_body_item_container">
                        <p className="siteManage_body_item_info">{getSiteData?.site?.area}</p>
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
                  <div className="siteManage_body_basicItem" style={{ width: 'calc(100% - 10px)', height: 'fit-content' }}>
                    <ResponsiveContainer width="100%" height={380}>
                      <LineChart
                        style={{ position: 'inherit' }}
                        margin={{
                          top: 30, right: 50, left: 50, bottom: 10,
                        }}
                        data={chartData}
                      >
                        <XAxis dataKey="time" />
                        <Tooltip />
                        {opNames?.map((opName) => (
                          <Line key={opName} name={opName} type="monotone" dataKey={opName} />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="siteManage_chartBottom_container">
                      {/* <div className="siteManage_chart_dataSelector_container">
                        <EuiSelect
                          className="siteManage_EuiSelect"
                          id="dataSelector"
                          options={displaydataOptions}
                          value={displayData}
                          onChange={(e) => onQueryDataChange(e)}
                          aria-label="Use aria labels when no actual label is in use"
                        />
                      </div> */}
                      <div className="siteManage_chart_timeSelector_container">
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
                    {getOpsData?.ops.map((op, opIdx) => (
                      <div key={op.name} className="siteManage_body_basicItem">
                        <div>
                          <div className="siteManage_paralight_blue" />
                          <p
                            className="siteManage_body_item_name"
                            style={{
                              float: 'left', width: 'auto', margin: '13px 0 0 0', padding: '0',
                            }}
                          >
                            {op.name}
                          </p>
                        </div>
                        <div className="siteManage_body_item_systemData_container">
                          <p className="siteManage_body_item_systemData">
                            {getSensorDataData?.sensorData[opIdx].timeSeries.slice(-1)[0].value}
                            {' '}
                            {op.unit}
                          </p>
                          <p className="siteManage_body_item_systemInfo">即時數據</p>
                        </div>
                      </div>
                    ))}
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
                    className="siteManage_body_basicItem siteManage_body_sampling_container"
                    style={{
                      width: 'calc(100% - 10px)', height: 'fit-content', padding: '5px', alignItems: 'center',
                    }}
                  >
                    <img src={NitriteSampleImg} alt="nitrite_sample" style={{ flex: '1', height: '130px', margin: '5px' }} />
                    <div className="siteManage_body_sampling_info">
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
                    <div style={{ flexDirection: 'row', display: 'flex', height: 'fit-content' }}>
                      <div style={{ flex: '1', position: 'relative' }}>
                        <img src={CctvImg} alt="CCTV_1" className="siteManage_body_CCTVImg" />
                        <div className="siteManage_body_CCTVtxt">鏡頭名稱/位置</div>
                      </div>
                      <div style={{ flex: '1', position: 'relative' }}>
                        <img src={CctvImg} alt="CCTV_1" className="siteManage_body_CCTVImg" />
                        <div className="siteManage_body_CCTVtxt">鏡頭名稱/位置</div>
                      </div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex', height: 'fit-content' }}>
                      <div style={{ flex: '1', position: 'relative' }}>
                        <img src={CctvImg} alt="CCTV_1" className="siteManage_body_CCTVImg" />
                        <div className="siteManage_body_CCTVtxt">鏡頭名稱/位置</div>
                      </div>
                      <div style={{ flex: '1', position: 'relative' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className='siteManage_body_container"'>
              <div className="siteManage_SiRAS_table_container">
                <div className="siteManage_SiRAS_table_header">
                  <p className="siteManage_SiRAS_table_header_txt" style={{ marginLeft: '15px' }}>SiRAS(30)</p>
                  <p className="siteManage_SiRAS_table_header_txt">魚種</p>
                  <p className="siteManage_SiRAS_table_header_txt" style={{ flex: 0.7 }}>數量</p>
                  <p className="siteManage_SiRAS_table_header_txt">養殖狀況</p>
                </div>
                {
                  SAMPLE_SIRAS_LIST.map(({
                    sirasId, species, amount, status,
                  }) => (
                    <div key={sirasId} className="siteManage_SiRAS_table_bodyrow">
                      <p className="siteManage_SiRAS_table_bodyrow_SiRAS" style={{ marginLeft: '15px' }}>{sirasId}</p>
                      <p className="siteManage_SiRAS_table_bodyrow_info">{species}</p>
                      <p className="siteManage_SiRAS_table_bodyrow_info" style={{ flex: 0.7 }}>{amount !== null ? `${amount}尾` : ''}</p>
                      <p className="siteManage_SiRAS_table_bodyrow_info">{status}</p>
                    </div>
                  ))
                }
              </div>
              <div className="siteManage_SiRAS_PageList_container">
                <div className="siteManage_SiRAS_page_container">
                  {Array.from(Array(3).keys()).map((pageIdx) => (
                    <button key={pageIdx} type="button" onClick={() => { setCurrpageIdx(pageIdx); }}>
                      <p className={currPageIdx === pageIdx ? 'siteManage_SiRAS_page_on' : 'siteManage_SiRAS_page_off'}>{pageIdx + 1}</p>
                    </button>
                  ))}
                  <div className="siteManage_SiRAS_Nextpage_button"><img style={{ width: '11px', margin: '8px 13px 8px 16px' }} src={nextPageIcon} alt="nextPage" /></div>
                </div>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default SiteManagementPage;
