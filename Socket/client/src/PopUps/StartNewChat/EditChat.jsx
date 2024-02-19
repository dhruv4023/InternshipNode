import React, { useState } from 'react'
import { ModeEditOutline } from '@mui/icons-material'
import NewEditChatForm from './NewEditChatForm'
import AddPopUp from '../../Components/MyCompoenents/AddPopUp'

const EditChat = ({ user, data }) => {
  // State to control the visibility of the add auction pop-up dialog
  const [openAddPopUp, setOpenAddPopUp] = useState(false)

  return (
    <AddPopUp
      // Pass user information as a prop to the AddPopUp component
      user={user}
      title={'Edit Chat Name'}
      buttonIcon={<ModeEditOutline />}
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      buttonComponent={true}
      // Render the NewAuctionForm component within the pop-up dialog
      form={<NewEditChatForm data={data} openAddPopUp={openAddPopUp} />}
    />
  )
}

export default EditChat
