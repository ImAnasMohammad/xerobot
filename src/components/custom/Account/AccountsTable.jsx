import { Flex, Table, Text } from "@chakra-ui/react"
import AccountProfile from "./AccountProfile"
import AccountActions from "./AccountActions"
import AccountRemove from "../dailog/AccountRemove"
import { useEffect, useState } from "react"
import { sendGet } from "@/utils/sendRequest"
import { Spinner } from "@chakra-ui/react"


const AccountTable = ({search=''}) => {

  const [open,setOpen]= useState(false);
  const [accounts,setAccounts]=useState([]);
  const [loading,setLoading] = useState(true);

  const handleClick = (id,action) => {
    console.log(id,action);
  }

  const getAccountDetails = async()=>{
    const accountDetails =await sendGet({url:`/api/socialAccounts/accounts?search=${search}`});

    setAccounts(accountDetails?.accounts);
    setLoading(false);
  }

  useEffect(()=>{
    getAccountDetails();
  },[]);


  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(getAccountDetails, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <>
      <AccountRemove
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
      <Table.ScrollArea borderWidth="1px" borderLeft={'0px'} borderRight={'0px'} maxW="full">
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row fontSize={'lg'} px={5}>
              <Table.ColumnHeader py={5} px={7}>Account Information</Table.ColumnHeader>
              <Table.ColumnHeader>Automations</Table.ColumnHeader>
              <Table.ColumnHeader>Account Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              !loading&&accounts.map(account =><TableRow key={account?._id} account={account} handleClick={handleClick} setOpen={setOpen}/>)
            }
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      {
        loading && <Flex justifyContent={'center'} mt={20}>
          <Spinner size="md" />
        </Flex>
      }
      {
        !loading && accounts?.length<=0 && <Flex justifyContent={'center'} mt={20}>
          <Text>No Accounts Found</Text>
        </Flex>
      }
    </>
  )
}

const TableRow = ({account,setOpen,handleClick})=>{

  const {accountName,platform,accountUserName,automationCount,accountProfile,_id:id} = account;
  return <Table.Row>
  <Table.Cell py={7} px={7}>
    <AccountProfile user={{
      email:accountName,
      accountType:platform,
      name:accountUserName,
      profile:accountProfile
    }} />
  </Table.Cell>
  <Table.Cell>
    {
      automationCount
    }
  </Table.Cell>
  <Table.Cell>
    <AccountActions
      handleRemove={()=>setOpen(id)}
      handlePause={()=>handleClick(id,'PAUSE')}
      handleRegenerate={()=>handleClick(id,'REGENERATE')}
      handleResume={()=>handleClick(id,'RESUME')}
    />
  </Table.Cell>
</Table.Row>
}


export default AccountTable