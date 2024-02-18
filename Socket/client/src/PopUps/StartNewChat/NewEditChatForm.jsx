import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FlexBetween from '../../Components/FlexBetween'
import { MyTextField } from '../../Components/MyComponents'
import MyButton from '../../Components/MyCompoenents/MyButton'
import { getUser } from '../../Pages/ProfilePage/User.api'
import { createChatRoom } from './chat.api'

const NewChatForm = ({ data, setOpenAddPopUp }) => {
  const token = useSelector(s => s.token)
  const user = useSelector(s => s.user)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({ user_id: user._id })
  const onChangehandle = (val, name) => {
    let tmp = { ...values }
    tmp[name] = val
    setValues(tmp)
  }

  useEffect(() => {
    if (data) {
      setValues({
        user_id: user._id,
        users: data.users
      })
    }
  }, [data])

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    try {
      if (data == null) {
        getUser(values.username).then(res => {
          if (!res) {
            alert('user not exist with ' + values.username + ' username')
          } else {
            createChatRoom({
              data: { name: values.chat_name, anotherUserId: res._id },
              token
            }).then(() => {
              setOpenAddPopUp(false)
            })
          }
        })
      } else {
        // update logic goes here
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  // console.log(values);
  return (
    <form onSubmit={onSubmit}>
      <FlexBetween flexDirection={'column'} gap={2} my={3}>
        <MyTextField
          val={values?.chat_name}
          setInputVal={onChangehandle}
          name={'chat_name'}
        />
        <MyTextField
          val={values?.username}
          name={'username'}
          setInputVal={onChangehandle}
        />
        <MyButton
          disabled={loading}
          label={!data ? 'Create Chat' : 'Update Settings'}
        />
      </FlexBetween>
    </form>
  )
}

export default NewChatForm
