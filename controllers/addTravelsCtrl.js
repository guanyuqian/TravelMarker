/*
 * GET users listing.
 */
exports.renderToView = function (req, res) {
    res.render('addTravels', {title: 'AddTravels'});
};

exports.addAttractions = function (req, res) {
    var monk = require('monk');
    //连接并打开数据库
    var db = monk('localhost:27017/TravelMark');
    var newAttractions = {
        name: req.body.name,
        date: req.body.date,
        pointX: req.body.pointX,
        pointY: req.body.pointY
    }

    var attractionsDB = db.get('Attractions');


    // Submit to the DB
    collection.insert(newAttractions
        , function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });
};
