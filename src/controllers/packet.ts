import { RequestHandler } from 'express';
import handleErrorMiddleware from '../middleware/handle-error-middleware';
import PacketModel from '../models/Packets.model';
import UserModel from '../models/Users.model';

export const getAll: RequestHandler = handleErrorMiddleware(async (_, res) => {
  const packets = await PacketModel.find({ status: 1 });
  res.send({ packets });
});

export const getOne: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const { id } = req.params;
    const packet = await PacketModel.findById(id);
    res.send({ packet });
  },
);

export const registerPacket: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const {
      decoded: { id },
    } = res.locals;
    const { title } = req.body;

    const newPacket = new PacketModel({ title, creator: id });
    const result = await newPacket.save();
    await UserModel.findByIdAndUpdate(id, { $push: { packets: result._id } });

    res.send({ result });
  },
);

export const updatePacket: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const { id } = req.params;

    const result = await PacketModel.findByIdAndUpdate(id, req.body);
    res.send({ result });
  },
);
