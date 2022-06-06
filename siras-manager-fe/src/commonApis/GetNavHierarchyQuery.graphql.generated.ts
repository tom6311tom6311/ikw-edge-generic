import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNavHierarchyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNavHierarchyQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', siteId: string, sirasIds: Array<string> }> };


export const GetNavHierarchyDocument = gql`
    query GetNavHierarchy {
  sites {
    siteId
    sirasIds
  }
}
    `;

/**
 * __useGetNavHierarchyQuery__
 *
 * To run a query within a React component, call `useGetNavHierarchyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNavHierarchyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNavHierarchyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNavHierarchyQuery(baseOptions?: Apollo.QueryHookOptions<GetNavHierarchyQuery, GetNavHierarchyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNavHierarchyQuery, GetNavHierarchyQueryVariables>(GetNavHierarchyDocument, options);
      }
export function useGetNavHierarchyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNavHierarchyQuery, GetNavHierarchyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNavHierarchyQuery, GetNavHierarchyQueryVariables>(GetNavHierarchyDocument, options);
        }
export type GetNavHierarchyQueryHookResult = ReturnType<typeof useGetNavHierarchyQuery>;
export type GetNavHierarchyLazyQueryHookResult = ReturnType<typeof useGetNavHierarchyLazyQuery>;
export type GetNavHierarchyQueryResult = Apollo.QueryResult<GetNavHierarchyQuery, GetNavHierarchyQueryVariables>;