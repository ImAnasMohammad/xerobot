
import InputForAutomation from './InputForAutomation'

const CommmentReply = ({value='',handleValue,loading}) => {
  return (
    <InputForAutomation
      heading={'Enter Comment Reply'}
      name="commentReply"
      value={value}
      handleValue={handleValue}
      placeholder='Enter your reply here...'
      disabled={loading}
      type='input'
    />
  )
}

export default CommmentReply