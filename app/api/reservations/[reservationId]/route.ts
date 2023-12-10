import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  // 检查用户是否为管理员
  const isAdmin = currentUser.isAdmin;

  const reservation = await prisma.reservation.deleteMany({
    where: {
      AND: [
        { id: reservationId },
        {
          OR: [
            { userId: currentUser.id }, // 预订的创建者
            { listing: { userId: currentUser.id } }, // 列表的拥有者
            ...(isAdmin ? [{ id: reservationId }] : []), // 如果是管理员，可以删除任何预订
          ],
        },
      ],
    }
  });

  return NextResponse.json(reservation);
}

