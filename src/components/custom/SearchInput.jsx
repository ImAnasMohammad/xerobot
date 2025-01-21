
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { LuSearch } from "react-icons/lu";

import useColors from '@/hooks/useColors'


import dynamic from 'next/dynamic'

const SearchInput = ({search,setSearch,placeholder="Search",size='lg'}) => {

    const {mainColor} = useColors();
    return (
        <InputGroup
          flex="1"
          startElement={<LuSearch />}
          
        >
          <Input placeholder={placeholder} size={size} _focus={{
              borderColor:mainColor,
              outline:mainColor
            }}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </InputGroup>
    )
}


export default dynamic(()=>Promise.resolve(SearchInput),{ssr:false})