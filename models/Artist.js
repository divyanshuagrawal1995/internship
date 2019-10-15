const mongoose=require('mongoose');
const Schema= mongoose.Schema
const ArtistSchema=new Schema({

firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
    required:true
},
isFamous:{
    type:Boolean,
    default:true
},


})

module.exports=Artist=mongoose.model('artist',ArtistSchema)