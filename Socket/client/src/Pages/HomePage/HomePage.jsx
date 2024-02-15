import React, { useEffect, useState } from 'react'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import { getAllChat } from './HomePage.api'
import Loading from '../../Components/Loading/Loading'
import RenderChats from './Widgets/RenderChats'

const HomePage = () => {
  // State to manage the display index of auctions
  // const [displayIndex, setDisplayIndex] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [chatData, setChatData] = useState()
  useEffect(() => {
    getAllChat({ page, limit, setChatData })
  }, [])

  return (
    <>
      {/* WidgetsOnPage component that displays auctions */}
      <WidgetsOnPage
        title={'Chats'}
        leftComponent={<>Left</>}
        rightComponent={<>Right</>}
      />
    </>
  )
}

export default HomePage
