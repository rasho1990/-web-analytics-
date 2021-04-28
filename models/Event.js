const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: { type: String, required: false },
    data: { type: Object, required: false },
    creator: [
        {
            type: mongoose.Types.ObjectId, // Id of related model
            required: true,

            ref: 'Visitor',
        }]
});


module.exports = mongoose.model('Event', eventSchema);

