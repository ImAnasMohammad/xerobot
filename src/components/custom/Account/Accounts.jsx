import {   Box, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import AccountProfile from './AccountProfile';
import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';

const Accounts = () => {
    const [value,setValue]=useState('');
    const loading = false;
  return (
      <SimpleGrid
        columns={{ base: 3, sm: 2, md: 3 }}
        gap={4}
      >
        {
        
        items.map((item) =>{
          const isSelected = item.value === value;
            return <button 
              style={{
                border:'1px solid rgba(0,0,0,0)',
                padding:'15px 20px',
                borderRadius:'5px',
                cursor:'pointer',
                boxShadow:useColorModeValue('rgba(149, 157, 165, 0.2) 0px 8px 24px','rgba(69, 77, 85, 0.2) 0px 8px 24px'),
                borderColor:isSelected && useColorModeValue('rgba(0,0,0,0.5)','rgba(255,255,255,0.5)'),
              }}
              
              onClick={()=>setValue(item.value)}
              
            >

              <AccountProfile user={item}/>
            </button>
        })}
      </SimpleGrid>
  )
}

const items = [
    {
        name:'hello',
        value:'Facebook',
        accountType:"Facebook",
        email:'user_name'

    },
    {
        name:'hello',
        value:'Facebaook',
        accountType:"Facebook",
        email:'user_name'

    },
    {
        name:'hello',
        value:'Faceboaok',
        accountType:"Facebook",
        email:'user_name'

    },
    {
        name:'hello',
        value:'Facsebaook',
        accountType:"Facebook",
        email:'user_name'

    },
    {
        name:'hello',
        value:'Facebsoaok',
        accountType:"Facebook",
        email:'user_name'

    },
]

export default Accounts