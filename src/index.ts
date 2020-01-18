import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import TestItem from './resolvers/TestItem';
import { Context } from 'graphql-yoga/dist/types';

const resolvers = { ...Query, ...Mutation, ...User, ...TestItem };

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (request): Context => {
        return {
            ...request,
            prisma,
        };
    },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
