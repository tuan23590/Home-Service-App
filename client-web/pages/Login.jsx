// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            // value={username}
            // onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            // value={password}
            // onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" onClick={()=>navigate('/')} >Login</button>
      </form>
    </div>
  )
}
