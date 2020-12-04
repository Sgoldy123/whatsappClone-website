import mongoose from 'mongoose'

const newSchema=new mongoose.Schema({
    message:String,
    name:String,
    timeStamp:String,
    recieved:Boolean,

})

const user=mongoose.model('user',newSchema);

export default user;