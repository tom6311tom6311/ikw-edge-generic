import { gql } from '@apollo/client';

const GetSensorDataQuery = gql`
  query GetSensorData($deviceId: String!, $opId: Int!, $timeStart: Int!, $timeEnd: Int!) {
    sensorData(deviceId: $deviceId, opId: $opId, timeStart: $timeStart, timeEnd: $timeEnd) {
      timeSeries {
        timestamp
        value
      }
    }
  }
`;

export default GetSensorDataQuery;
