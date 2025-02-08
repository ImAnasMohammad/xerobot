import { Table } from '@chakra-ui/react'
import React from 'react'

const CustomTable = ({headings=[],children}) => {
  return (<Table.ScrollArea borderWidth="1px" borderLeft={'0px'} borderRight={'0px'} maxW="full">
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row fontSize={'lg'}>
          {
            headings?.map(item=><Table.ColumnHeader key={item} py={5} textAlign={'center'}>{item}</Table.ColumnHeader>)
          }
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          children
        }
        
      </Table.Body>
    </Table.Root>
  </Table.ScrollArea>
  )
}

export default CustomTable