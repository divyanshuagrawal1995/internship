const mongoose=require('mongoose');
const Schema=mongoose.Schema
const SongSchema=new Schema({

title:{
    type:String,
    
},
artist:{
    type:Schema.Types.ObjectId,
    ref:'artist'
},
albumName:{
    type:String,
    
},
genre:{
    type:String,
    
},
comment:{
    type:String,
},

releaseYear:{
    type:String,
    

},
user:{
    type:Schema.Types.ObjectId,
    ref:'user'
}


})
module.exports=Song=new mongoose.model('song',SongSchema)
