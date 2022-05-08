import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSirasIdsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['ID'];
}>;


export type GetSirasIdsQuery = { __typename?: 'Query', site?: { __typename?: 'Site', sirasIds: Array<string> } | null };


export const GetSirasIdsDocument = gql`
    query GetSirasIds($siteId: ID!) {
  site(siteId: $siteId) {
    sirasIds
  }
}
    `;

/**
 * __useGetSirasIdsQuery__
 *
 * To run a query within a React component, call `useGetSirasIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSirasIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSirasIdsQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useGetSirasIdsQuery(baseOptions: Apollo.QueryHookOptions<GetSirasIdsQuery, GetSirasIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSirasIdsQuery, GetSirasIdsQueryVariables>(GetSirasIdsDocument, options);
      }
export function useGetSirasIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSirasIdsQuery, GetSirasIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSirasIdsQuery, GetSirasIdsQueryVariables>(GetSirasIdsDocument, options);
        }
export type GetSirasIdsQueryHookResult = ReturnType<typeof useGetSirasIdsQuery>;
export type GetSirasIdsLazyQueryHookResult = ReturnType<typeof useGetSirasIdsLazyQuery>;
export type GetSirasIdsQueryResult = Apollo.QueryResult<GetSirasIdsQuery, GetSirasIdsQueryVariables>;