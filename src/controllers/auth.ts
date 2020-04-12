import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import handleErrorMiddleware from '../middleware/handle-error-middleware';
import UserModel from '../models/Users.model';
import { generateToken } from '../utils';

export const Register: RequestHandler = handleErrorMiddleware(
  async (req, res) => {
    const { name, email, password } = req.body;

    if (name && email && password) {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        email,
        password: hash,
      });

      const user = await newUser.save();
      res.send({
        token: generateToken(user._id),
      });
    } else {
      // TODO: Manage params validation elsewhere
      throw new Error('Not Enough Params');
    }
  },
);

export const Login: RequestHandler = handleErrorMiddleware(async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await UserModel.findOne({ email, status: { $gt: 1 } });
    const isPasswordMatch = bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw new Error('Authentication failed');
    else {
      res.send({
        token: generateToken(user._id),
      });
    }
  } else {
    // TODO: Manage params validation elsewhere
    throw new Error('Not Enough Params');
  }
});

export const verifyToken: RequestHandler = handleErrorMiddleware(
  async (_, res) => {
    res.send({});
  },
);
