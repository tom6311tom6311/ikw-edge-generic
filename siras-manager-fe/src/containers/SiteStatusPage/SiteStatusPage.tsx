import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSiteQuery } from './GetSiteQuery.graphql.generated';
import { useGetOpsQuery } from './GetOpsQuery.graphql.generated';
import { useGetSensorDataQuery } from './GetSensorDataQuery.graphql.generated';
import TabHeader from '../../components/TabHeader/TabHeader';
import SiteInfoSection from './SiteInfoSection/SiteInfoSection';
import MonitorSection, { DataPoint, TIME_SPAN_OPTIONS } from '../../components/MonitorSection/MonitorSection';
import LiveDataSection from '../../components/LiveDataSection/LiveDataSection';
import SamplingSection from '../../components/SamplingSection/SamplingSection';
import CctvSection from '../../components/CctvSection/CctvSection';

function SiteStatusPage() {
  const { siteId } = useParams();
  const [timeSpan, setTimeSpan] = useState(TIME_SPAN_OPTIONS[0]);
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
    <div className="sitemanage_container">
      <TabHeader
        title={siteId || '/'}
        currActiveIdx={0}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/sirases` },
        ]}
      />
      <div className="sitemanage_divider" />
      <div className="sitemanage_body_container">
        <SiteInfoSection
          companyNameChin={getSiteData?.site?.companyNameChin || ''}
          sirasIds={getSiteData?.site?.sirasIds || []}
          capacity={getSiteData?.site?.capacity || 0}
          area={getSiteData?.site?.area || 0}
        />
        <MonitorSection
          ops={getOpsData?.ops || []}
          chartData={chartData}
          averages={averages}
          timeSpan={timeSpan}
          onTimeSpanChanged={setTimeSpan}
        />
        <LiveDataSection
          ops={getOpsData?.ops || []}
          values={
            getSensorDataData
              ?.sensorData
              .map(({ timeSeries }) => (timeSeries.slice(-1)[0]?.value)) || []
          }
        />
        <SamplingSection />
        <CctvSection />
      </div>
    </div>
  );
}

export default SiteStatusPage;
