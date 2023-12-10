// pages/api/reservations.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const reservations = await prisma.reservation.findMany();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
