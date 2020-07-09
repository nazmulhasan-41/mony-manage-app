const express= require('express');
const morgan = require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path= require('path');
//const userRouter=require('./routers/userRouter');


const app =express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());



app.use('/api/users',require('./routers/userRouter'));
app.use('/api/transaction', require('./routers/transactionRouter'));

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.get('/',(req,res)=>{
    res.json({
        message:"Welcome jewel"
    })
})


mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0-wkjzn.mongodb.net/test?retryWrites=true&w=majority`
,{useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
console.log("Hello******* we are connected")

});


const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`server started at port # ${PORT}`);
})