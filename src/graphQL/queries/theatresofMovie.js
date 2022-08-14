import { gql } from "@apollo/client/core";

export const theatre = gql`
  query ($mid: ID!) {
    movie(id: $mid) {
      data {
        id
        attributes {
          movie_name
          bookings {
            data {
              id
              attributes {
                createdAt
              }
            }
          }
          movie_date
          movie_genre
          movie_poster_url
          theatres {
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
