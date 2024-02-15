import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import FlexBetween from '../../../../Components/FlexBetween'
export default function Messages ({ msgLst }) {
  const user = useSelector(s => s.user)
  
  return (
    <>
      {msgLst.map((m, i) => (
        <Box key={i}>
          {m.sender === user?._id ? (
            <FlexBetween>
              <Box />
              <MessageContent msg={m} />
            </FlexBetween>
          ) : (
            <FlexBetween>
              <MessageContent msg={m} />
            </FlexBetween>
          )}
        </Box>
      ))}
    </>
  )
}

const MessageContent = ({ msg }) => {
  return (
    <Typography
      borderRadius={'0.5rem'}
      border={'1px solid red'}
      padding={'0.5rem'}
      margin={'0.2rem'}
      maxWidth={'70%'}
    >
      {msg.content}
    </Typography>
  )
}
