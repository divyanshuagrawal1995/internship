const express=require('express')
const router=express.Router()
const {secretKey}=require('../secretKey')
const Artist=require('../models/Artist');
const jwt=require('jsonwebtoken')


router.post('/addartist',(req,res)=>{
    User.findOne({firstName:req.body.firstName})
    .then(user=>{
        if(user)
        {
            return res.status(400).send({errors:"Artist already exist"})
        }
        else{
            const newArtist=new Artist({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                isFamous:req.body.isFamous
            })
            newArtist.save()
            .then(result=>{

                const payload={
                    artistId:result._id,
                    artistFirstName:result.firstName,
                    artistIsFamous:req.body.isFamous
                }
                jwt.sign(payload,secretKey,{expiresIn:36000},(err,token)=>{
                    res.status(200).json({

                        artist:result,
                        success:true,
                        token:"Bearer "+token
                    })
                    
                })
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getartist',(req,res)=>{
    Artist.find()
    .then(artist=>{
        res.status(200).json(artist)
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=router