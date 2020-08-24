import mongoose from 'mongoose';
import { MONGO_URI } from './default';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to db :)');
    })
    .catch((err) => {
      console.log('Connected to db :( ', err.message);
      process.exit(1);
    });
};
