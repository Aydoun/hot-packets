import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) =>
  jwt.sign(
    {
      id: userId,
    },
    process.env.TOKEN_SECRET,
  );
