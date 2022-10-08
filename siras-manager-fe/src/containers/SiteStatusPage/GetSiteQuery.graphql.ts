import { gql } from '@apollo/client';

const GetSiteQuery = gql`
  query GetSite($siteId: ID!) {
    site(siteId: $siteId) {
      siteId
      area
      capacity
      centralDevice {
        deviceId
        opIds
      }
      sirasIds
      companyNameChin
      cameras {
        cameraName
        imageUrl
      }
    }
  }
`;

export default GetSiteQuery;
