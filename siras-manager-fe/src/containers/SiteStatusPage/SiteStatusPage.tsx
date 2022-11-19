import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreInfoImg from '../../img/moreInfo_black.png';
import { useGetSiteQuery } from './GetSiteQuery.graphql.generated';
import { useGetOpsQuery } from './GetOpsQuery.graphql.generated';
import { useGetSensorDataQuery } from './GetSensorDataQuery.graphql.generated';
import TabHeader from '../../components/TabHeader/TabHeader';
import Dropdown from '../../components/Dropdown/Dropdown';
import MonitorSection, { DataPoint, TIME_SPAN_OPTIONS } from '../../components/MonitorSection/MonitorSection';
import LiveDataSection from '../../components/LiveDataSection/LiveDataSection';
import SamplingSection from '../../components/SamplingSection/SamplingSection';
import CctvSection from '../../components/CctvSection/CctvSection';
import TileSection from '../../components/TileSection/TileSection';

function SiteStatusPage() {
  const { siteId } = useParams();
  const [isTabHeaderDropdownOpen, setIsTabHeaderDropdownOpen] = useState(false);
  const [isSensorDataSectionDropdownOpen, setIsSensorDataSectionDropdownOpen] = useState(false);
  const [timeSpan, setTimeSpan] = useState(TIME_SPAN_OPTIONS[0]);
  const toggleTabHeaderDropdown = () => setIsTabHeaderDropdownOpen(!isTabHeaderDropdownOpen);
  const toggleSensorDataSectionDropdown = () => {
    setIsSensorDataSectionDropdownOpen(!isSensorDataSectionDropdownOpen);
  };
  const {
    loading: isGetSiteLoading,
    error: getSiteError,
    data: getSiteData,
  } = useGetSiteQuery({ variables: { siteId: siteId || '' } });
  const isGetSiteReady = !(
    isGetSiteLoading
    || getSiteError
    || !getSiteData?.site
  );
  const {
    loading: isGetOpsLoading,
    error: getOpsError,
    data: getOpsData,
  } = useGetOpsQuery({
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
    isGetSensorDataLoading
    || getSensorDataError
    || !getSensorDataData?.sensorData
  );

  let chartData: DataPoint[] = [];
  let averages: number[] = [];
  if (
    isGetSensorDataReady
    && getSensorDataData.sensorData[0]
    && getSensorDataData.sensorData[0].timeSeries
  ) {
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
        title={siteId || '/'}
        breadcrumbText="案場管理"
        currActiveIdx={0}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/sirases` },
        ]}
        topRightTrigger={(
          <Dropdown
            isOpen={isTabHeaderDropdownOpen}
            trigger={<button className="button-clear c-moreinfo" type="button" onClick={toggleTabHeaderDropdown}><img src={MoreInfoImg} alt="more info" /></button>}
            menu={[
              <button type="button">產銷報表</button>,
              <button type="button">場務報表</button>,
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
              title: '公司',
              value: getSiteData?.site?.companyNameChin || '',
            },
            {
              title: 'SiRAS',
              value: (getSiteData?.site?.sirasIds || []).length,
              metaText: 'U',
            },
            {
              title: '數量',
              value: getSiteData?.site?.capacity || 0,
              metaText: '尾',
            },
            {
              title: '面積',
              value: getSiteData?.site?.area || 0,
              metaText: '公頃',
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
          title="中央系統數據"
          topRightTrigger={(
            <Dropdown
              isOpen={isSensorDataSectionDropdownOpen}
              trigger={<button className="button-clear c-moreinfo" type="button" onClick={toggleSensorDataSectionDropdown}><img src={MoreInfoImg} alt="more info" /></button>}
              menu={[
                <button type="button">裝置設定</button>,
                ...(getOpsData?.ops || []).map(({ name }) => (
                  <button type="button">{name}</button>
                )),
              ]}
            />
          )}
          ops={getOpsData?.ops || []}
          values={
            getSensorDataData
              ?.sensorData
              .map(({ timeSeries }) => (timeSeries.slice(-1)[0]?.value)) || []
          }
        />
        <SamplingSection />
        <CctvSection title="現場監控影像" cameras={getSiteData?.site?.cameras || []} />
      </div>
    </div>
  );
}

export default SiteStatusPage;
