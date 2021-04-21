const { validationResult } = require('express-validator');
const HttpError = require('./../models/http-error');
const atob = require('atob');
const Visitor = require('./../models/Visitor');


const createUser = async (req, res, next) => {

};
const createSnippt = async (req, res, next) => {
    // Find Visitor based on domain and req.session.id
    // If exists, upadte data of visitor
    // If doesn't exists: create new visitor document with trakcing data (browser, resolution, ...)
    // After that also insert a tracking entry with: date/time, current url
    //console.log(req.get('Referer'));

    console.log('got a request from /image');
    console.log(req.sessionID)
    var decodedStringAtoB = atob(req.query.data);
    console.log(decodedStringAtoB);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Make sure to pass in the correct data!', 422);
        return next(error);
    }


    // Create new user
    const newUser = new Visitor({
        session: req.sessionID,
        name: 'rasho',
        email: 'm.rasho90@gmail.com',
        password: '123456',
        url: '5000',
        browser: 'test',
        resolution: '0'
    });

    let token;
    try {
        // Save user
        await newUser.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            'Something went wrong, could not create user!',
            500
        );
        return next(error);
    }

    const modifiedUser = newUser.toObject({ getters: true });

    res
        .status(201)
        .json({ userId: modifiedUser.id, email: modifiedUser.email, token });
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
