import './App.css'
import Navbar from './Component/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Component/Footer'
import Home from './Component/Home'
import Note from './Component/Note'
import About from './Component/About'
import Contact from './Component/Contact'
import Login from './Component/Login'
import CreateNote from './Component/CreateNote'
import Signup from './Component/Signup'
import Review from './Component/Review'
function App() {
  return (
    <>
   
        <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Note" element={<Note/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Contact" element={<Contact/>} />
         <Route path="/Login" element={<Login/>} />
         <Route path="/CreateNote" element={<CreateNote/>} />
         <Route path="/Signup" element={<Signup/>} />
         <Route path="/Review" element={<Review/>} />
      </Routes>
       <Footer/>
     </>
  )
}

export default App
