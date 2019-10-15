const express=require('express');
const app=express()
const mongoose=require('mongoose');
const isAuth=require('./middlewares/isAuth')
const db="mongodb+srv://internship:internship@cluster0-j7uuv.mongodb.net/test"


app.use(express.json())
mongoose.connect(db,{
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(()=>{
    console.log(`mongodb is connected`)
})
.catch(err=>{
    console.log(err);
    
})
app.use('/api/user',require('./routes/user'))
app.use('/api/artist',require('./routes/artist'));
app.use('/api/song',require('./routes/song'))

const port=process.env.port || 8000
app.listen(port,()=>{
    console.log(`port is connected on ${port}`)
})