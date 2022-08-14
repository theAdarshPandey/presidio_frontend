import { gql } from "@apollo/client/core";

export const signup = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    createClient(
      data: { full_name: $name, email: $email, password: $password }
    ) {
      data {
        id
        attributes {
          full_name
          email
          password
          role
        }
      }
    }
  }
`;
