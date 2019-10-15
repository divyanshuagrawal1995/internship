const express=require('express');
const router=express.Router()
const Artist=require('../models/Artist');
const isAuth=require('../middlewares/isAuth');
const Song=require('../models/Song');


router.get("/getsong/",(req,res)=>{
    Song.find().populate("artist",["firstName","lastName","isFamous"])
    .then(song=>{
        if(!song)
        {
          return res.status(404).json({errors:"Song not found"})

        }
        else{
            
            song.map(item=>{
                if(item.artist.isFamous)
                {
                    return res.json(item)

                }
            })

        }
    
    })

    .catch(err=>{
        console.log(err)
    })

})


router.post("/addsong",isAuth(),(req,res)=>{    
          
    Song.findOne({title:req.body.title})
    .then(song=>{
        if(song)
        {
            return res.status(400).json({errors:" song already exist"})
        }
        else{
            const newSong=new Song({
                title:req.body.title,
                albumName:req.body.albumName,
                genre:req.body.genre,
                releaseYear:req.body.releaseYear,
                artist:req.artistId,
                 })
            newSong.save()
            .then(song=>{

                return res.status(200).json(song)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
        
   
    
})


router.get('/getsongbydate/',(req,res)=>{
    Song.find()
    .then(song=>{

        const sortedsong=song.sort((a,b)=>{
            const newDateA=new Date(a.releaseYear)
            const newDateB=new Date(b.releaseYear)
            return newDateA-newDateB
        })
        const reversedsong=sortedsong.reverse()
        res.json(reversedsong)
    })
})


router.post('/addcomment/:id',isAuth(),(req,res)=>{
    const songFields={}

    if(req.body.comment) songFields.comment=req.body.comment;
    if(req.userId) songFields.user=req.userId

    User.findOne({_id:req.userId})
    .then(user=>{
        if(!user)
        {
            return res.status(400).json({errors:"No user exist"})
        }
        else{

            Song.findOne({user:req.userId})
            .then(song=>{
                if(song)
                {
                    Song.findOneAndUpdate(
                      {_id:req.params.id},
                      {$set:songFields},
                      {new:true}
                    )
        
                    .then(result=>res.json(result));
        
        
                }
                else{
                    
                    Song.findOneAndUpdate(
                        {_id:req.params.id},
                        {$set:songFields},
                        {new:true}
                    )
                }
                
                
            })
            .catch(err=>{
                console.log(err)
            })

        }
    })
   
})

module.exports=router