var _ = require('underscore');
var express = require('express');
var router = express.Router();
var Autocomplete = require('autocomplete');
var autocomplete = Autocomplete.connectAutocomplete();
var productNames = [];
var products = require('../data/products.json');
_.each(products, function (product) {
    if( product.name!=undefined || product.name!=null )
        productNames.push(product.name.toLowerCase());
})
autocomplete.initialize(function(onReady) {
    onReady(productNames);
});
/* GET categories listing. */
router.get('/autocomplete/', function(req, res, next){
    var product = req.query["term"].toLowerCase();
    var results = autocomplete.search(product);
    var productResults = _.map(results, function(result){
        var found =  _.find(products,function(product){
            if( product.name!=undefined || product.name!=null )
                return product.name.toLowerCase() === result;
            else
                return false
        });
        return {label:found.name, value:found.sku};
    })
    res.send(productResults);
});
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(products));
});

module.exports = router;
