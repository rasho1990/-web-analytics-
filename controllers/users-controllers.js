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
        // Check if visitor already exists and update it if not it will create a new document
        const userExists = await Visitor.findOneAndUpdate({
            session: req.sessionID
        }, {
            session: req.sessionID,
            name: jsonData.email,
            email: jsonData.email,
            password: jsonData.password,
            url: jsonData.url,
            browser: jsonData.browser,
            resolution: jsonData.resolution
        }
            , {
                useFindAndModify: false,
                new: true,
                upsert: true,
                rawResult: true
            });
        const eventExists = await Event.findOneAndUpdate({
            creator: userExists.value.id
        }, {
            name: jsonData.event,
            data: { amount: jsonData.amount },
            creator: userExists.value.id
        }
            , {
                useFindAndModify: false,
                new: true,
                upsert: true,
                rawResult: true
            });
        await Visitor.findOneAndUpdate({
            session: req.sessionID
        }, {
            events: eventExists.value.id
        }
            , {
                useFindAndModify: false,
                new: true,
                upsert: true,
                rawResult: true
            });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not create user!',
            500
        );
        return next(error);
    }

    res.sendFile(path.resolve('Public/image.jpg'));
}
const getNumOfVisits = async (req, res, next) => {
    req.session.viewCount += 1;

    res.send({ viewCount: req.session.viewCount, id: req.sessionID })
    req.session.save(function (err) {
        if (!err) {
            //Data get lost here
            res.redirect("http://localhost:5000/api");
        }
    });

}


exports.createSnippt = createSnippt;
exports.getNumOfVisits = getNumOfVisits;
