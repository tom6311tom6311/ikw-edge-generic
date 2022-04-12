import { InfluxDB } from '@influxdata/influxdb-client';
import { QueryResolvers, SensorData, TimeSeriesDataPoint } from '../generated/graphql';

type SensorDataResolver = QueryResolvers['sensorData'];
interface InfluxRow {
  _time: string;
  _field: string;
  _value: number;
}

const org = 'ikw'; //process.env.INFLUX_ORG || '';
const token = 'W1o05E8K9aGg-Omn4yOm2-5qhBIZF7RrR5IF_9jskDWC_0vcdpEoDWv0bdFwaLvUCQXqF-mu7grRKtGvKnQSMg=='; //process.env.INFLUX_TOKEN || '';
const bucket = 'ikw-sensing'; // process.env.INFLUX_BUCKET || '';

const client = new InfluxDB({url: 'http://fullybnb.synology.me:10861', token: token});

const sensorData: SensorDataResolver = async (parent, args) => {
  const { deviceId, opIds, timeStart, timeEnd, aggregateWindow } = args;
  const queryApi = client.getQueryApi(org);
  const timeStartISOStr = new Date(timeStart * 1000).toISOString();
  const timeEndISOStr = new Date(timeEnd * 1000).toISOString();
  const sensorDataArr: SensorData[] = [];
  for (const opId of opIds) {
    const query = `from(bucket: "${bucket}") |> range(start: ${timeStartISOStr}, stop: ${timeEndISOStr}) |> filter(fn: (r) => r._measurement == "${deviceId}_op${opId}") |> aggregateWindow(every: ${aggregateWindow}, fn: mean)`;
    const result: InfluxRow[] = await queryApi.collectRows(query);
    const timeSeries: TimeSeriesDataPoint[] = result
      .filter((row) => row._field === 'value_processed')
      .map(({ _time, _value }) => ({
        timestamp: Math.floor(Date.parse(_time) / 1000),
        value: Math.round(_value * 100) / 100,
      }));
    sensorDataArr.push({
      deviceId,
      opId,
      timeSeries,
    });
  }
  return sensorDataArr;
};

export default sensorData;
