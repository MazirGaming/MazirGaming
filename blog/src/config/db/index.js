const mongoose = require('mongoose')
async function connnect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mazir_shop_dev');
        console.log('Connect successfully') 
    }
    catch (error) {
    console.log('Connect fail') 
        
    }
}
module.exports = {connnect};