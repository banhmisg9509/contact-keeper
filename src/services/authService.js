import { JWT_SECRET } from '../config/default';
import jwt from 'jsonwebtoken';

// custom payload by callback if needed
export const signJWTToken = (user, callback) => {
  return new Promise((resolve, reject) => {
    let payload;
    if(callback) {
      payload = callback(user)
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