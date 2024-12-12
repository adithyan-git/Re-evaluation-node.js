const mongoose = require('mongoose');

const product = new mongoose.Schema({
    productname:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    quantity:{
        type:String,
        require:true
    }
})

const products = mongoose.model('product',product) ;
module.exports = products;