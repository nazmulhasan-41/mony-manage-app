const mongoose= require('mongoose')
const Schema=mongoose.Schema;

const TransactionSchema=new Schema({
    amount:{
        type:Number,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    note:{
        type:String
        
    }   ,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    from:{
        type:String
    },
    to:{
        type:String
    }


},{timestamps: true})

const Transaction=mongoose.model('Transaction',TransactionSchema);
module.exports=Transaction;