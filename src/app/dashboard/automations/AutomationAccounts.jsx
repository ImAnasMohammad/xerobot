'use client'

import AccountProfile from '@/components/custom/Account/AccountProfile';
import AccountSkeletonProfile from '@/components/custom/Account/AccountSkeletonProfile';
import { useColorModeValue } from '@/components/ui/color-mode';
import { GridItem } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const AutomationAccounts = ({ selectedAccountId, handleClick }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAccountDetails =async ()=>{
    try{
      const res = await axios.get(`/api/socialAccounts/getAll`);

      if(!res?.data?.data){
        toast.error(res?.data?.message ?? "Something went wrong.")
      }else{
        console.log(res.data.data)
        setAccounts(res.data.data);
      }

    }catch(err){
      toast.error(err?.message ?? "Something went wrong.");
    }finally{
      setLoading(false);
    }
  }



  useEffect(()=>{
    getAccountDetails()
  },[])

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 3, md: 3 }}
      gap={5}
    >
      {
        !loading && !error ? <AccountsProfileGrid
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          handleClick={handleClick}
        /> :<AccountSkeletonGrid accounts={[1,2,3,5]}/>
      }
    </SimpleGrid>
  )
}


const AccountsProfileGrid = ({accounts,selectedAccountId,handleClick}) => {

    return accounts.map(account => <GridItem
      borderRadius="md"
      boxShadow="xs"
      py={3}
      px={2}
      overflow={'hidden'}
      key={account._id}
      cursor={'pointer'}
      _hover={{
        border: selectedAccountId === account._id ? useColorModeValue('1px solid rgba(150,120,120,0.2)', '1px solid rgba(170,170,170,0.9)') : useColorModeValue('1px solid rgba(80,80,80,0.6)', '1px solid rgba(80,80,80,0.6)')
      }}
      border={
        selectedAccountId === account._id ?
          useColorModeValue('1px solid rgba(150,120,120,0.2)', '1px solid rgba(170,170,170,0.9)') :
          useColorModeValue('1px solid rgba(30,30,30,0.2)', '1px solid rgba(30,30,30,0.2)')
      }
      onClick={() => handleClick(account._id)}

    >
      <AccountProfile user={{
        accountType:account.platform,
        name:account.accountUserName,
        profile:account.accountProfile
      }} />
    </GridItem>
  )
}


const AccountSkeletonGrid = ({accounts})=>{
  return accounts.map(account => <GridItem
    borderRadius="md"
    boxShadow="xs"
    py={3}
    px={2}
    pr={15}
    overflow={'hidden'}
    key={account}
    border={useColorModeValue('1px solid rgba(30,30,30,0.2)', '1px solid rgba(30,30,30,0.2)')}
  >
    <AccountSkeletonProfile
      id={account}
      circleRadius={10}
      lineWidth={75}
      alignItems='center'
    />
  </GridItem>
)
}





export default AutomationAccounts