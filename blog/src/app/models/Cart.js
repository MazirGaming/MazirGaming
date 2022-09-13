
module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  
  this.add = (item, id) => {
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storeItem.qty++
    storeItem.price = storeItem.item.price * storeItem.qty;
    this.totalQty++
   
    this.totalPrice += parseInt(storeItem.item.price);
    
    
  // this.items = oldCart.items || {};
  // this.totalQty = oldCart.totalQty || 0;
  // this.totalPrice = oldCart.totalPrice || 0;
  // this.numItems = oldCart.numItems || 0;

  // this.add = (item, id, qty) => {
  //   var storeItem = this.items[id];
  //   const itemQty = qty ? Number(qty) : 1;
  //   if (!storeItem) {
  //     storeItem = this.items[id] = { item: item, qty: 0, price: 0 };
  //     this.numItems++;
  //   }
  //   storeItem.qty += itemQty;
  //   storeItem.price = storeItem.item.price * storeItem.qty;
  //   this.totalQty += itemQty;
  //   this.totalPrice += storeItem.item.price;
  };
  this.reduceByOne = function(id) {
    
    this.items[id].qty--
    this.items[id].price -= this.items[id].item.price
    this.totalQty--
    this.totalPrice -= this.items[id].item.price
    if(this.items[id].qty <= 0) {
      delete this.items[id]
    }
  };

  this.remove = id => {
    var storeItem = this.items[id];
    this.totalQty -= storeItem.qty;
    this.totalPrice -= storeItem.price;
    this.numItems--;
    delete this.items[id];
  };
  this.generateArray = function () {
    var arr = []
    for (var id in this.items) {
      arr.push(this.items[id])
    }
    return arr;
  }
}



