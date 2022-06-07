import {Prisma} from "@prisma/client";
import {placeCreateDataValidator} from "@service/place/validate/placeCreateDataValidator";

test('invalid create data', () => {
  const createData: Partial<Prisma.PlaceCreateInput> = {};
  expect(placeCreateDataValidator(createData)).toEqual(['name'])
})

test('valid create data', () => {
  const createData: Prisma.PlaceCreateInput = {
    name: ""
  };
  expect(placeCreateDataValidator(createData)).toEqual([])
})
