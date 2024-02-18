import AboutUs from '../Pages/AboutUs/AboutUs'
import { LoginPage } from '../Pages/LoginPage/LoginPage'
import PageNotFound from '../Pages/PageNotFound'
import { ProfilePage } from '../Pages/ProfilePage/ProfilePage'
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from '../Pages/HomePage/HomePage'
import RenderChat from '../Pages/chat/RenderChat'
import { useSelector } from 'react-redux'
export const AllRoutes = () => {
  const navigate = useNavigate()
  const user = useSelector(s => s.user)
  useEffect(() => {
    if (!user) navigate(`/login`)
  }, [user, navigate])

  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/:page'} element={<LoginPage />} />
      <Route path={'/about'} element={<AboutUs />} />
      <Route path={'/profile/:UID'} element={<ProfilePage />} />
      <Route path={'/chat/:CID'} element={<RenderChat />} />
      <Route path={'/404'} element={<PageNotFound />} />
    </Routes>
  )
}
