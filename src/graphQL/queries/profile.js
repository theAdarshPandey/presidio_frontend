import { gql } from "@apollo/client/core";

export const profile = gql`
  query ($id: ID!) {
    client(id: $id) {
      data {
        id
        attributes {
          full_name
          email
          role
          bookings {
            data {
              id
              attributes {
                movie {
                  data {
                    id
                    attributes {
                      movie_name
                    }
                  }
                }
                theatre {
                  data {
                    id
                    attributes {
                      theatre_name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
