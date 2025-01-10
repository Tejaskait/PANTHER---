import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
const AppRoutes = () => {
  return (
    <BrowserRouter>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="*" element={<NotFound />} />
    
</Routes>
    </BrowserRouter>  
    )
}

export default AppRoutes