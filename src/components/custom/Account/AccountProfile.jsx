import { Float, HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import YoutubeIcon from "../icons/YoutubeIcon";
import FaceBookIcon from "../icons/FaceBookIcon";
import WhatsappIcon from "../icons/WhatsappIcon";
import InstagramIcon from "../icons/InstagramIcon";

const AccountProfile = ({user}) => {
  const {accountType} = user;

  const AccountIcon = accountType ==='Youtube'?YoutubeIcon:
                      accountType ==='Facebook'?FaceBookIcon:
                      accountType ==='Whatsapp'?WhatsappIcon:InstagramIcon

  
  return (
        <HStack key={user?.name} gap="4">
          <Avatar name={user?.name} size="lg"  src={user.profile}>
          <Float placement="bottom-end" offsetX="2" offsetY="2">
            <AccountIcon height={16}/>
          </Float>
          </Avatar>
          <Stack gap="0">
            <Text
              fontWeight="medium"
              width={'100px'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}

            >{user?.name}</Text>
          </Stack>
        </HStack>
  )
}



export default AccountProfile