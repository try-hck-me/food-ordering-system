import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { countercontext } from '../context/context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
const Mycart = () => {
  const [cart, setcart] = useState([])
  const value=useContext(countercontext)
  const  navigate=useNavigate()
  const gohome=()=>{
    navigate('/')
  }

  useEffect(() => {
    setcart(value.user.mycart)
  },[])

  async function deletecart(id){
     let userId=value.user._id;
     let res=await fetch("http://localhost:5000/deletcart",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({userId,id})})
     let data=await res.json()
    //  console.log(data.mycart);
     setcart(data.mycart)
  }
  

  return (
    <div>
      <div className='bg-zinc-950 w-[100vw] min-h-[100vh] text-white overflow-hidden'>
          <div className='text-center pt-14 flex justify-center'><h1>Your Pandding Orders</h1><button  onClick={gohome} className='bg-red-600 px-3 text-3xl pb-1 ml-4 rounded-xl hover:bg-red-700'>x</button></div>

          <div className='lg:w-[50%] md:w-[78%] w-[88%] h-[600px] mx-auto mt-4 bg-zinc-800 rounded-3xl flex-col relative '>
              <table className='w-full'>
                 <thead className=''>
                    <tr className='justify-around text-center text-2xl font-serif text-red-600'>
                        <th className='border-b'>Name</th>
                        <th className='border-b'>Piece</th>
                        <th className='border-b'>Price</th>
                        <th className='border-b'>Delete</th>
                    </tr>
                    
                 </thead>
                  
                 <tbody>
                 {cart.map(item=>{
                  return <tr className='justify-around text-center '>
                      <td>{item.name}</td>
                      <td>{item.piece}</td>
                      <td>{item.price}/-</td>
                      <td><button onClick={()=>{deletecart(item.id)}} className='bg-red-600 px-2 rounded-md hover:bg-red-700'><FontAwesomeIcon icon={faTrash} /></button></td>
                    </tr>
                 })}


                 </tbody>
              </table>
              
          </div>
      </div>
    </div>
  )
}

export default Mycart
