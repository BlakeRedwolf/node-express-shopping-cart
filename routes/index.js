var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Node & Express Shopping Cart', products: productChunks });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} }); // create new cart and check if old cart exist else pass an empty cart object
  // Use mongoose to find product by id. Getting id from .get parameter /add-to-car/:id above
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id); // If !err call the add method on the cart object & pass product & product id
    req.session.cart = cart; // express session will automatically save after every response
    console.log(req.session.cart);
    res.redirect('/');
  });
});

module.exports = router;

// LF@#10 Route Grouping & Protection (Middleware) 0.05