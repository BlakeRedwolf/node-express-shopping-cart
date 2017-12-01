module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  // Add function to add items to cart
  this.add = function(item, id) {
      var storedItem = this.items[id]; // 
      if (!storedItem) { // if stored item ! exist, create new entry
        storedItem = this.items[id] = { item: item, qty: 0, price: 0 }; // set qty and price so i can increment them // give product an [id] & assign it to storedItem
      }
      storedItem.qty++; // increment qty
      storedItem.price = storedItem.item.price * storedItem.qty; // adjust price to be = to items price then * qty
      this.totalQty++; // increment total qty
      this.totalPrice += storedItem.item.price; // increment total price with item price
    }
    // Generate array function to display a product list
  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};