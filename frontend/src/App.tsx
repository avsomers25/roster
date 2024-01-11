import { useState } from 'react'
import './App.css'
import LoginForm from './form';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Login Form</h1>
        <LoginForm />
      </div>
    </>
  )
}

export default App
