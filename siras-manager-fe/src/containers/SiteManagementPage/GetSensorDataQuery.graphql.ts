import { gql } from '@apollo/client';

const GetSensorDataQuery = gql`
  query GetSensorData($deviceId: String!, $opIds: [Int!]!, $timeStart: Int!, $timeEnd: Int!) {
    sensorData(deviceId: $deviceId, opIds: $opIds, timeStart: $timeStart, timeEnd: $timeEnd) {
      timeSeries {
        timestamp
        value
      }
    }
  }
`;

export default GetSensorDataQuery;
