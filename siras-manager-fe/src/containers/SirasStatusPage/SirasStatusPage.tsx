import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSirasQuery } from './GetSirasQuery.graphql.generated';
import { useGetOpsQuery } from '../SiteStatusPage/GetOpsQuery.graphql.generated';
import { useGetSensorDataQuery } from '../SiteStatusPage/GetSensorDataQuery.graphql.generated';
import TabHeader from '../../components/TabHeader/TabHeader';
import SirasInfoSection from './SirasInfoSection/SirasInfoSection';
import MonitorSection, { DataPoint, TIME_SPAN_OPTIONS } from '../../components/MonitorSection/MonitorSection';
import LiveDataSection from '../../components/LiveDataSection/LiveDataSection';
import SamplingSection from '../../components/SamplingSection/SamplingSection';
import CctvSection from '../../components/CctvSection/CctvSection';

function SirasStatusPage() {
  const { sirasId } = useParams();
  const [timeSpan, setTimeSpan] = useState(TIME_SPAN_OPTIONS[0]);
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
        currActiveIdx={0}
        elements={[
          { text: 'SiRAS??????', link: '#' },
          { text: '????????????', link: '#' },
          { text: '????????????', link: '#' },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <SirasInfoSection
          speciesList={getSirasData?.siras?.speciesList || []}
          capacity={getSirasData?.siras?.capacity || 0}
          status={getSirasData?.siras?.status || ''}
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

export default SirasStatusPage;
