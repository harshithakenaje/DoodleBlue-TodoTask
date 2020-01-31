import mongoose from 'mongoose';

import CONFIG from '../config';
import logger from '../logger';

const dbInstance = mongoose.connect(CONFIG.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => logger.log()('Successfully connected to DB server'))
  .catch(err => logger.error()(err));

export default dbInstance;
