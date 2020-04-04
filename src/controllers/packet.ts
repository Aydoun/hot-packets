import { RequestHandler } from "express";
import handleErrorMiddleware from "../middleware/handle-error-middleware";
import Packet from "../models/Packets";

export const getAll: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const packets = await Packet.find();
    res.send({ packets });
  }
);
