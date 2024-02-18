import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate()
  const user = useSelector(s => s.user)
  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.username}`)
    } else {
      navigate(`/login`)
    }
  }, [user, navigate])
  return <></>
}

export default HomePage
