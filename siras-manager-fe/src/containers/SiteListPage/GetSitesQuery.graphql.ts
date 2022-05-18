import { gql } from '@apollo/client';

const GetSitesQuery = gql`
  query GetSites {
    sites {
      siteId
      status
      companyNameChin
      county
      district
      sirasIds
      speciesList
      capacity
      area
    }
  }
`;

export default GetSitesQuery;
