import { User, TestItem } from '../generated/prisma-client';
import { Context } from 'graphql-yoga/dist/types';

export default {
    TestItem: {
        user: (parent: TestItem, _args: {}, context: Context): User => {
            return context.prisma.testItem({ id: parent.id }).user();
        },
    },
};
