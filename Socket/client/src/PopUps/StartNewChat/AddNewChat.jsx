import React, { useState } from 'react'
import AddPopUp from '../../Components/MyCompoenents/AddPopUp'
import NewEditChatForm from './NewEditChatForm'

const AddNewChat = ({ refreshPage, setRefreshPage }) => {
  // State to control the visibility of the add auction pop-up dialog
  const [openAddPopUp, setOpenAddPopUp] = useState(false)

  // useEffect(() => {
  //   setRefreshPage(!refreshPage);
  // }, [openAddPopUp]);
  // console.log(refreshPage);
  return (
    <AddPopUp
      // Pass user information as a prop to the AddPopUp component
      title={'Create new chat'}
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      // Render the NewAuctionForm component within the pop-up dialog
      form={<NewEditChatForm setOpenAddPopUp={setOpenAddPopUp} />}
    />
  )
}

export default AddNewChat
