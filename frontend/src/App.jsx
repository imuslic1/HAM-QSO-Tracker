import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import QsoForm from './components/QsoForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <QsoForm />
    </div>
  )
}

export default App
