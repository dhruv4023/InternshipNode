import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import WriteMsg from './WriteMsg'

const NewMsg = ({ CID, socket }) => {
  const [msgList, setMsgList] = useState([])

  useEffect(() => {
    const handleMessage = message => {
      try {
        const data = JSON.parse(message)
        setMsgList(prevMsgList => [...prevMsgList, data])
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    // Add event listener on component mount
    socket.on('message', handleMessage)

    // Remove event listener on component unmount
    return () => {
      socket.off('message', handleMessage)
    }
  }, [socket, setMsgList])

  console.log(msgList)

  return (
    <>
      <Box width={'100%'}>
        <Messages msgLst={msgList} />
      </Box>{' '}
      <Box position={"sticky"} bottom={0} width={"100%"}>
        <WriteMsg CID={CID} socket={socket} msgList={msgList} />
      </Box>
    </>
  )
}

export default NewMsg