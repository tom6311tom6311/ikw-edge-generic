import { gql } from '@apollo/client';

const GetSiteQuery = gql`
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

export default GetSiteQuery;
