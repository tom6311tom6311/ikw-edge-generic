import { gql } from '@apollo/client';

const GetSirasQuery = gql`
  query GetSiras($sirasId: ID!) {
    siras(sirasId: $sirasId) {
      sirasId
      status
      capacity
      speciesList
      devices {
        deviceId
        opIds
      }
      cameras {
        cameraName
        imageUrl
      }
    }
  }
`;

export default GetSirasQuery;
