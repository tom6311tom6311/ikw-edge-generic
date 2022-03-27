import { QueryResolvers } from '../generated/graphql';

type SensorDataResolver = QueryResolvers['sensorData'];

const sensorData: SensorDataResolver = (parent, args) => ({
  deviceId: args.deviceId,
  opId: args.opId,
  warningThreshold: 15.0,
  timeSeries: [
    { timestamp: 1648395230, value: 12.2 },
    { timestamp: 1648395240, value: 13.2 },
    { timestamp: 1648395250, value: 18.2 },
    { timestamp: 1648395260, value: 14.2 },
    { timestamp: 1648395270, value: 16.2 },
  ],
});

export default sensorData;
