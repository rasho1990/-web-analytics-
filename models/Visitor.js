const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const visitorSchema = new Schema({
  session: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: false, unique: false },
  password: { type: String, required: false, minlength: 5 },
  url: { type: String, required: true },
  browser: { type: String, required: true },
  resolution: { type: Object, required: true }
});


module.exports = mongoose.model('Visitor', visitorSchema);

