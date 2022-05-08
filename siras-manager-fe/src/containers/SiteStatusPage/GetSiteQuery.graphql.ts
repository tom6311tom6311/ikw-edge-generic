import { gql } from '@apollo/client';

const GetSiteQuery = gql`
  query GetSite($siteId: ID!) {
    site(siteId: $siteId) {
      siteId
      companyNameChin
      centralDevice {
        deviceId
        opIds
      }
      sirasIds
      capacity
      area
    }
  }
`;

export default GetSiteQuery;
