const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const visitorSchema = new Schema({
  session: { type: String, required: false },
  url: { type: String, required: false },
  browser: { type: String, required: false },
  resolution: { type: Object, required: false }
});
module.exports = mongoose.model('Visitor', visitorSchema);

