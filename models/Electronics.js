const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: 10
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: 2
    },
    damages: {
        type: String,
        required: [true, 'Damages are required!'],
        minLength: 10
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: /^https?:\/\// || /^http?:\/\// 
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        mixLength:10,
        maxLength: 200
    },
    production: {
        type: Number,
        required: [true, 'Production is required!'],
        min: 1900,
        max: 2023
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required!'],
        min: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: 0
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;