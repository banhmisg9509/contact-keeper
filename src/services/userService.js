import { User } from '../models';
import { signJWTToken, handleErrorResponse } from '../services/commonService';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ name, email, pwd: password });

      await user.save();

      signJWTToken(user)
        .then((token) => res.json({ token }))
        .catch((err) => handleErrorResponse(res, err));
    } catch (err) {
      handleErrorResponse(res, err);
    }
}