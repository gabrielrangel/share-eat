import {Prisma} from "@prisma/client"

export function placeCreateDataValidator(
  createData: any
) {
  const modelKeys = Object.keys(Prisma.validator<Prisma.PlaceSelect>()({
    name: true
  }));

  return modelKeys.filter(key => typeof createData[key] === 'undefined')
}