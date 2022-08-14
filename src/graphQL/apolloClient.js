import { ApolloClient, InMemoryCache } from "@apollo/client";
export const apolloClient = new ApolloClient({
  uri: "https://presidio-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
