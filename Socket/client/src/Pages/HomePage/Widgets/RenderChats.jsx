import React from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import { useNavigate } from 'react-router-dom'

const RenderChats = ({ chats }) => {
  const navigate = useNavigate()
  return (
    <>
      {chats.map(chat => (
        <WidgetWrapper
          margin={'0.5rem'}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/chat/${chat._id}`)}
        >
          {chat.name}
        </WidgetWrapper>
      ))}
    </>
  )
}

export default RenderChats
