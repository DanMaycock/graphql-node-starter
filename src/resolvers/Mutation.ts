import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getUserId } from '../utils';
import { User, TestItem, TestItemCreateInput, UserCreateInput, UserRole } from '../generated/prisma-client';
import { Context } from 'graphql-yoga/dist/types';

export interface TokenData {
    readonly userId: string;
    readonly userRole: UserRole;
}
interface AuthPayload {
    token: string;
    user: User;
}

export default {
    Mutation: {
        signup: async (_parent: undefined, args: UserCreateInput, context: Context): Promise<AuthPayload> => {
            const password = await bcrypt.hash(args.password, 10);
            const user = await context.prisma.createUser({ ...args, password });
            const tokenData: TokenData = { userId: user.id, userRole: user.role };
            const token = jwt.sign(tokenData, process.env.APP_SECRET);
            return { token, user };
        },

        login: async (_parent: undefined, args: UserCreateInput, context: Context): Promise<AuthPayload> => {
            const user = await context.prisma.user({ email: args.email });
            if (!user) {
                throw new Error('No such user');
            }

            const valid = await bcrypt.compare(args.password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            const tokenData: TokenData = { userId: user.id, userRole: user.role };
            const token = jwt.sign(tokenData, process.env.APP_SECRET);
            return { token, user };
        },

        addTestItem: async (_parent: undefined, args: TestItemCreateInput, context: Context): Promise<TestItem> => {
            const userId = getUserId(context);
            return context.prisma.createTestItem({
                field1: args.field1,
                field2: args.field2,
                user: { connect: { id: userId } },
            });
        },
    },
};
