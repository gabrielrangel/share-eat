import newPlace from "@controller/places/newPlace";
import {createMocks} from 'node-mocks-http';
import {prismaMock} from '@test/lib/prisma'

test('invalid place data', async () => {
  const {req, res} = createMocks();

  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);

  await newPlace(req, res)

  expect(res.status).toBeCalledWith(400)
  expect(res.json).toBeCalledWith({error: `Missing fields for create place ${JSON.stringify(["name"])}`})
})

test('valid place data', async () => {
  const {req, res} = createMocks({
    body: {
      name: "place name"
    }
  });

  prismaMock.place.create.mockResolvedValue(req.body);

  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);

  await newPlace(req, res)

  expect(res.status).toBeCalledWith(200)
  expect(res.json).toBeCalledWith({
    data: {
      place: {
        ...req.body,
        id: expect.anything()
      },
    }
  })
})