import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const quotes = await prisma.quote.findMany();
      res.status(200).json(quotes);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch quotes' });
    }
  } else if (req.method === 'POST') {
    try {
      const quote = await prisma.quote.create({
        data: {
            text: req.body.text,
            source: req.body.source,
        },
      });
      res.status(201).json(quote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create quote' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
