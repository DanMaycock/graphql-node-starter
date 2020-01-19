import { TestItem, User } from '../generated/prisma-client';
import { Context } from 'graphql-yoga/dist/types';
import { getUserRole } from '../utils';

export default {
    Query: {
        users: (_parent: undefined, _args: {}, context: Context): [User] => {
            if (getUserRole(context) === 'ADMIN') {
                return context.prisma.users();
            } else {
                throw new Error('Unauthorized');
            }
        },
        testItems: (_parent: undefined, _args: {}, context: Context): [TestItem] => {
            return context.prisma.testItems();
        },
    },
};
