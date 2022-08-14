import { gql } from "@apollo/client/core";

export const loginQuery = gql`
  query ($email: String!, $pass: String!) {
    clients(filters: { email: { eq: $email }, password: { eq: $pass } }) {
      data {
        id
        attributes {
          full_name
          email
          password
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
