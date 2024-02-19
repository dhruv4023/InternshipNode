import React, { useEffect, useRef, useState } from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import OldMsgs from './ChatArea/OldMsgs'
import FlexBetween from '../../../Components/FlexBetween'
import NewMsg from './ChatArea/NewMsg'
import { Refresh } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { getChatMessages } from '../chat.api'
import Loading from '../../../Components/Loading/Loading'
import WriteMsg from './ChatArea/WriteMsg'

const ChatBox = ({ messages, socket, CID }) => {
  const msgContainerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [msgList, setMessages] = useState(messages)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (msgContainerRef.current) {
      const container = msgContainerRef.current
      container.scrollTop = container.scrollHeight - container.clientHeight
      const observer = new MutationObserver(() => {
        container.scrollTop = container.scrollHeight - container.clientHeight
      })
      observer.observe(container, {
        attributes: true,
        childList: true,
        subtree: true
      })
    }
  }, [CID])

  useEffect(() => {
    const handleMessage = message => {
      try {
        const data = JSON.parse(message)
        setMessages(prevMsgList => [...prevMsgList, data])
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
  }, [socket, setMessages])

  const retriveOldMsgs = () => {
    setLoading(true)
    getChatMessages({ page, chatRoomId: CID })
      .then(data => {
        page === 1 ? setMessages(msgList) : setMessages([...data, ...msgList])
        setPage(page + 1)
      })
      .finally(() => setLoading(false))
    // console.log('called',page)
  }
  return (
    <WidgetWrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlexBetween>
            <div></div>
            <IconButton onClick={retriveOldMsgs}>
              <Refresh />
            </IconButton>
            <div></div>
          </FlexBetween>
          <FlexBetween
            ref={msgContainerRef}
            height={'55vh'}
            flexDirection={'column'}
            overflow={'auto'}
            // border={"1px solid"}
          >
            <OldMsgs messages={msgList} CID={CID} />
            {/* <NewMsg socket={socket} CID={CID} /> */}
          </FlexBetween>
          <FlexBetween>
            <WriteMsg CID={CID} socket={socket} msgList={msgList} />
          </FlexBetween>
        </>
      )}
    </WidgetWrapper>
  )
}

export default ChatBox
