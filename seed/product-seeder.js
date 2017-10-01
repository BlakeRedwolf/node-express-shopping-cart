var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/node-express-shopping-cart');

var products = [
  new Product({
    imagePath: 'https://i2.wp.com/pokemongoden.com/wp-content/uploads/2016/07/Pokemon-Special-Move-DPS-Mewtwo.png?resize=250%2C250',
    title: 'Product 1',
    description: 'Shopping cart product',
    price: 24
  }),
  new Product({
    imagePath: 'https://pbs.twimg.com/profile_images/639280074114510848/UVeQR9D-.png',
    title: 'Product 2',
    description: 'Shopping cart product',
    price: 24
  }),
  new Product({
    imagePath: 'https://vignette.wikia.nocookie.net/project-pokemon/images/3/3e/250px-034Nidoking.png/revision/latest?cb=20170513051346',
    title: 'Product 3',
    description: 'Shopping cart product',
    price: 24
  }),
  new Product({
    imagePath: 'https://vignette3.wikia.nocookie.net/pokemon-planet/images/a/a3/Pokemon_Lapras.png/revision/latest?cb=20150920122707',
    title: 'Product 4',
    description: 'Shopping cart product',
    price: 24
  }),
  new Product({
    imagePath: 'https://vignette.wikia.nocookie.net/project-pokemon/images/5/56/Starmie.png/revision/latest?cb=20170202055618',
    title: 'Product 5',
    description: 'Shopping cart product',
    price: 24
  }),
  new Product({
    imagePath: 'https://happykatana.files.wordpress.com/2015/08/250px-009blastoise.png',
    title: 'Product 6',
    description: 'Shopping cart product',
    price: 24
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}