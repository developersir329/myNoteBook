import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 import { ToastContainer, toast } from 'react-toastify';
 import Auth from './context/Auth'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    <Auth>
    <App />
    </Auth>
    </BrowserRouter>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  </StrictMode>,
)
