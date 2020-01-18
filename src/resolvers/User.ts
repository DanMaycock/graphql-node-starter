import { Context } from 'graphql-yoga/dist/types';
import { TestItem, User } from '../generated/prisma-client';

export default {
    User: {
        testItems: (parent: User, _args: {}, context: Context): [TestItem] => {
            return context.prisma.user({ id: parent.id }).testItems();
        },
    },
};
