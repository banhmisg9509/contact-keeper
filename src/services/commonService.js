import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/default';

export const handleErrorResponse = (
  res,
  err,
  status = 500,
  message = 'Server Error'
) => {
  console.log(err);
  res.status(status).send(message);
};

// custom payload by callback if needed
export const signJWTToken = (user, callback) => {
  return new Promise((resolve, reject) => {
    let payload;
    if (callback) {
      payload = callback(user);
    } else {
      payload = {
        user: {
          id: user.id,
        },
      };
    }

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};
