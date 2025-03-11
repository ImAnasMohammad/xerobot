
import Main from "./Main"


const page = async ({params}) => {
  const {id} = await params;
  return (
    <Main id={id}/>
  )
}

export default page