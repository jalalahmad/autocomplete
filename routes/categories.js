var _ = require('underscore');
var express = require('express');
var router = express.Router();
var Autocomplete = require('autocomplete');
var autocomplete = Autocomplete.connectAutocomplete();
var categoryNames = [];
var categories = require('../data/categories.json');
_.each(categories, function (category) {
    if( category.name!=undefined || category.name!=null )
    categoryNames.push(category.name.toLowerCase());
})
autocomplete.initialize(function(onReady) {
    onReady(categoryNames);
});
/* GET categories listing. */
router.get('/autocomplete/', function(req, res, next){
    var category = req.query["term"].toLowerCase();
    var results = autocomplete.search(category);
    var categoryResults = _.map(results, function(result){
        var found =  _.find(categories,function(category){
            if( category.name!=undefined || category.name!=null )
              return category.name.toLowerCase() === result;
            else
                return false
        });
        return {label:found.name, value:found.id};
    })
    res.send(categoryResults);
});
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(categories));
});

module.exports = router;
