import express from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { unicode } from '@fortawesome/free-solid-svg-icons/fa0';
const app = express();
const port = 5000;
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/foodcom';
//connect mongodb
const mongodb= async ()=>{
    await mongoose.connect(dbURI)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('Failed to connect to MongoDB', err));
}
mongodb();
//add schemas
const UserSchema = new mongoose.Schema({
    name: String,
    city: String,
    phone: Number,
    email:String,
    password:String,
    mycart:{type:Array,default:[]}
});
const pizzaSchema = new mongoose.Schema({
  img: String,
  name: String,
  price: Number,
  count:Number,
  id:Number
});
const chineseSchema = new mongoose.Schema({
  img: String,
  name: String,
  price: Number,
  count:Number,
  id:Number
});


const User = mongoose.model('Useree', UserSchema);
const p=mongoose.model('pizza',pizzaSchema);
const c=mongoose.model('chinese',chineseSchema);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getpizza',async (req, res) => {
  //  const pizzas=await p.find();
   let piz=await p.find(); 
   
   res.json(piz)
   
});
app.get('/getchinese',async(req,res)=>{
   let chi=await c.find();
   res.json(chi);
})

app.post('/mycart',async(req,res)=>{
  const {userId,product}=req.body;
  
  const updateduser=await User.findByIdAndUpdate(userId,
    {$push:{mycart:product}},
    {new:true}
   )
   
   res.send(updateduser)
})

app.post('/deletcart',async(req,res)=>{
  const {userId,id}=req.body;
  const updateduser=await User.findByIdAndUpdate(userId,
    {$pull:{mycart:{id:id}}},
    {new:true}
  )
  res.send(updateduser)
})

app.post('/signup', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.post('/login',async (req,res)=>{
    
    let e=req.body.email
    // console.log(e);
    
    let u=await User.findOne({email:e})
    
    if(u){
      if(u.password===req.body.password){
        res.status(201).json({x:true,usser:u})
        
      }else{
        res.status(401).send({x:false})
      }
    }else{
      res.status(401).send({x:false})
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});