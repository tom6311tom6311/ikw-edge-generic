import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOpsQueryVariables = Types.Exact<{
  opIds: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
}>;


export type GetOpsQuery = { __typename?: 'Query', ops: Array<{ __typename?: 'Op', opId: number, name: string, unit?: string | null, defaultWarningThreshold?: { __typename?: 'Threshold', low?: number | null, high?: number | null } | null }> };


export const GetOpsDocument = gql`
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

/**
 * __useGetOpsQuery__
 *
 * To run a query within a React component, call `useGetOpsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpsQuery({
 *   variables: {
 *      opIds: // value for 'opIds'
 *   },
 * });
 */
export function useGetOpsQuery(baseOptions: Apollo.QueryHookOptions<GetOpsQuery, GetOpsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpsQuery, GetOpsQueryVariables>(GetOpsDocument, options);
      }
export function useGetOpsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpsQuery, GetOpsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpsQuery, GetOpsQueryVariables>(GetOpsDocument, options);
        }
export type GetOpsQueryHookResult = ReturnType<typeof useGetOpsQuery>;
export type GetOpsLazyQueryHookResult = ReturnType<typeof useGetOpsLazyQuery>;
export type GetOpsQueryResult = Apollo.QueryResult<GetOpsQuery, GetOpsQueryVariables>;