import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_TOKEN_GIVER_BACKEND_URL}/graphql`
});

// Add error handling
const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      console.error("GraphQL Errors:", response.errors);
    }
    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

const ApollosProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApollosProvider;
