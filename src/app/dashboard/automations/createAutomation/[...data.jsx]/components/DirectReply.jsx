import React from 'react'
import InputForAutomation from './InputForAutomation'

const DirectReply = ({value='',handleValue,loading}) => {
  return (
    <InputForAutomation
            heading={'Enter Direct Message'}
            name="message"
            value={value}
            handleValue={handleValue}
            placeholder='Enter your message here...'
            disabled={loading}
    />
  )
}

export default DirectReply