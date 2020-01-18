import { TestItem } from '../generated/prisma-client';
import { Context } from 'graphql-yoga/dist/types';

export default {
    Query: {
        testItems: (_parent, _args: {}, context: Context): [TestItem] => {
            return context.prisma.testItems();
        },
    },
};
