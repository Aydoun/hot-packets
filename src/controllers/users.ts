import { RequestHandler } from 'express';
import { compare, hash } from 'bcrypt';
import handleErrorMiddleware from '../middleware/handle-error-middleware';
import UserModel from '../models/Users.model';
import PacketsModel from '../models/Packets.model';

export const getOneUser: RequestHandler = handleErrorMiddleware(
  async (_, res) => {
    const {
      decoded: { id },
    } = res.locals;
    const user = await UserModel.findById(id, '-password -packets -privacy');

    res.send({ result: user });
  },
);

export const getUserPackets: RequestHandler = handleErrorMiddleware(
  async (_, res) => {
    const {
      decoded: { id },
    } = res.locals;
    const { packets } = await UserModel.findById(id);
    const packetsList = await PacketsModel.find(
      {
        _id: { $in: packets },
        creator: id,
      },
      '-comments -creator',
    );

    res.send({ result: packetsList });
  },
);

export const updateAvatar: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const {
      decoded: { id },
    } = res.locals;
    const { HOST, PORT } = process.env;
    const { path } = req.file;
    const url = `${HOST}:${PORT}/${path}`;

    await UserModel.findByIdAndUpdate(id, { avatar: url });

    res.send({ result: url });
  },
);

export const updateUser: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const {
      decoded: { id },
    } = res.locals;

    await UserModel.findByIdAndUpdate(id, req.body);

    res.send({ result: req.body });
  },
);

export const updateUserPassword: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const {
      decoded: { id },
    } = res.locals;
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findOne({ _id: id, status: { $gt: 1 } });
    if (!user) new Error('User Not Found');

    const isMatch = await compare(oldPassword, user.password);
    if (!isMatch) throw new Error('Wrong Password');

    const hashedPassword = await hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    res.send({ result: 'ok' });
  },
);
