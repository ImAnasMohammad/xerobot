import { Flex, Table, Text } from "@chakra-ui/react"
import AccountProfile from "./AccountProfile"
import AccountActions from "./AccountActions"
import DeleteDailog from "../dailog/DeleteDailog"
import {  useEffect, useState } from "react"
import { sendGet } from "@/utils/sendRequest"
import { Spinner } from "@chakra-ui/react"
import handleDelete from "@/app/dashboard/accounts/handleActions/handleDelete"
import CustomTable from "../CustomTable"
import { Button } from "@/components/ui/button"
import useColors from "@/hooks/useColors"
import { Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useColorModeValue } from "@/components/ui/color-mode"
import handleStatus from "@/app/dashboard/accounts/handleActions/handleStatus"
import { toastError } from "../toast"
import handleInstagramLogin from "@/utils/handleInstagramLogin"


const AccountTable = ({search='',handleOpen}) => {

  const [open,setOpen]= useState(false);
  const [accounts,setAccounts]=useState([]);
  const [loading,setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false); 
  const {mainColor,textDark} = useColors();

  const handleClick = async (id, action) => {
    let res = {}
    if(action==='DELETE'){
      await handleDelete(id,accounts,setAccounts,setDeleteLoading);
      setOpen(false);
    }else if(action==='STATUS' ){
      res = await handleStatus(id);
      console.log(res)
      if(res?.success){
        setAccounts([...accounts.map(account=>account._id===id?{...account,isActive:!account.isActive}:account)]);
      }
    }

    if(!res?.success){
      toastError(res?.message || "Something went wrong");
      return;
    }
  }

  const getAccountDetails = async()=>{
    const accountDetails = await sendGet({ url: `/api/socialAccounts/accounts?search=${search}` });
    
    if (accountDetails?.success) {
      console.log(accountDetails?.accounts)
      setAccounts(accountDetails?.accounts);
    } else {
      toastError(accountDetails?.message || 'Something went wrong')
    }
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
      <DeleteDailog open={open} setOpen={setOpen} handleClick={handleClick} deleteLoading={deleteLoading}>
        <Text as={'p'}>
          This action cannot be undone. This will permanently delete your
          account and all automations regarding to this accounnt and remove your data from our systems.
        </Text>
      </DeleteDailog>
      <CustomTable headings={['Account Information','Automations','Status','Account Actions']}>
        {
          accounts?.map(account =><TableRow key={account?._id} account={account} handleClick={handleClick} setOpen={setOpen}/>)
        }
      </CustomTable>
      {
        loading && <Flex justifyContent={'center'} mt={20}>
          <Spinner size="md" />
        </Flex>
      }
      {
        !loading && accounts?.length<=0 && <Flex justifyContent={'center'} mt={20}>
          <Button bg={mainColor} color={textDark} onClick={handleOpen}><Plus/>Add Account</Button>
        </Flex>
      }
    </>
  )
}

const TableRow = ({account,setOpen,handleClick})=>{

  const {accountName,platform,accountUserName,automationCount,accountProfile,_id:id,iskeyExpired,isActive} = account;


  const {textUltraShadedDark} = useColors();
  return <Table.Row>
  <Table.Cell py={7} alignItems={'center'}>
    <Flex justify={'center'} align={'center'}>
      <AccountProfile user={{
        email:accountName,
        accountType:platform,
        name:accountUserName,
        profile:accountProfile
      }} />
      </Flex>
  </Table.Cell>
  <Table.Cell textAlign={'center'}>
    {
      automationCount
    }
  </Table.Cell>
  <Table.Cell textAlign={'center'}>
    <Flex flexDirection="column" gap={2} justifyContent={'center'} alignItems={'center'}>
      <Switch checked={!iskeyExpired && isActive} disabled={iskeyExpired} onChange={()=>handleClick(id,'STATUS')} pt={iskeyExpired && 5}/>
      { iskeyExpired && <Text color={useColorModeValue('grey',textUltraShadedDark)}>
        Permissions has expired. Please regenerate
      </Text>}
    </Flex>
  </Table.Cell>
  <Table.Cell>
    <AccountActions
      handleRemove={()=>setOpen(id)}
      handleRegenerate={handleInstagramLogin}
    />
  </Table.Cell>
</Table.Row>
}


export default AccountTable