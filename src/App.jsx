import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Shared/Navbar'
import Home from './pages/Home'
import Footer from './Shared/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'
import VerifyOtp from './pages/VerifyOtp'
import Addfood from './pages/admin/Addfood'
import Menu from './pages/Menu'
import FoodPage from './pages/FoodPage'
import Proifle from './pages/Proifle'
import ViewCart from './pages/ViewCart'
import Order from './pages/Order'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from './pages/Success'
import MyOrder from './pages/MyOrder'
import AllOrder from './pages/admin/AllOrder'
function App() {
  const [count, setCount] = useState(0)
  const stripePromise = loadStripe('pk_test_51LM2J1SIiDyURhxDNv1N4eG5FI9FdphG6ukPj3hrrSo6UWrgbl6o0nJqOwemWcbqjlKNBR8nqhl6rnfzz8VK2Sjx00y47ErW1D');
  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verifyOtp' element={
          <ProtectedRoute>
            <VerifyOtp />
          </ProtectedRoute>
        } />
        <Route path='/addfood' element={<ProtectedRoute><Addfood /></ProtectedRoute>} />
        <Route path='/menu' element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Proifle /></ProtectedRoute>} />
        <Route path='/menu/:id' element={<ProtectedRoute><FoodPage /></ProtectedRoute>} />
        <Route path='/viewcart' element={<ProtectedRoute><ViewCart /></ProtectedRoute>} />
        <Route path='/order' element={<ProtectedRoute> <Elements stripe={stripePromise}><Order /></Elements></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path='/my-order' element={<ProtectedRoute><MyOrder /></ProtectedRoute>} />
        <Route path='/all-order' element={<ProtectedRoute><AllOrder /></ProtectedRoute>} />

      </Routes>

      <Footer />

    </>
  )
}

export default App
