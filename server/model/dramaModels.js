const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'kdramas',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const dramaSchema = new Schema({
  name: { type: String, required: true },
  overall_rating: { type: Number, min: 0, max: 5, required: true },
  thoughts: { type: String },
});

const Drama = mongoose.model('drama', dramaSchema);
module.exports = { Drama };
