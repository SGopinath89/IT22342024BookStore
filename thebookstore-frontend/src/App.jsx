import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        Hello world!
      </div>
      <Outlet/>
    </>
  )
}

export default App
