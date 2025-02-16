import { Flex, Table, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { sendGet } from "@/utils/sendRequest"
import { Spinner } from "@chakra-ui/react"
import CustomTable from "@/components/custom/CustomTable"
import DeleteDailog from "@/components/custom/dailog/DeleteDailog"
import handleDelete from "./actions/handleDelete"
import { Switch } from "@/components/ui/switch"
import useColors from "@/hooks/useColors"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CustomButtom from "@/components/custom/CustomButton"
import { MdOutlineDeleteOutline } from "react-icons/md"
import handleStatus from "./actions/handleStatus"
import { toastError } from "@/components/custom/toast"


const AutomationTable = ({ search = '', handleOpen }) => {

  const [open, setOpen] = useState(false);
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { mainColor, textDark } = useColors()

  const handleClick = async (id, action) => {
    let res = {}
    if (action === 'DELETE') {
      setDeleteLoading(true);
      res = await handleDelete(id);
      setDeleteLoading(false);
      setOpen(false);
      if (res?.success) {
        setAutomations([...automations?.filter(item => item?._id != id)]);
      }
    } else if (action === 'STATUS') {
      res = await handleStatus(id);
      if(res?.success){
        setAutomations([...automations?.map(item => {
          if(item?._id === id){
            item.isLive = !item.isLive;
          }
          return item;
        })])
      }
    }

    if (!res?.success) {
      toastError(res?.message || "Something went wrong");
      return;
    }
  }

  const getAutomationDetails = async () => {
    const automationDetails = await sendGet({ url: `/api/automations?search=${search}` });

    if (automationDetails?.success) {
      setAutomations(automationDetails?.automations);
    } else {
      toastError(automationDetails?.message || 'Something went wrong');
    }

    setLoading(false);
  }

  useEffect(() => {
    getAutomationDetails();
  }, []);


  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(getAutomationDetails, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <>
      <DeleteDailog
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
        deleteLoading={deleteLoading}
      >
        <Text>Do you want to delete automation ?</Text>
      </DeleteDailog>
      {
        <CustomTable headings={['Automation Name', 'Automation Trigger', "Automation Type",'Success Rate', 'Status', 'Actions']}>
          {
            automations?.map(automation => <TableRow key={automation?._id} automation={automation} handleClick={handleClick} setOpen={setOpen} />)
          }
        </CustomTable>
      }
      {
        loading && <Flex justifyContent={'center'} mt={20}>
          <Spinner size="md" />
        </Flex>
      }
      {
        !loading && automations?.length <= 0 && <Flex justifyContent={'center'} mt={20}>
          <Button bg={mainColor} color={textDark} onClick={handleOpen}><Plus />Create Automation</Button>
        </Flex>
      }
    </>
  )
}

const TableRow = ({ automation, setOpen, handleClick }) => {

  console.log(automation)

  const { name, receivedCount, respondedCount, trigger, _id: id, isLive,type } = automation;
  return <Table.Row paddingBlock={10}>
    <Table.Cell textAlign={'center'}>
      <CustomText>{name || 'Automation'}</CustomText>
    </Table.Cell>
    <Table.Cell textAlign={'center'}>
      <CustomText>{trigger || 'Link'}</CustomText>
    </Table.Cell>
    <Table.Cell textAlign={'center'}>
      <CustomText>{
        type==='reply-comment'?'Reply comment':
        type==='dm-comment'?"Comment DM":
        type==='blend-comment'?"Blend Comment":'Not selected'
      }</CustomText>
    </Table.Cell>
    <Table.Cell textAlign={'center'}>
      <CustomText>
        {`${(Math.floor((100 * respondedCount) / receivedCount) || 0)}%`}
      </CustomText>
    </Table.Cell>
    <Table.Cell textAlign={'center'}>
      <CustomText>
        <Switch checked={isLive} onChange={() => handleClick(id, "STATUS")} />
      </CustomText>
    </Table.Cell>
    <Table.Cell textAlign={'center'}>
      <CustomButtom onClick={() => setOpen(id)} Icon={MdOutlineDeleteOutline} title={'Remove Automation'} textColor={'red'} />
    </Table.Cell>
  </Table.Row>
}


const CustomText = ({ children = '' }) => {
  return <Text p={5} pl={7} fontSize={'md'}>{children}</Text>
}


export default AutomationTable