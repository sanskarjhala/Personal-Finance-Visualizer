const mongoose = require('mongoose')

const transactionsSchema = new mongoose.Schema({
    amount : {
        type: Number,
        required: true
    },
    description : String,
    date:{
        type:Date,
        required:true
    },
    category:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Transaction" , transactionsSchema)