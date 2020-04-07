import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, expires: boolean = false) =>
  jwt.sign(
    {
      id: userId,
      expires,
    },
    process.env.TOKEN_SECRET,
  );
