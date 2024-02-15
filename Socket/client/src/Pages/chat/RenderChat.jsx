import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import { getChatData } from './chat.api'
import Loading from '../../Components/Loading/Loading'
import ChatBox from './Widgets/ChatBox'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const RenderChat = () => {
  const { CID } = useParams()
  const [chatData, setChatData] = useState()
  useEffect(() => {}, [
    !chatData && CID && getChatData({ limit: 5, setChatData, CID })
  ])

  const token = useSelector(s => s.token)
  const [socket, setSocket] = useState()
  useEffect(() => {
    // Connect to the server
    const socket = io(process.env.REACT_APP_WS)

    socket.auth = { token, chatRoomId: CID }
    // Log a message when the connection is established
    socket.on('connect', () => {
      console.log('Connected to server')
      setSocket(socket)
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      {chatData ? (
        <WidgetsOnPage
          title={chatData.name}
          leftComponent={<>connected Users</>}
          rightComponent={
            <>
              <ChatBox CID={CID} socket={socket} messages={chatData.messages} />
            </>
          }
        />
      ) : (
        <Loading />
      )}
    </>
  )
}

export default RenderChat
