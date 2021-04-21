const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const visitorSchema = new Schema({
  session: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  url: { type: String, required: true },
  browser: { type: String, required: true },
  resolution: [{ type: Object, required: true }]
  //newsfeed: [{ type: Object, required: true }]
});


module.exports = mongoose.model('Visitor', visitorSchema);

