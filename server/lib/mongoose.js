import mongoose from 'mongoose';

import config from '../config';

export function init() {
  mongoose.connect(config.db, {
    useNewUrlParser: true
  })
}
