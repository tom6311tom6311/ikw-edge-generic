import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Line, LineChart, Tooltip, XAxis, ResponsiveContainer, ReferenceLine, YAxis, LabelProps,
} from 'recharts';
import { EuiSelect } from '@elastic/eui';
import NitriteSampleImg from '../../img/nitrite_sample.png';
import CctvImg from '../../img/CCTV_1.png';
import { useGetSiteQuery } from './GetSiteQuery.graphql.generated';
import { useGetOpsQuery } from './GetOpsQuery.graphql.generated';
import { useGetSensorDataQuery } from './GetSensorDataQuery.graphql.generated';
import TabHeader from '../../components/TabHeader/TabHeader';
import TimeUtils from '../../utils/TimeUtils';

type DataPoint = {
  [key: string]: string|number
};

type SelectableOption = {
  target:{
    value: string;
  }
}

const LINE_COLORS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
];

const LABEL_POSITIONS: LabelProps['position'][] = [
  'insideBottomLeft',
  'top',
  'insideBottomRight',
];

const TIME_SPAN_OPTIONS = [
  {
    text: '過去3小時', value: '0', span: 10800, labelConversion: TimeUtils.timestampToHourAndMin, aggregateWindow: '10m',
  },
  {
    text: '過去1天', value: '1', span: 86400, labelConversion: TimeUtils.timestampToHourAndMin, aggregateWindow: '1h',
  },
  {
    text: '過去10天', value: '2', span: 864000, labelConversion: TimeUtils.timestampToDate, aggregateWindow: '1d',
  },
  {
    text: '過去30天', value: '3', span: 2592000, labelConversion: TimeUtils.timestampToDate, aggregateWindow: '1d',
  },
];

function SiteStatusPage() {
  const { siteId } = useParams();
  const [timeSpan, setTimeSpan] = useState(TIME_SPAN_OPTIONS[0]);
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
      timeStart: Math.floor(Date.now() / 1000) - timeSpan.span,
      timeEnd: Math.floor(Date.now() / 1000),
      aggregateWindow: timeSpan.aggregateWindow,
    },
  });
  const isGetSensorDataReady = !(
    isGetSensorDataLoading || getSensorDataError || !getSensorDataData?.sensorData
  );

  let chartData: DataPoint[] = [];
  let averages: number[] = [];
  if (isGetSensorDataReady && getSensorDataData.sensorData[0].timeSeries) {
    chartData = getSensorDataData.sensorData[0].timeSeries.map(({ timestamp }, dataPointIdx) => {
      const dataPoint: DataPoint = { timestamp };
      dataPoint.readableTime = timeSpan.labelConversion(timestamp);
      getOpsData?.ops?.forEach(({ name }, opIdx) => {
        dataPoint[name] = getSensorDataData.sensorData[opIdx].timeSeries[dataPointIdx].value;
      });
      return dataPoint;
    });
    averages = getSensorDataData.sensorData
      .map(
        ({ timeSeries }) => timeSeries.reduce((acc, { value }) => (acc + value), 0),
      )
      .map(
        (sum) => (chartData.length === 0 ? 0 : Math.round((sum / chartData.length) * 100) / 100),
      );
  }

  const onQueryTimeChange = (opt: SelectableOption) => {
    setTimeSpan(TIME_SPAN_OPTIONS[parseInt(opt.target.value, 10)]);
  };

  return (
    <div className="sitemanage_container">
      <TabHeader
        title={siteId || '/'}
        currActiveIdx={0}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/siras` },
        ]}
      />
      <div className="sitemanage_divider" />
      <div className="sitemanage_body_container">
        <div className="sitemanage_body_subcontainer">
          <div className="sitemanage_body_item_header">
            <p className="sitemanage_body_title">基本資料</p>
            <p className="sitemanage_body_option">看更多</p>
          </div>
          <div className="container" style={{ padding: '0', margin: '0' }}>
            <div className="row" style={{ width: 'calc(100% + 12px)' }}>
              <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
                <div className="sitemanage_body_basicitem">
                  <p className="sitemanage_body_item_name">公司</p>
                  <div className="sitemanage_body_item_container">
                    <p className="sitemanage_body_item_company">{getSiteData?.site?.companyNameChin}</p>
                    <p className="sitemanage_body_item_unit" style={{ borderColor: 'white' }} />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4" style={{ padding: '0', margin: '0' }}>
                <div className="sitemanage_body_basicitem">
                  <p className="sitemanage_body_item_name">SiRAS</p>
                  <div className="sitemanage_body_item_container">
                    <p className="sitemanage_body_item_info">{getSiteData?.site?.numSiras}</p>
                    <p className="sitemanage_body_item_unit">U</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
                <div className="sitemanage_body_basicitem">
                  <p className="sitemanage_body_item_name">數量</p>
                  <div className="sitemanage_body_item_container">
                    <p className="sitemanage_body_item_info">{getSiteData?.site?.capacity}</p>
                    <p className="sitemanage_body_item_unit">尾</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
                <div className="sitemanage_body_basicitem">
                  <p className="sitemanage_body_item_name">面積</p>
                  <div className="sitemanage_body_item_container">
                    <p className="sitemanage_body_item_info">{getSiteData?.site?.area}</p>
                    <p className="sitemanage_body_item_unit">公頃</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sitemanage_body_subcontainer">
          <div className="sitemanage_body_item_header">
            <p className="sitemanage_body_title">監測圖表</p>
            <p className="sitemanage_body_option">看更多</p>
          </div>
          <div>
            <div className="sitemanage_body_basicitem" style={{ width: 'calc(100% - 10px)', height: 'fit-content' }}>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart
                  style={{ position: 'inherit' }}
                  margin={{
                    top: 30, right: 50, left: 30, bottom: 10,
                  }}
                  data={chartData}
                >
                  <XAxis dataKey="readableTime" />
                  <Tooltip />
                  {getOpsData?.ops.map(({ name: opName }, idx) => (
                    <YAxis
                      key={`${opName}-y-axis`}
                      yAxisId={`${opName}-y-axis`}
                      label={{
                        position: 'top',
                        value: opName,
                        fill: LINE_COLORS[idx % LINE_COLORS.length],
                        fontSize: 10,
                      }}
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      allowDecimals={false}
                      width={30}
                      tickSize={3}
                      stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                      tick={{ fontSize: 10 }}
                    />
                  ))}
                  {getOpsData?.ops.map(({ name: opName, unit }, idx) => (
                    <Line
                      key={`${opName}-line`}
                      name={opName}
                      type="monotone"
                      yAxisId={`${opName}-y-axis`}
                      dataKey={opName}
                      stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                      unit={` ${unit}` || ''}
                    />
                  ))}
                  {getOpsData?.ops.map(({ name: opName, unit }, idx) => (
                    <ReferenceLine
                      key={`${opName}-avg`}
                      y={averages[idx]}
                      yAxisId={`${opName}-y-axis`}
                      label={{
                        position: LABEL_POSITIONS[idx % LABEL_POSITIONS.length],
                        value: `${opName}平均: ${averages[idx]} ${unit}`,
                        fill: LINE_COLORS[idx % LINE_COLORS.length],
                        fontSize: 10,
                      }}
                      stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                      strokeDasharray="3 3"
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              <div className="sitemanage_chartbottom_container">
                {/* <div className="sitemanage_chart_dataselector_container">
                  <EuiSelect
                    className="sitemanage_euiselect"
                    id="dataSelector"
                    options={displaydataOptions}
                    value={displayData}
                    onChange={(e) => onQueryDataChange(e)}
                    aria-label="Use aria labels when no actual label is in use"
                  />
                </div> */}
                <div className="sitemanage_chart_timeselector_container">
                  <EuiSelect
                    className="sitemanage_euiselect"
                    id="timeSelector"
                    options={TIME_SPAN_OPTIONS.map(({ text, value }) => ({ text, value }))}
                    value={timeSpan.value}
                    onChange={(e) => onQueryTimeChange(e)}
                    aria-label="Use aria labels when no actual label is in use"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sitemanage_body_subcontainer" style={{ height: 'fit-content' }}>
          <div className="sitemanage_body_item_header">
            <p className="sitemanage_body_title">中央系統數據</p>
            {/* <p className='sitemanage_body_option'>設定</p> */}
          </div>
          <div className="container" style={{ padding: '0', margin: '0' }}>
            <div className="row" style={{ width: 'calc(100% + 12px)' }}>
              {getOpsData?.ops.map((op, opIdx) => (
                <div key={`${op.name}-live-value`} className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
                  <div key={op.name} className="sitemanage_body_basicitem">
                    <div style={{ width: 'calc(100% - 40px)', display: 'flex', margin: '10px 20px' }}>
                      <div className="sitemanage_paralight_blue" />
                      <p
                        className="sitemanage_body_item_name"
                        style={{
                          margin: '3.5px 0', padding: '0',
                        }}
                      >
                        {op.name}
                      </p>
                    </div>
                    <div className="sitemanage_body_item_systemdata_container">
                      <p className="sitemanage_body_item_systemdata">
                        {getSensorDataData?.sensorData[opIdx].timeSeries.slice(-1)[0]?.value}
                        {' '}
                        {op.unit}
                      </p>
                      <p className="sitemanage_body_item_systeminfo">即時數據</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sitemanage_body_subcontainer">
          <div className="sitemanage_body_item_header">
            <p className="sitemanage_body_title">亞硝酸採樣</p>
            <p className="sitemanage_body_option">＋新增採樣</p>
          </div>
          <div>
            <div
              className="row sitemanage_body_basicitem sitemanage_body_sampling_container"
              style={{
                width: 'calc(100% - 10px)', height: 'fit-content', padding: '5px', alignItems: 'center',
              }}
            >
              <img src={NitriteSampleImg} alt="nitrite_sample" className="col-6 sitemanage_body_sampling_img" style={{ padding: '0' }} />
              <div className="col-6 sitemanage_body_sampling_info" style={{ padding: '0' }}>
                <p className="sitemanage_body_item_descr">採樣時間</p>
                <p className="sitemanage_body_item_sampletime">10:00 am 111年1月26日</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sitemanage_body_subcontainer">
          <div className="sitemanage_body_item_header">
            <p className="sitemanage_body_title">現場監控影像</p>
          </div>
          <div>
            <div className="container sitemanage_body_basicitem" style={{ width: 'calc(100% - 10px)', height: '384px', borderWidth: '0' }}>
              <div className="row" style={{ width: 'calc(100% + 12px)' }}>
                <div className="col-6 col-xl-4" style={{ padding: '0' }}>
                  <img src={CctvImg} alt="CCTV_1" className="sitemanage_body_cctvimg" />
                  <div className="sitemanage_body_cctvtxt">鏡頭名稱/位置</div>
                </div>
                <div className="col-6 col-xl-4" style={{ padding: '0' }}>
                  <img src={CctvImg} alt="CCTV_1" className="sitemanage_body_cctvimg" />
                  <div className="sitemanage_body_cctvtxt">鏡頭名稱/位置</div>
                </div>
                <div className="col-6 col-xl-4" style={{ padding: '0' }}>
                  <img src={CctvImg} alt="CCTV_1" className="sitemanage_body_cctvimg" />
                  <div className="sitemanage_body_cctvtxt">鏡頭名稱/位置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteStatusPage;
