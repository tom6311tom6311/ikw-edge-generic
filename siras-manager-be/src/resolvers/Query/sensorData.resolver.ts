import { GraphQLYogaError } from '@graphql-yoga/node';
import { InfluxDB } from '@influxdata/influxdb-client';
import { QueryResolvers, SensorData, TimeSeriesDataPoint } from '../../generated/graphql';

type SensorDataResolver = QueryResolvers['sensorData'];
interface InfluxRow {
  _time: string;
  _field: string;
  _value: number;
}

const org = process.env.INFLUX_ORG || '';
const token = process.env.INFLUX_TOKEN || '';
const bucket = process.env.INFLUX_BUCKET || '';
const influxHost = process.env.INFLUX_HOST || 'influxdb';
const influxPort = process.env.INFLUX_PORT || 8086;

const client = new InfluxDB({url: `http://${influxHost}:${influxPort}`, token: token});

const sensorData: SensorDataResolver = async (parent, { deviceId, opIds, timeStart, timeEnd, aggregateWindow }, { claims }) => {
  if (claims === null) {
    throw new GraphQLYogaError("Authentication failed", { code: 401 });
  }
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
