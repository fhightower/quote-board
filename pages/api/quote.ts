import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getNextSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    const daysUntilSunday = 7 - dayOfWeek;
    const nextSunday = new Date(today);

    nextSunday.setDate(today.getDate() + daysUntilSunday);

    return nextSunday;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // todo: pull the same quote for one week
      let state = prisma.state.findFirst();

      if (!state) {
        state = await prisma.state.create({
          data: {
            quoteId: 1,
            nextUpdate: getNextSunday(),
          },
        });
      } else {
        if (state.nextUpdate < new Date()) {
            state = await prisma.state.update({
                // todo: get random quote here...
                quoteId: state.quoteId + 1,
                nextUpdate: getNextSunday(),
            });
        }
      }

      const quote = (await prisma.$queryRaw`SELECT * FROM "Quote" WHERE id = ${state.quoteId}`)[0];
      res.status(200).json(quote);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch quote' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
