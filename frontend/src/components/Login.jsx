import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate()
    
    const submithandler = async (e) => {
        e.preventDefault()
        const formdata = { email,password }
       const res = await fetch('https://url-shortner-9dd3.onrender.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata),
            credentials: 'include'
        })
        if(res.status === 200) {
            // console.log(res.cookie)
            navigator('/')
        }
        else {
            alert('Login fail')
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submithandler}>
                <label htmlFor="email">email :</label><br />
                <input type="email" name="email" id="email" value={email} placeholder="Enter name" onChange={(e) => setEmail(e.target.value)} /><br />
                <label htmlFor="password">password :</label><br />
                <input type="password" name="password" id="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} /><br />
                <button type='submit'>submit</button>
            </form>
        </>
    )
}

export default Login