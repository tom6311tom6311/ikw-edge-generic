import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSirasesQueryVariables = Types.Exact<{
  sirasIds: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type GetSirasesQuery = { __typename?: 'Query', sirases: Array<{ __typename?: 'Siras', sirasId: string, status: Types.SirasStatus, capacity: number, speciesList: Array<string> }> };


export const GetSirasesDocument = gql`
    query GetSirases($sirasIds: [ID!]!) {
  sirases(sirasIds: $sirasIds) {
    sirasId
    status
    capacity
    speciesList
  }
}
    `;

/**
 * __useGetSirasesQuery__
 *
 * To run a query within a React component, call `useGetSirasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSirasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSirasesQuery({
 *   variables: {
 *      sirasIds: // value for 'sirasIds'
 *   },
 * });
 */
export function useGetSirasesQuery(baseOptions: Apollo.QueryHookOptions<GetSirasesQuery, GetSirasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSirasesQuery, GetSirasesQueryVariables>(GetSirasesDocument, options);
      }
export function useGetSirasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSirasesQuery, GetSirasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSirasesQuery, GetSirasesQueryVariables>(GetSirasesDocument, options);
        }
export type GetSirasesQueryHookResult = ReturnType<typeof useGetSirasesQuery>;
export type GetSirasesLazyQueryHookResult = ReturnType<typeof useGetSirasesLazyQuery>;
export type GetSirasesQueryResult = Apollo.QueryResult<GetSirasesQuery, GetSirasesQueryVariables>;