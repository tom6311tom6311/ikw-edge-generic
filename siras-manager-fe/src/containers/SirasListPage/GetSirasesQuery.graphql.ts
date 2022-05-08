import { gql } from '@apollo/client';

const GetSirasesQuery = gql`
  query GetSirases($sirasIds: [ID!]!) {
    sirases(sirasIds: $sirasIds) {
      sirasId
      status
      capacity
      speciesList
    }
  }
`;

export default GetSirasesQuery;
