import { gql } from "@apollo/client";

export const GetSitesQuery = gql`
  query GetSites($siteIds: [ID!]!) {
    sites(siteIds: $siteIds) {
      siteId
      status
      companyNameChin
      county
    	district
      numSiras
      speciesList
      capacity
      area
    }
  }
`;
