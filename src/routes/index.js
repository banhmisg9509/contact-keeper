import express from 'express';
const router = express.Router();

import users from './users';
import auth from './auth';
import contacts from './contacts';

const initRoute = (app) => {
  users(router);
  auth(router);
  contacts(router);

  app.use('/api', router);
};

export default initRoute;
