import { RequestHandler } from 'express';
import omit from 'object.omit';
import handleErrorMiddleware from '../middleware/handle-error-middleware';
import UserModel from '../models/Users.model';
import PacketsModel from '../models/Packets.model';

export const getOneUser: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const {
      decoded: { id },
    } = res.locals;
    const user = await UserModel.findById(id).lean();
    const filteredUser = omit(user, ['password', 'packets']);

    res.send({ result: filteredUser });
  },
);

export const getUserPackets: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const {
      decoded: { id },
    } = res.locals;
    // return UserModel.find({ _id: { $in: [mainUser, ...toArray] } })
    const packetsList = await PacketsModel.find({
      _id: { $in: [id] },
    });

    res.send({ result: [] });
  },
);
