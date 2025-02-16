import PageHeading from '@/components/custom/PageHeading'
import SearchInput from '@/components/custom/SearchInput'
import useColors from '@/hooks/useColors'
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

const HeadingWithSearch = ({search,setSearch,btnLabel='',handleClick,path,heading,searchPlaceholder='Search Automation'}) => {
    const {mainColor,textDark,} = useColors()
    return (
        <>
            <PageHeading path={path}>{heading}</PageHeading>
            <Flex py={10} gap={7}>
            <SearchInput placeholder={searchPlaceholder} seach={search} setSearch={setSearch}/>
            {
                btnLabel && <Button bg={mainColor} color={textDark} fontSize={'md'} fontWeight={'lighter'} onClick={handleClick}>
                    {btnLabel}
                </Button>
            }
            
            </Flex>
        </>
    )
}

export default HeadingWithSearch