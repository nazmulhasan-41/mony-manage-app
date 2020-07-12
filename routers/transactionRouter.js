const router = require('express').Router();
const User = require('../model/User');
const Transaction = require('../model/Transaction');

router.post('/createTransaction', async (req, res) => {

    let { amount, note, type, email, password } = req.body;
    amount = parseInt(req.body.amount);
    var newUserId = "";
    let reqUser = new User;
    await User.findOne({ email, password })
        .then(user => {

            newUserId = user._id;
            reqUser = user;
        })
    let userId = newUserId;

    let transaction = new Transaction({
        amount, note, type, author: userId
    })

    transaction.save()
        .then(trans => {
            let updateUser = { ...reqUser }

            if (type === 'income') {

                updateUser._doc.balance += amount;
                updateUser._doc.income += amount;

            } else if (type === "expense") {
                updateUser._doc.balance -= amount;
                updateUser._doc.expense += amount;
            }
            updateUser._doc.transactions.unshift(trans._doc._id);

            User.findByIdAndUpdate(updateUser._doc._id, updateUser._doc
                , function (err, post) {
                    if (err) return next(err);
                });

            var returnedUser=updateUser._doc;
            res.status(201).json({
                message: "transaction successful",
                ...trans._doc,
                returnedUser
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: "error"
            })
        })
})
router.post('/deleteTransaction/', async (req, res) => {

    let x = req.body._id;
    let email=req.body.email;

    await User.find({email: email})
        .then((trans)=>{
            
            let ret=trans[0].transactions;  
            ret.pull(req.body._id);
            //ret=ret.pull(req.body._id);
            /* res.status(201).json({
                ret
            }) */
        })

       await Transaction.findByIdAndDelete(x)
        .then(() => {

            res.status(201).json({
                message: "transaction deletion successful",
                x
            })
        }) 
        .catch(error => {
            console.log("******error****");
        })
})

router.post('/deleteAllTransaction', async (req, res) => {
    await Transaction.deleteMany({})
        .then(() => {
            res.status(201).json({
                message: "transaction deletion successful"
            })
        })
        .catch(error => {
            console.log("******error****");
        })
})

router.get('/getAllTrans/:user', async(req, res) => {

    var obj = JSON.parse(req.params.user);
    let author = obj._id;
    let email=obj.email;let password=obj.password;
    let reqUser = new User;
    await User.findOne({ email, password })
        .then(user => {
            reqUser = user;
        })

    Transaction.find({ author })
        .then(transactions => {
            if (transactions.length === 0) {
                res.status(200).json({
                    message: "no transaction is added ......"
                })
            }
            else {
                res.status(200).json({
                    reqUser,
                    transactions
                })
            }
        })
        .catch(error => {
            console.log("error found in transactioning ");
        })
})

router.get('/allTrans', (req, res) => {

    console.log("+++++++++++");

    Transaction.find()
        .then(transactions => {
            if (transactions.length === 0) {
                res.status(200).json({
                    message: "no transaction is added ......"
                })
            }
            else {
                res.status(200).json(transactions)
            }
        })
        .catch(error => {
            console.log("error found in transactioning ");
        })

})
router.get('/allUsers', (req, res) => {

    User.find()
        .then(user => {

            res.json(user)
        }
        )
})
router.post('/moneySending', async (req, res) => {

    let { balance, rec_email, send_email } = req.body;
    var newUserId = "";
    let reqUser = new User;
    //------------start sender info
    await User.findOne({ email: send_email })
        .then(user => {

            newUserId = user._id;
            reqUser = user;
        })

    let userId = newUserId;
    amount = parseInt(req.body.balance);

    let transaction = new Transaction({
        amount, note: "dont know", type: "sent", author: userId,
         to:rec_email
    })

    // --------end sender info 
    // start receiver

    var newUserId2 = "";
    let reqUser2 = new User;
    await User.findOne({ email: rec_email })
        .then(user => {

            newUserId2 = user._id;
            reqUser2 = user;
        }
        )

    let userId2 = newUserId2;

    let transaction2 = new Transaction({
        amount, note: "dont know", type: "receive", author: userId2,
        from:send_email 
    })

    transaction2.save()
        .then(trans2 => {

            let updateUser2 = { ...reqUser2 }
            updateUser2._doc.balance += amount;
            updateUser2._doc.transactions.unshift(trans2._doc._id);
            //console.log("===========================",updateUser._doc); 

            User.findByIdAndUpdate(updateUser2._doc._id, updateUser2._doc
                , function (err, post) {
                    if (err) return next(err);
                });

//saving sender data

            transaction.save()
                .then(trans => {

                    let updateUser = { ...reqUser }
                    updateUser._doc.balance -= amount;
                    updateUser._doc.expense += amount;

                    updateUser._doc.transactions.unshift(trans._doc._id);
                 
                    User.findByIdAndUpdate(updateUser._doc._id, updateUser._doc
                        , function (err, post) {
                            if (err) return next(err);
                        }); 
                    var returnedUser=updateUser._doc;

                    res.status(201).json({
                        message: "transaction successful",
                        ...trans._doc,returnedUser                        
                    })
                })
                .catch(error => {
                    return res.status(500).json({
                        message: "error"
                    })
                })

                //end saving ender data

        })
        .catch(error => {
            return res.status(500).json({
                message: "error2"
            })
        })


    ///end receiver


})

module.exports = router;
