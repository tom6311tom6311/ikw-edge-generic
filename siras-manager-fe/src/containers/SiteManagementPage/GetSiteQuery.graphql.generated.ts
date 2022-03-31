import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSiteQueryVariables = Types.Exact<{
  siteId: Types.Scalars['ID'];
}>;


export type GetSiteQuery = { __typename?: 'Query', site?: { __typename?: 'Site', siteId: string, companyNameChin?: string | null, numSiras: number, capacity: number, area?: number | null, centralDevice?: { __typename?: 'Device', deviceId: string, opIds: Array<number> } | null } | null };


export const GetSiteDocument = gql`
    query GetSite($siteId: ID!) {
  site(siteId: $siteId) {
    siteId
    companyNameChin
    numSiras
    centralDevice {
      deviceId
      opIds
    }
    capacity
    area
  }
}
    `;

/**
 * __useGetSiteQuery__
 *
 * To run a query within a React component, call `useGetSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useGetSiteQuery(baseOptions: Apollo.QueryHookOptions<GetSiteQuery, GetSiteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteQuery, GetSiteQueryVariables>(GetSiteDocument, options);
      }
export function useGetSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteQuery, GetSiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteQuery, GetSiteQueryVariables>(GetSiteDocument, options);
        }
export type GetSiteQueryHookResult = ReturnType<typeof useGetSiteQuery>;
export type GetSiteLazyQueryHookResult = ReturnType<typeof useGetSiteLazyQuery>;
export type GetSiteQueryResult = Apollo.QueryResult<GetSiteQuery, GetSiteQueryVariables>;