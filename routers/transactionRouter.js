const router=require('express').Router();
const User=require('../model/User');
const Transaction= require('../model/Transaction');

router.post('/createTransaction',async(req,res)=>{

    console.log('incomng------',typeof req.body,req.body);
    
    //console.log('typeof -------',typeof amount);

    let {amount,note,type,email,password}=req.body;
    amount =parseInt(req.body.amount);
    var newUserId="";

    let reqUser=new User;
    await User.findOne({email,password})
        .then(user=>{
            
                newUserId=user._id;
                reqUser=user; 
            }
        )

    let userId=newUserId;

    let transaction= new Transaction({
        amount,note,type,author:userId
    })

    
    transaction.save()
        .then(trans=>{
            let updateUser={...reqUser}

    
            if(type==='income'){
                
                updateUser._doc.balance+=amount;
                updateUser._doc.income+=amount;

            }else if(type==='expense'){
                updateUser._doc.balance-=amount;
                updateUser._doc.expense+=amount;

            }
           
            updateUser._doc.transactions.unshift(trans._doc._id); 

            User.findByIdAndUpdate(updateUser._doc._id,updateUser._doc
                , function (err, post) {
                    if (err) return next(err);
                   });
            
            res.status(201).json({
                message:"transaction successful",
                ...trans._doc
            })
        })
        .catch(error=>{
            return res.status(500).json({
                message:"error"
            })
        })
})





router.post('/deleteTransaction/',async(req,res)=>{
    
    let x=req.body._id;
    
    await Transaction.findByIdAndDelete(x)
        .then(()=>{
           
            res.status(201).json({
                message:"transaction deletion successful",
                x

        })
    })
        .catch(error=>{
            console.log("******error****");
        })
})

router.post('/deleteAllTransaction',async(req,res)=>{
    
    
    await Transaction.deleteMany({})
        .then(()=>{
            res.status(201).json({
                message:"transaction deletion successful"
        })
    })
        .catch(error=>{
            console.log("******error****");
        })
})

router.get('/getAllTrans/:user',(req,res)=>{

    var obj = JSON.parse(req.params.user);
   
    let author=obj._id;

    Transaction.find({author})
    .then(transactions =>{
        if(transactions.length===0)
        {
            res.status(200).json({
                message:"no transaction is added ......"
            })
        }
        else{
            res.status(200).json(transactions)
        }
    })
    .catch(error=>{
        console.log("error found in transactioning ");
    }) 

})

router.get('/allTrans',(req,res)=>{

    Transaction.find()
    .then(transactions =>{
        if(transactions.length===0)
        {
            res.status(200).json({
                message:"no transaction is added ......"
            })
        }
        else{
            res.status(200).json(transactions)
        }
    })
    .catch(error=>{
        console.log("error found in transactioning ");
    }) 

})

router.get('/allUsers',(req,res)=>{

    User.find()
        .then(user=>{
            
             res.json(user)
            }
        )
})


module.exports= router;
