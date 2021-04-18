const { validationResult } = require('express-validator');
const HttpError = require('./../models/http-error');


const createSnippt = async (req, res, next) => {
    // Find Visitor based on domain and req.session.id
    // If exists, upadte data of visitor
    // If doesn't exists: create new visitor document with trakcing data (browser, resolution, ...)
    // After that also insert a tracking entry with: date/time, current url
    //console.log(req.get('Referer'));

    console.log(req.headers);
    console.log(req.sessionID)

    res.sendFile('image.jpg', { root: './public' });
}
const getNumOfVisits = async (req, res, next) => {
    req.session.viewCount += 1;
    res.send({ viewCount: req.session.viewCount, id: req.sessionID })
}


exports.createSnippt = createSnippt;
exports.getNumOfVisits = getNumOfVisits;
