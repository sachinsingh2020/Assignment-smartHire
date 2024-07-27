import React from 'react'
import Heading from './components/Heading.jsx'
import AllOperations from './components/AllOperations.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyProvider } from './context/MyContext.jsx'
import Searching from './components/Searching.jsx'
import AllNotes from './components/AllNotes.jsx'


const App = () => {
  return (
    <div>
      <MyProvider>
        <Heading />
        <AllOperations />
        <Searching />
        <AllNotes />
        <ToastContainer />
      </MyProvider>
    </div>
  )
}

export default App
