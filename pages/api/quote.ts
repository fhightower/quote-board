import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const quote = await prisma.quote.findFirst();

      res.status(200).json(quote);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch quote' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
