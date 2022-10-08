import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSirasQueryVariables = Types.Exact<{
  sirasId: Types.Scalars['ID'];
}>;


export type GetSirasQuery = { __typename?: 'Query', siras?: { __typename?: 'Siras', sirasId: string, status: Types.SirasStatus, capacity: number, speciesList: Array<string>, devices: Array<{ __typename?: 'Device', deviceId: string, opIds: Array<number> }>, cameras: Array<{ __typename?: 'Camera', cameraName: string, imageUrl: string }> } | null };


export const GetSirasDocument = gql`
    query GetSiras($sirasId: ID!) {
  siras(sirasId: $sirasId) {
    sirasId
    status
    capacity
    speciesList
    devices {
      deviceId
      opIds
    }
    cameras {
      cameraName
      imageUrl
    }
  }
}
    `;

/**
 * __useGetSirasQuery__
 *
 * To run a query within a React component, call `useGetSirasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSirasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSirasQuery({
 *   variables: {
 *      sirasId: // value for 'sirasId'
 *   },
 * });
 */
export function useGetSirasQuery(baseOptions: Apollo.QueryHookOptions<GetSirasQuery, GetSirasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSirasQuery, GetSirasQueryVariables>(GetSirasDocument, options);
      }
export function useGetSirasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSirasQuery, GetSirasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSirasQuery, GetSirasQueryVariables>(GetSirasDocument, options);
        }
export type GetSirasQueryHookResult = ReturnType<typeof useGetSirasQuery>;
export type GetSirasLazyQueryHookResult = ReturnType<typeof useGetSirasLazyQuery>;
export type GetSirasQueryResult = Apollo.QueryResult<GetSirasQuery, GetSirasQueryVariables>;