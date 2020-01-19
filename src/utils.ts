import * as jwt from 'jsonwebtoken';
import { Context } from 'graphql-yoga/dist/types';
import { TokenData } from './resolvers/Mutation';
import { UserRole } from './generated/prisma-client';

export const getUserId = (context: Context): string => {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, process.env.APP_SECRET) as TokenData;
        return userId;
    }

    throw new Error('Not authenticated');
};

export const getUserRole = (context: Context): UserRole => {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userRole } = jwt.verify(token, process.env.APP_SECRET) as TokenData;
        return userRole;
    }

    throw new Error('Not authenticated');
};
