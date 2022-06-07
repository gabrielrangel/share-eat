import type {NextApiRequest, NextApiResponse} from 'next'
import {placeCreateDataValidator} from "@service/place/validate/placeCreateDataValidator";
import Prisma from "@lib/prisma";

export default async function newPlace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const missingKeys = placeCreateDataValidator(data);

  if (missingKeys.length) {
    const error = `Missing fields for create place ${JSON.stringify(missingKeys)}`;
    res.status(400).json({error});
    return;
  }

  const place = await Prisma.place.create({data})
  res.status(200).json({data: {place}});
}
