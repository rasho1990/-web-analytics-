const { validationResult } = require('express-validator');
const HttpError = require('./../models/http-error');
const atob = require('atob');
const Visitor = require('./../models/Visitor');
const Event = require('../models/Event');
const path = require('path');

const createSnippt = async (req, res, next) => {
    // After that also insert a tracking entry with: date/time, current url
    console.log('got a request from /image');
    console.log(req.sessionID)
    let decodedStringAtoB = atob(req.query.data);
    let jsonData = JSON.parse(decodedStringAtoB);
    console.log(decodedStringAtoB);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Make sure to pass in the correct data!', 422);
        return next(error);
    }
    try {
        const visitor = await Visitor.findOne({ session: req.sessionID });
        if (!visitor) {
            // There is no visitor yet, let's create one
            visitor = await Visitor.create({
                session: req.sessionID
            });
        }

        const event = await Event.create({
            visitorId: visitor.id,
            name: jsonData.event
        });
    } catch (err) {
        console.log(err)
        const error = new HttpError(
            'Something went wrong, could not create user!',
            500
        );
        return next(error);
    }

    res.sendFile(path.resolve('Public/image.jpg'));
}
const getNumOfVisits = async (req, res, next) => {
    console.log('got a request from the frontend')
    let allVisitors;
    try {
        allVisitors = await Event.find({})
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find comments.", 500);
        return next(error);
    }
    if (!allVisitors) {
        const error = new HttpError("Could not find comments for the provided place.", 404);
        return next(error);
    }
    res.json({ allVisitors })

}


exports.createSnippt = createSnippt;
exports.getNumOfVisits = getNumOfVisits;
