import React from 'react'

const Login = ({firebaseEmail, firebasePassword, handleFirebaseEmail, handleFirebasePassword, login, signUp}) => {
  return (
    <form>
      <input type="email" placeholder="your@email.com" value={firebaseEmail} onChange={handleFirebaseEmail} autoComplete="email" />
      <input type="password" value={firebasePassword} onChange={handleFirebasePassword} autoComplete="current-password" />
      <button type="submit" onClick={login}>Login</button>
      <button type="submit" onClick={signUp}>Sign Up</button>
    </form>
  )
}


export default Login