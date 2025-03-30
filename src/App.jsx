import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Object_crud_main } from './components/object-crud-main.jsx' 


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>App Js</h2>
      <Object_crud_main></Object_crud_main>
    </>
  )
}

export default App
