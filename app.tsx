import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import React from "react";
import ReactDOM from "react-dom";
import { Counter } from "./counter";

// copied from: https://www.howtographql.com/react-apollo/8-subscriptions/
// allows for subscroptions to hit ws and normal queries to be delivered via http
// const link = split(
//     ({ query }) => {
//       const { kind, operation } = getMainDefinition(query)
//       return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     authLink.concat(httpLink)
//   )

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: "ws://localhost:3000/subscriptions",
        options: {
            reconnect: true,
        },
    }),
    cache: new InMemoryCache(),
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <h1>hello world</h1>
            <Counter />
        </ApolloProvider>
    );
};

ReactDOM.render(<App/>, document.getElementById("app"));
