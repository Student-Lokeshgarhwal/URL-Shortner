import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

const [name,setName] = useState('')
const [password,setPassword] = useState('')
const [email,setEmail] = useState('')
const [role,setRole] = useState('')

const navigate = useNavigate()

  const submithandler =async (e)=>{
    e.preventDefault()  
    const formdata = {name,password,email,role}
    await fetch('http://localhost:8001/user',{
      method:'POST',
      credentials:true,
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(formdata)
    })
    .then((res)=>{
        if(res.status === 200){
            navigate('/login')
        }
        else{
            alert('error')
        }
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  return (
    <>
    <h1>SignUp</h1>
    <form onSubmit={submithandler}>
      <label htmlFor="name">Name :</label><br />
      <input type="text" name="name" id="name" value={name} placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/><br />
      <label htmlFor="password">password :</label><br />
      <input type="password" name="password" id="password" value={password} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/><br />
      <label htmlFor="email">email :</label><br />
      <input type="email" name="email" id="email" value={email} placeholder="Enter name" onChange={(e)=>setEmail(e.target.value)}/><br />
      <label htmlFor="role">role :</label><br />
      <input type="text" name="role" id="role" value={role} placeholder="Enter role" onChange={(e)=>setRole(e.target.value)}/><br />
      <button type='submit'>submit</button>
    </form>
    </>
  )
}

export default Signup
