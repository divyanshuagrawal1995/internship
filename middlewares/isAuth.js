const jwt=require('jsonwebtoken');
const {secretKey}=require('../secretKey')


module.exports=function isAuth(){


   return (req,res,next)=>{
       
    
    const authHeader=req.headers.authorization

    if(!authHeader)
    {
        res.json({error:"No authheader"})
        return next()
    }

    const token=authHeader.split(" ")[1]

    if(!token || token==="")
    {
         res.json({error:"No token provided"})
         return next()
    }

    let decodedToken;
    try{
      decodedToken=jwt.verify(token,secretKey)
    }
    catch(err)
    {
        res.json(err)
    }
    if(!decodedToken)
    {
         res.json({error:"auth error"})
         next()
    }
    req.userId=decodedToken.userId,
    req.userFirstName=decodedToken.userFirstName,
    req.artistId=decodedToken.artistId,
    req.artistFirstName=decodedToken.artistFirstName,
    req.artistIsFamous=decodedToken.artistIsFamous;
    next()
}

   }

    
