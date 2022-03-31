import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSensorDataQueryVariables = Types.Exact<{
  deviceId: Types.Scalars['String'];
  opId: Types.Scalars['Int'];
  timeStart: Types.Scalars['Int'];
  timeEnd: Types.Scalars['Int'];
}>;


export type GetSensorDataQuery = { __typename?: 'Query', sensorData?: { __typename?: 'SensorData', timeSeries: Array<{ __typename?: 'TimeSeriesDataPoint', timestamp: number, value: number }> } | null };


export const GetSensorDataDocument = gql`
    query GetSensorData($deviceId: String!, $opId: Int!, $timeStart: Int!, $timeEnd: Int!) {
  sensorData(
    deviceId: $deviceId
    opId: $opId
    timeStart: $timeStart
    timeEnd: $timeEnd
  ) {
    timeSeries {
      timestamp
      value
    }
  }
}
    `;

/**
 * __useGetSensorDataQuery__
 *
 * To run a query within a React component, call `useGetSensorDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSensorDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSensorDataQuery({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      opId: // value for 'opId'
 *      timeStart: // value for 'timeStart'
 *      timeEnd: // value for 'timeEnd'
 *   },
 * });
 */
export function useGetSensorDataQuery(baseOptions: Apollo.QueryHookOptions<GetSensorDataQuery, GetSensorDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSensorDataQuery, GetSensorDataQueryVariables>(GetSensorDataDocument, options);
      }
export function useGetSensorDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSensorDataQuery, GetSensorDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSensorDataQuery, GetSensorDataQueryVariables>(GetSensorDataDocument, options);
        }
export type GetSensorDataQueryHookResult = ReturnType<typeof useGetSensorDataQuery>;
export type GetSensorDataLazyQueryHookResult = ReturnType<typeof useGetSensorDataLazyQuery>;
export type GetSensorDataQueryResult = Apollo.QueryResult<GetSensorDataQuery, GetSensorDataQueryVariables>;