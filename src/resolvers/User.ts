import { Context } from 'graphql-yoga/dist/types';
import { User, UserRole } from '../generated/prisma-client';

export default {
    UserRole: {
        USER: 'USER',
        ADMIN: 'ADMIN',
    },
    User: {
        role: (parent: User, _args: {}, context: Context): UserRole => {
            return context.prisma.user({ id: parent.id }).role();
        },
    },
};
