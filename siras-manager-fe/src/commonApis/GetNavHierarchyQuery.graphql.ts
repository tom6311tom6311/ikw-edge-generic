import { gql } from '@apollo/client';

const GetNavHierarchyQuery = gql`
  query GetNavHierarchy {
    sites {
      siteId
      sirasIds
    }
  }
`;

export default GetNavHierarchyQuery;
