import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import GmailImg from '../images/GmailImg.png'
import Clone from '../images/Clone.png'

const Signup = () => {

  const [input, setInput] = useState({
    fullname:'',
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    // API call
    try {
      const res = await axios.post('https://gmail-clone-cqdy.onrender.com/api/v1/user/register',input, {
        headers: {
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='flex items-center justify-between w-screen h-screen'>
      <div className='flex'>
            <img className='w-80' src={GmailImg} alt="GMAIL"/>
            <img className='w-80' src={Clone} alt="Clone"/>
            </div>
        <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 h-[60%] w-[30%] mr-50'>
            <h1 className='font-bold text-2xl uppercase my-2'>SignUp</h1>
            <input onChange={changeHandler} value={input.fullnamae} name='fullname' type="text" placeholder='Name' className='border border-gray-400 rounded-md px-2 py-1' />
            <input onChange={changeHandler} value={input.email} name='email' type="email" placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1'/>
            <input onChange={changeHandler} value={input.password} name='password' type="password" placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1' />
            <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>SignUp</button>
            <p>Already have an account? <Link to="/login" className='text-blue-600'>LogIn</Link> </p>
        </form>
    </div>
  )
}

export default Signup