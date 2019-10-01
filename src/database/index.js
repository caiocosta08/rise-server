const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const url = process.env.MONGO_URL;
try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.Promise = global.Promise;
  console.log('Connected!');
} catch (error) {
  console.log('Error: ' + error);
}

module.exports = mongoose;