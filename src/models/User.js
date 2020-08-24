import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: ''},
  date: { type: String, default: Date.now },
});

UserSchema
    .virtual('pwd')
    // set methods
    .set(function (pwd) {
        this._pwd = pwd;
    });

UserSchema.pre("save", async function(next) {
  // store reference
  const user = this;
  if (user._pwd === undefined) {
      return next();
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user._pwd, salt);
  next();
});


export default mongoose.model('user', UserSchema);
