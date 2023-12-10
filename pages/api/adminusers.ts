// /pages/api/admin/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react"; // 使用 next-auth 提供的 getSession 方法
import prisma from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session?.user?.email) {
        return null;
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser || !currentUser.isAdmin) {
        return res.status(403).json({ message: 'Access Denied' });
    }

    // 获取所有用户信息，排除敏感字段
    const users = await prisma.user.findMany({
        select: {
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            // 排除敏感信息
            hashedPassword: false,
        }
    });

    res.status(200).json(users);
}
