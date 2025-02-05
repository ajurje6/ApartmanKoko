import { useState } from 'react'
import "./i18n";
import Header from './components/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>  
    </>
  )
}

export default App
