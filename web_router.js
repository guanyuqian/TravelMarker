/**
 * Created by the_s on 2017/8/5.
 */
var indexCtrl = require('./controllers/indexCtrl');
var mapCtrl = require('./controllers/mapCtrl');
var addMapCtrl = require('./controllers/addMapCtrl');
var addTravelsCtrl = require('./controllers/addTravelsCtrl');
var articleCtrl = require('./controllers/articleCtrl');
exports.setRouter = function (app) {
    //render
    app.get('/map', mapCtrl.viewMap);
    app.get('/book', indexCtrl.index);
    //app.get('/viewMap', addMapCtrl.viewMap);
    app.get('/addTravels',addTravelsCtrl.renderToView);

    //action
    app.get('/map/getArticle',articleCtrl.getAllArticle);
    app.post('/addTravels/addAttractions',addTravelsCtrl.addAttractions);
};