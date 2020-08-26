import { User } from '../models';
import { signJWTToken } from '../services/commonService';
import { handleErrorResponse } from '../services/commonService';

export const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials!' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials!' });
    }

    signJWTToken(user)
      .then((token) => res.json({ token }))
      .catch((err) => handleErrorResponse(res, err));
  } catch (err) {
    handleErrorResponse(res, err);
  }
};
