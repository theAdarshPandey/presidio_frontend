import { gql } from "@apollo/client/core";

export const allMovies = gql`
  query {
    movies {
      data {
        id
        attributes {
          movie_name
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
