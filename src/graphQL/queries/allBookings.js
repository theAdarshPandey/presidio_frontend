import { gql } from "@apollo/client";

export const allBookings = gql`
  query {
    bookings {
      data {
        id
        attributes {
          client {
            data {
              id
              attributes {
                full_name
              }
            }
          }
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
`;
