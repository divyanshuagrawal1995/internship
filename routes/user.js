const express=require('express')
const router=express.Router()
const User=require('../models/User');
const {secretKey}=require("../secretKey")
const jwt=require('jsonwebtoken');


router.post('/adduser',(req,res)=>{
    User.findOne({firstName:req.body.firstName})
    .then(user=>{
        if(user)
        {
            return res.status(400).send({errors:"User already exist"})
        }
        else{
            const newUser=new User({
                firstName:req.body.firstName,
                lastName:req.body.lastName
            })
            newUser.save()
            .then(result=>{
                const payload={userId:result._id,userFirstName:result.firstName}
                jwt.sign(payload,
                    secretKey,
                    {expiresIn:36000},
                    (err,token)=>{
                        res.status(200).json({

                            user:result,
                            success:true,
                            token:"Bearer "+token
                        })

                    }
                    )
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getuser',(req,res)=>{
    User.find()
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=router