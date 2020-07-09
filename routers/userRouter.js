const router=require('express').Router();
const User=require('../model/User');


router.post('/register',(req,res)=>{

    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;

    let balance=0;//mber,
    let income=0;//:Number,
    let expense=0;//expenxe: Number,

    User.findOne({email})
        .then(user=>{
            if(user){
                return res.json({
                    message:"email exists"
                })
            }
        })

    let user=new User({name,email,password,balance,income,expense});
    user.save()
        .then(user=>{
            res.status(201).json({
                message: "user created successfully",
                user
            })
        })

})

router.post('/login',(req,res)=>{

    let email=req.body.email;
    let password=req.body.password;

    User.findOne({email,password})
        .then(user=>{
            if(!user){
                /* return res.json({
                    message:"user not found"
                }) */

                return res.status(500).json({
                    message:"error: user not found"
                })

            }
            return res.json({
                message:"now you can login",
                user
            });

        })
        .catch(error=>{
            return res.status(500).json({
                message:"error"
            })

        }
        )  

})

router.get('/allUsers',(req,res)=>{

    

    User.find()
        .then(user=>{
            
             res.json(user)
            }
        )

})




module.exports= router;

