import { gql } from '@apollo/client';

const GetOpsQuery = gql`
  query GetOps($opIds: [Int!]!) {
    ops(opIds: $opIds) {
      opId
      name
      unit
      defaultWarningThreshold {
        low
        high
      }
    }
  }
`;

export default GetOpsQuery;
