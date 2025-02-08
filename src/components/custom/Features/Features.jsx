
import { Box, Card, For, Stack, Text } from "@chakra-ui/react"

import Link from "next/link"
import { MdOutlineDashboard } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"
import { FiMessageSquare } from "react-icons/fi"

const Features = () => {

    const features = [
        {
            heading:"Automated Comment",
            description:"Effortlessly manage and respond to comments in real time. Save time by automating your comment interactions. Increase engagement and keep the conversation flowing, even while you’re away",
            href:'',
            icon:<FaRegComment/>,
        },
        {
            heading:"Automated Messages",
            description:"Deliver personalized responses instantly with smart messaging. Automate direct messages to greet new followers, respond to inquiries, or promote your services—all tailored to your audience.",
            href:'',
            icon:<FiMessageSquare/>,
        },
        {
            heading:" Analytics Dashboard",
            description:"Track your performance with powerful, real-time insights. Monitor key metrics, identify trends, and make data-driven decisions to grow your social media presence like a pro.",
            href:'',
            icon:<MdOutlineDashboard/>
        },
    ]

    return (
        <Box maxWidth={'1200px'} mx={'auto'} pb={10}>
            <Text fontSize={'5xl'} textAlign={'center'} mb={'10'}>Features</Text>
            <Stack direction="row" wrap="wrap" justifyContent={'space-between'}>
                <For each={features}>
                    {(feature) => (
                    <Card.Root width="320px" variant={"elevated"} key={feature.heading}>
                        <Card.Body gap="2">
                            <Text fontSize={'6xl'} mb={'6'}>
                                {
                                    feature.icon
                                }
                            </Text>
                            <Card.Title mb="2" fontSize={'2xl'} fontFamily={'roboto'}>{feature.heading}</Card.Title>
                            <Card.Description fontSize={'md'} fontFamily={'roboto'}>
                                {feature.description}
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer color={'blue.400'}>
                            <Link href={feature.href}>Read More</Link>
                        </Card.Footer>
                    </Card.Root>
                    )}
                </For>
            </Stack>
        </Box>
    )
}


export default Features