import { useState } from 'react'

import './App.css'
import Banner from './Components/Banner'
import Assigmenticon from './Components/Assigment'
import Home from './Components/Home'
import Quize from './Components/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Quize></Quize>
    </>
  )
}

export default App
