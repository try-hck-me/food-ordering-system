import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import { countercontext } from '../context/context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
// import { response } from 'express';
const Food = () => {
  const navigate=useNavigate()
  const value=useContext(countercontext)
  // const [cart, setcart] = useState({name:"",piece:"",price:""})
  const [pizza, setpizza] = useState([])
  const [chinese,setchinese]=useState([])
  useEffect(() => {
    axios("http://localhost:5000/getpizza")
    .then(response => setpizza(response.data))
    .catch(error => console.error('Error fetching data:', error));
    
  }, [])
  
  useEffect(() => {
    axios("http://localhost:5000/getchinese")
    .then(response => setchinese(response.data))
    .catch(error => console.error('Error fetching data:', error));
  }, [])
  useEffect(() => {
        
  }, [value.user])
  

  async function incrpizza(e){
     let obj=pizza.map(item=>{
      if(item.id===e.id){
        return {...item,count:item.count+1}
      }
      return item
     });
     setpizza(obj)
  }
  async function decrpizza(e){
    let obj=pizza.map(item=>{
      if(item.count===0){
        return item
      }
     if(item.id===e.id){
       return {...item,count:item.count-1}
     }
     return item
    });
    setpizza(obj)
 }
 async function incrch(e){
  let obj=chinese.map(item=>{
   if(item.id===e.id){
     return {...item,count:item.count+1}
   }
   return item
  });
  setchinese(obj)
}
async function decrch(e){
 let obj=chinese.map(item=>{
   if(item.count===0){
     return item
   }
  if(item.id===e.id){
    return {...item,count:item.count-1}
  }
  return item
 });
 setchinese(obj)
}
 
 async function addcart(e){
     let product={name:e.name,piece:e.count,price:e.price,id:uuidv4()}
     let userId=value.user._id
     
     
     if(Object.keys(value.user).length!==0){
      
     let res=await fetch("http://localhost:5000/mycart",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({userId,product})})
     let data=await res.json();
     value.setuser(data)
     console.log(value.user);
     navigate('/mycart')
     }else{
      navigate('/login')
     }
     
     
     
     
 }


  return (
    <div className='bg-zinc-900 text-white '>
      <div className='text-center pt-2'>
        <h2>
            Make Your Orders 
        </h2>
      </div>
      <hr className='border-white border-2 w-[95vw] mx-auto'/>
      <div className='ml-5'><h4>Pizza</h4></div>

      <div className='flex flex-wrap lg:ml-5 ml-3 mt-4 '>
        {pizza.map(item=>{
            return <div className='lg:h-[310px] lg:w-[200px] h-[310px] w-[180px] rounded-md bg-zinc-800 lg:ml-[8px] ml-[8px] mt-[8px]'>
              <div className='h-[150px]'>
                  <img className='h-[140px] lg:w-[180px] w-[160px] pt-[10px] mx-auto rounded-lg' src={item.img} alt="" />
              </div>
              
              <div className='pl-3 flex-col'>
                <span className='pt-1'>{item.price}/-</span>
                <p>{item.name}</p>
              </div>
              <div className='flex justify-center items-center'>
                  <button onClick={()=>{decrpizza(item)}} className='mr-4 bg-red-600 px-3 text-2xl rounded-lg hover:bg-red-700'>-</button>
                  <h6 className='pt-2'>{item.count}</h6>
                  <button onClick={()=>{incrpizza(item)}} className='ml-4 bg-red-600 px-3 text-2xl rounded-lg hover:bg-red-700'>+</button>
              </div>
              <div className='flex justify-center pt-2'>
                  <button onClick={()=>{addcart(item)}} className='bg-red-600 px-2 py-1 rounded-lg hover:bg-red-700 '>Order Now</button>
              </div>
          </div>
        })}
      </div>
      <hr className='border-white border-2 w-[95vw] mx-auto'/>
      <div className='ml-5'><h4>Chinese</h4></div>

      <div className='flex lg:ml-5 ml-3 mt-4 flex-wrap'>
        {chinese.map((item)=>(
            <div className='lg:h-[310px] lg:w-[200px] h-[310px] w-[180px] rounded-md bg-zinc-800 lg:ml-[8px] ml-[8px] mt-[8px]'>
              <div className='h-[150px]'>
                  <img className='h-[140px] lg:w-[180px] w-[160px] pt-[10px] mx-auto rounded-lg' src={item.img} alt="" />
              </div>
              <div className='pl-3 flex-col'>
                <span className='pt-1'>{item.price}/-</span>
                <p>{item.name}</p>
              </div>
              <div className='flex justify-center items-center'>
                  <button onClick={()=>{decrch(item)}} className='mr-4 bg-red-600 px-3 text-2xl rounded-lg hover:bg-red-700'>-</button>
                  <h6 className='pt-2'>{item.count}</h6>
                  <button onClick={()=>{incrch(item)}} className='ml-4 bg-red-600 px-3 text-2xl rounded-lg hover:bg-red-700'>+</button>
              </div>
              <div className='flex justify-center pt-2'>
                  <button onClick={()=>{addcart(item)}} className='bg-red-600 px-2 py-1 rounded-lg hover:bg-red-700 '>Order Now</button>
              </div>
          </div>
        ))}
      </div>
        
      <hr className='border-white border-2 w-[95vw] mx-auto'/>

      <div className='ml-5'>
        <h2>About Us</h2>
        <div>
          Email-
          <u><a href="">foodcom@gmail.com</a></u>
        </div>
        <div>
            Contect No-
            <u>999999999</u>
        </div>
        <div className='text-center'>
            Best food of pune with great discount
        </div>
      </div>
        

        
    </div>
  )
}

export default Food
