import { gql } from "@apollo/client/core";

export const allTheatres = gql`
  query {
    theatres {
      data {
        id
        attributes {
          theatre_name
          theatre_address
        }
      }
    }
  }
`;
