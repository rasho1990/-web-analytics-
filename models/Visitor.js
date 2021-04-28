const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const visitorSchema = new Schema({
  session: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: false, unique: false },
  password: { type: String, required: false, minlength: 5 },
  url: { type: String, required: false },
  browser: { type: String, required: false },
  resolution: { type: Object, required: false },
  events: [
    {
      type: mongoose.Types.ObjectId, // Id of related model
      required: true,

      ref: 'Event',
    }]
});


module.exports = mongoose.model('Visitor', visitorSchema);

