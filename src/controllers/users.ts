import { RequestHandler } from 'express';
import omit from 'object.omit';
import handleErrorMiddleware from '../middleware/handle-error-middleware';
import UserModel from '../models/Users';

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
