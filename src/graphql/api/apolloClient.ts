import { ApolloClient, ApolloLink, concat } from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import {
  removeTypenameFromVariables,
  KEEP,
} from "@apollo/client/link/remove-typename";
import { from } from "@apollo/client";

const removeTypenameLink = removeTypenameFromVariables();
const createHttpLink = () =>
  new HttpLink({
    uri: "https://api.chargetrip.io/graphql",
  });

const localCache = new InMemoryCache();
const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.error(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
          operation,
          response
        );
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`, operation, response);
    }
  }
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-client-id": "65859a151b238e33960590ed",
      "x-app-id": "65859a151b238e33960590ef",
    },
  }));

  return forward(operation);
});

export function createApolloClient() {
  const httpLink = createHttpLink();
  const link = from([removeTypenameLink, httpLink]);
  const apolloClient = new ApolloClient({
    link: ApolloLink.from([
      removeTypenameLink,
      errorLink,
      authMiddleware,
      httpLink,
    ]),

    connectToDevTools: process.env.NODE_ENV !== "production",
    cache: localCache,
    assumeImmutableResults: true,
  });

  return apolloClient;
}
