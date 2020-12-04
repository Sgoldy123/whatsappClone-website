//impoting
import e from 'express';
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import Messages from './dbModel.js'
import cors from 'cors'


//app config
const app=express();
const PORT=process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1117986",
    key: "1457f33f02b95917df41",
    secret: "dfb0435886f3da5947f1",
    cluster: "eu",
    useTLS: true
  });

//middleware
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    next();

})


//DB config
const MONGO_URL=`mongodb+srv://admin:12345qwerty@cluster0.4xlyk.mongodb.net/whatsappdb?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log('database is runnning'))
.catch(err=>console.log(err));
;


const db=mongoose.connection
db.once('open',()=>{
    console.log("Db is Connneted")

    const msgCollection=db.collection('users');
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change)=>{
        console.log(change)

        if(change.operationType === 'insert') {
            const messageDetail = change.fullDocument;
            pusher.trigger(
              'messages',
              'inserted', 
              {
                 name:messageDetail.name,
                 message:messageDetail.message,
                 timeStamp:messageDetail.timeStamp,
                 recieved:messageDetail.recieved
              }
            ); 
          } else {
              console.log("error in pushing")
          }


    })

})  



//routes

app.get('/message/sync',async(req,res)=>{

    try {
        
    const data =await Messages.find({});
    res.status(200).send(data)

    } catch (error) {
        res.status(401).json({message:error})   
    }

    
})


app.post('/message/new',async(req,res)=>{
    
    const message=req.body;
    const newMessage=new Messages(message);
    try {
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(401).json({message:error})   
    }
})


//listning
app.listen(PORT,()=>console.log(`port is running ${PORT}`))
