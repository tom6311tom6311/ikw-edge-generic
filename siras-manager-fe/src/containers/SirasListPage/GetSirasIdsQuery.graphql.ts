import { gql } from '@apollo/client';

const GetSirasIdsQuery = gql`
  query GetSirasIds($siteId: ID!) {
    site(siteId: $siteId) {
      sirasIds
    }
  }
`;

export default GetSirasIdsQuery;
