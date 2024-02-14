import React, { useState } from 'react'
import WidgetsOnPage from '../../Components/WidgetsOnPage'

const HomePage = () => {
  // State to manage the display index of auctions
  const [displayIndex, setDisplayIndex] = useState(1)

  return (
    <>
      {/* WidgetsOnPage component that displays auctions */}
      <WidgetsOnPage
        title={'Auctions'}
        leftComponent={<>Left</>}
        rightComponent={<>Right </>}
      />
    </>
  )
}

export default HomePage
