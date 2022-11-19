import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreInfoImg from '../../img/moreInfo_black.png';
import { useGetSirasQuery } from './GetSirasQuery.graphql.generated';
import { useGetOpsQuery } from '../SiteStatusPage/GetOpsQuery.graphql.generated';
import { useGetSensorDataQuery } from '../SiteStatusPage/GetSensorDataQuery.graphql.generated';
import TabHeader from '../../components/TabHeader/TabHeader';
import Dropdown from '../../components/Dropdown/Dropdown';
import MonitorSection, { DataPoint, TIME_SPAN_OPTIONS } from '../../components/MonitorSection/MonitorSection';
import LiveDataSection from '../../components/LiveDataSection/LiveDataSection';
import SamplingSection from '../../components/SamplingSection/SamplingSection';
import CctvSection from '../../components/CctvSection/CctvSection';
import TileSection from '../../components/TileSection/TileSection';

const STATUS_MAP: { [key: string]: string; } = {
  ACTIVE: '養殖中',
  INACTIVE: '未養殖',
};

function SirasStatusPage() {
  const { siteId, sirasId } = useParams();
  const [isTabHeaderDropdownOpen, setIsTabHeaderDropdownOpen] = useState(false);
  const [timeSpan, setTimeSpan] = useState(TIME_SPAN_OPTIONS[0]);
  const toggleTabHeaderDropdown = () => setIsTabHeaderDropdownOpen(!isTabHeaderDropdownOpen);
  const {
    loading: isGetSirasLoading,
    error: getSirasError,
    data: getSirasData,
  } = useGetSirasQuery({ variables: { sirasId: sirasId || '' } });
  const isGetSirasReady = !(
    isGetSirasLoading
    || getSirasError
    || !getSirasData?.siras
  );
  const {
    loading: isGetOpsLoading,
    error: getOpsError,
    data: getOpsData,
  } = useGetOpsQuery({
    skip: !isGetSirasReady,
    variables: { opIds: getSirasData?.siras?.devices[0]?.opIds || [] },
  });
  const isGetOpsReady = !(isGetOpsLoading || getOpsError || !getOpsData?.ops);
  const {
    loading: isGetSensorDataLoading,
    error: getSensorDataError,
    data: getSensorDataData,
  } = useGetSensorDataQuery({
    skip: !isGetOpsReady,
    variables: {
      deviceId: getSirasData?.siras?.devices[0]?.deviceId || '',
      opIds: getSirasData?.siras?.devices[0]?.opIds || [],
      timeStart: Math.floor(Date.now() / 1000) - timeSpan.span,
      timeEnd: Math.floor(Date.now() / 1000),
      aggregateWindow: timeSpan.aggregateWindow,
    },
  });
  const isGetSensorDataReady = !(
    isGetSensorDataLoading
    || getSensorDataError
    || !getSensorDataData?.sensorData
  );

  let chartData: DataPoint[] = [];
  let averages: number[] = [];
  if (isGetSensorDataReady && getSensorDataData.sensorData[0].timeSeries) {
    chartData = getSensorDataData.sensorData[0].timeSeries.map(
      ({ timestamp }, dataPointIdx) => {
        const dataPoint: DataPoint = { timestamp };
        dataPoint.readableTime = timeSpan.labelConversion(timestamp);
        getOpsData?.ops?.forEach(({ name }, opIdx) => {
          dataPoint[name] = getSensorDataData.sensorData[opIdx].timeSeries[dataPointIdx].value;
        });
        return dataPoint;
      },
    );
    averages = getSensorDataData.sensorData
      .map(({ timeSeries }) => timeSeries.reduce((acc, { value }) => acc + value, 0))
      .map((sum) => (chartData.length === 0
        ? 0
        : Math.round((sum / chartData.length) * 100) / 100));
  }

  return (
    <div className="o-page-container">
      <TabHeader
        title={sirasId || '/'}
        breadcrumbText={`案場 ${siteId} /`}
        currActiveIdx={0}
        elements={[
          { text: 'SiRAS狀態', link: '#' },
          { text: '餵食紀錄', link: '#' },
          { text: '魚病檢測', link: '#' },
        ]}
        topRightTrigger={(
          <Dropdown
            isOpen={isTabHeaderDropdownOpen}
            trigger={<button className="button-clear c-moreinfo" type="button" onClick={toggleTabHeaderDropdown}><img src={MoreInfoImg} alt="more info" /></button>}
            menu={[
              <button type="button">飼料投餵紀錄表</button>,
              <button type="button">魚病檢測紀錄表</button>,
              <button type="button">列印報表</button>,
            ]}
          />
        )}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <TileSection
          title="基本資料"
          topRightTrigger={<p className="c-page-subcontainer-option">看更多</p>}
          tiles={[
            {
              title: '魚種',
              value: (getSirasData?.siras?.speciesList || []).join(', '),
            },
            {
              title: '魚隻數量',
              value: getSirasData?.siras?.capacity || 0,
              metaText: '尾',
            },
            {
              title: '狀態',
              value: STATUS_MAP[getSirasData?.siras?.status || ''] ?? '未知',
            },
          ]}
        />
        <MonitorSection
          ops={getOpsData?.ops || []}
          chartData={chartData}
          averages={averages}
          timeSpan={timeSpan}
          onTimeSpanChanged={setTimeSpan}
        />
        <LiveDataSection
          title="水質監測"
          ops={getOpsData?.ops || []}
          values={
            getSensorDataData
              ?.sensorData
              .map(({ timeSeries }) => (timeSeries.slice(-1)[0]?.value)) || []
          }
        />
        <LiveDataSection
          title="電流監測"
          ops={[]}
          values={[]}
        />
        <LiveDataSection
          title="裝置管理"
          ops={[]}
          values={[]}
        />
        <SamplingSection />
        <CctvSection title="水池影像辨識" cameras={getSirasData?.siras?.cameras || []} />
        <TileSection
          title="魚隻體型重量"
          topRightTrigger={
            <button type="button">查看採樣數據</button>
          }
          tiles={[
            {
              title: '魚種',
              value: '赤鰭笛鯛',
            },
            {
              title: '平均體重',
              value: 688,
              metaText: '公克',
            },
            {
              title: '平均體長',
              value: 30.2,
              metaText: '公分',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default SirasStatusPage;
