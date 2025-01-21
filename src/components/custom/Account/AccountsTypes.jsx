import { Icon, SimpleGrid, Text } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardRoot,
} from "@/components/ui/radio-card"
import YoutubeIcon from "../icons/YoutubeIcon"
import InstagramIcon from "../icons/InstagramIcon"
import FaceBookIcon from "../icons/FaceBookIcon"
import WhatsappIcon from "../icons/WhatsappIcon"

const AccountsTypes = ({ value, setValue,loading=false }) => {

  return (
    <RadioCardRoot orientation="vertical" align="center" defaultValue="next" value={value} onChange={(e) => setValue(e.target.value)}>
      <SimpleGrid
        columns={{ base: 3, sm: 2, md: 3 }}
        gap={4}
      >
        {items.map((item) => (
          <RadioCardItem
            icon={
              <Icon fontSize="5xl" color="fg.muted" mb="1">
                {item.icon}
              </Icon>
            }
            label={<Text as="div" pb={5} textStyle={'xl'}>{item.title}</Text>}
            key={item.value}
            value={item.value}
            style={{cursor:!loading && 'pointer'}}
            disabled={loading}

          />
        ))}
      </SimpleGrid>
    </RadioCardRoot>
  )
}

const items = [
  {
    icon: <FaceBookIcon/>, value: "Facebook", title: "Facebook"
  },
  {
    icon: <InstagramIcon/>, value: "Instagram", title: "Instagram"
  },
  {
    icon: <YoutubeIcon/>, value: "Youtube", title: "Youtube"
  },
  {
    icon: <WhatsappIcon/>, value: "Whatsapp", title: "Whatsapp"
  },
]


export default AccountsTypes