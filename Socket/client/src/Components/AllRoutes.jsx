import AboutUs from '../Pages/AboutUs/AboutUs'
import { LoginPage } from '../Pages/LoginPage/LoginPage'
import PageNotFound from '../Pages/PageNotFound'
import { ProfilePage } from '../Pages/ProfilePage/ProfilePage'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage/HomePage'
import RenderChat from '../Pages/chat/RenderChat'
export const AllRoutes = () => {

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
