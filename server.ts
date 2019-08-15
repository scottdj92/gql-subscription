import { GraphQLServer, PubSub } from "graphql-yoga";

const typeDefs = `
    type Query {
        hello(name: String!): String
    }

    type Subscription {
        counter: Counter
    }

    type Counter {
        count: Int!
        countStr: String!
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }, context) => {
            return name;
        },
    },
    Counter: {
        countStr: (parent, args, context) => {
            return `Current count: ${parent.count}`;
        },
    },
    Subscription: {
        counter: {
            subscribe: (_, args, { pubsub }) => {
                const channel = Math.random().toString(36).substring(2, 15);
                let count = 0;
                setInterval(() => {
                    pubsub.publish(channel, { counter: { count: count++ }});
                }, 2000);
                return pubsub.asyncIterator(channel);
            },
        },
    },
};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start({ port: 3000, subscriptions: "/subscriptions" }, () => console.log("server started on port 3000"));
