import React, { useEffect, useRef, useState } from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import OldMsgs from './ChatArea/OldMsgs'
import FlexBetween from '../../../Components/FlexBetween'
import NewMsg from './ChatArea/NewMsg'
import { Refresh } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { getChatMessages } from '../chat.api'
import Loading from '../../../Components/Loading/Loading'

const ChatBox = ({ messages, socket, CID }) => {
  const msgContainerRef = useRef(null)
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
  const [loading, setLoading] = useState(false)
  const [msgList, setMessages] = useState(messages)
  const [page, setPage] = useState(2)
  const retriveOldMsgs = () => {
    setLoading(true)
    getChatMessages({ page, chatRoomId: CID })
      .then(data => {
        setMessages([...data, ...msgList])
        setPage(page + 1)
      })
      .finally(() => setLoading(false))
    console.log('called')
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
            marginBottom={"5rem"}
          >
            <OldMsgs messages={msgList} CID={CID} />
            <NewMsg socket={socket} CID={CID} />
          </FlexBetween>
        </>
      )}
    </WidgetWrapper>
  )
}

export default ChatBox
