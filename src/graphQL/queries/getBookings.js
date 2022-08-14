import { gql } from "@apollo/client";

export const getBookings = gql`
  query ($movie_ID: ID!, $theatre_ID: ID!) {
    bookings(
      filters: {
        movie: { id: { eq: $movie_ID } }
        theatre: { id: { eq: $theatre_ID } }
      }
    ) {
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
        }
      }
    }
  }
`;
