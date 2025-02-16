import { FormatNumber, Stat } from "@chakra-ui/react"
import { InfoTip } from "../ui/toggle-tip"

const CustomStat = ({
    label='Heading',
    isFormatNumber=false,
    value=0,
    currency="IND",
    helperText='',
    info='',
}) => {
  return (
    <Stat.Root>
      <Stat.Label fontSize={'lg'}>
        {label}
        {
            info && <InfoTip>{info}</InfoTip>
        }
      </Stat.Label>
      <Stat.ValueText fontSize={'3xl'}>
        {
            isFormatNumber && <FormatNumber value={value} style="currency" currency={currency} />
        }
        {
            !isFormatNumber && value
        }
      </Stat.ValueText>
      {
        helperText && <Stat.HelpText mb="2">{helperText}</Stat.HelpText>
      }
    </Stat.Root>
  )
}

export default CustomStat
