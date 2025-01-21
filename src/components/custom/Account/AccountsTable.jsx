import { Table } from "@chakra-ui/react"
import AccountProfile from "./AccountProfile"
import AccountActions from "./AccountActions"
import AccountRemove from "../dailog/AccountRemove"
import { useState } from "react"

const AccountTable = () => {

  const [open,setOpen]= useState(false);

  const handleClick = (id) => {
    console.log(id)
  }

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
            {accounts.map((account) => (
              <Table.Row key={account.id}>
                <Table.Cell py={7} px={7}>
                  <AccountProfile user={{ ...account, email: account.userName }} />
                </Table.Cell>
                <Table.Cell>
                  {
                    account?.automations
                  }
                </Table.Cell>
                <Table.Cell>
                  <AccountActions
                    handleRemove={()=>setOpen(account.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  )
}

const accounts = [
  { id: 1, automations: 100000, userName: 'user_name', name: "John Mason", accountType: 'Youtube', avatar: "https://i.pravatar.cc/300?u=iu", },
  { id: 2, automations: 10, userName: 'user_name', name: "Coffee Maker", accountType: "Whatsapp", avatar: "https://i.pravatar.cc/300?u=iu", },
  { id: 3, automations: 10, userName: 'user_name', name: "Desk Chair", accountType: "Facebook", avatar: "https://i.pravatar.cc/300?u=iu", },
  { id: 4, automations: 10, userName: 'user_name', name: "Smartphone", accountType: "Instagram", avatar: "https://i.pravatar.cc/300?u=iu", },
  { id: 5, automations: 10, userName: 'user_name', name: "Headphones", accountType: "Instagram", avatar: "https://i.pravatar.cc/300?u=iu", },
]


export default AccountTable