import { RequestHandler } from "express";
import handleErrorMiddleware from "../middleware/handle-error-middleware";
import PacketModel from "../models/Packets";

export const getAll: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const packets = await PacketModel.find({ status: 1 });
    res.send({ packets });
  }
);

export const getOne: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const { id } = req.params;
    const packet = await PacketModel.findById(id);
    res.send({ packet });
  }
);

export const registerPacket: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const { title, creator } = req.body;

    const newPacket = new PacketModel({ title, creator });
    const result = await newPacket.save();
    res.send({ result });
  }
);

export const updatePacket: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const { id } = req.params;

    const result = await PacketModel.updateOne({ _id: id }, req.body);
    res.send({ result });
  }
);
