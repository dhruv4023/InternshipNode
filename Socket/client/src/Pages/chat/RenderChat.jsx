import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import { getChatData } from './chat.api'
import Loading from '../../Components/Loading/Loading'
import ChatBox from './Widgets/ChatBox'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import UserWidgets from '../ProfilePage/Widgets/UserWidgets'
import { getUser } from '../ProfilePage/User.api'
import EditChat from '../../PopUps/StartNewChat/EditChat'
import FlexBetween from '../../Components/FlexBetween'
import { IconButton } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { deleteChatRoom } from '../../PopUps/StartNewChat/chat.api'

const RenderChat = () => {
  const { CID } = useParams()
  const token = useSelector(s => s.token)
  const user = useSelector(s => s.user)
  const navigate = useNavigate()
  const [socket, setSocket] = useState()
  const [chatData, setChatData] = useState()
  const [anotherUser, setAnotherUser] = useState()

  useEffect(() => {
    !chatData &&
      CID &&
      getChatData({ limit: 10, CID, token })
        .then(d => {
          if (!d) navigate('/')
          else {
            setChatData(d)
            !anotherUser &&
              getUser(d?.users.filter(f => f !== user._id)).then(ad =>
                setAnotherUser(ad.user)
              )
          }
        })
        .catch(e => alert(e.message))
  }, [setChatData, CID])

  useEffect(() => {
    const socket = io(process.env.REACT_APP_WS) // Connect to the server

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
        <>
          <WidgetsOnPage
            title={
              <FlexBetween>
                <FlexBetween>
                  <EditChat data={{ name: chatData.name, chatRoomId: CID }} />
                  <IconButton
                    sx={{
                      background: 'red',
                      margin: '0.5rem',
                      padding: '1rem'
                    }}
                    onClick={() =>
                      deleteChatRoom({ chatRoomId: CID, token }).then(d =>
                        navigate('/')
                      )
                    }
                  >
                    <DeleteForever />
                  </IconButton>
                </FlexBetween>
                {chatData.name}
              </FlexBetween>
            }
            leftComponent={
              <>
                {anotherUser ? (
                  <UserWidgets user={anotherUser} />
                ) : (
                  <>
                    <Loading />
                  </>
                )}
              </>
            }
            rightComponent={
              <>
                <ChatBox
                  CID={CID}
                  socket={socket}
                  messages={chatData.messages}
                />
              </>
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default RenderChat
