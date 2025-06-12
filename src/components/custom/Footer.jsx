import LogoContainer from "@/app/login/LogoContainer";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useColorModeValue } from "../ui/color-mode";



const addressItems = [
    {
        label: process.env.NEXT_PUBLIC_CONTACT_MAP_LABEL,
        link: process.env.NEXT_PUBLIC_CONTACT_MAP_LINK
    }
];

const contactItems = [
    {
        label: process.env.NEXT_PUBLIC_CONTACT_NUMBER,
        link: `tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`
    },
    {
        label: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        link: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`
    }
]


const pagesList = [
    {
        label: 'Home',
        link: '/'
    },
    {
        label: 'Login',
        link: '/login'
    },
    // {
    //     label: 'Features',
    //     link: '/features'
    // },
    {
        label: 'Pricing',
        link: '/pricing'
    }
];


const productsList = [
{
        label: 'Instagram',
        link: '/instagram'
    },
    {
        label: 'Facebook',
        link: '/facebook'
    },
    {
        label: 'Whatsapp',
        link: '/whatsapp'
    }
]

const Footer = () => {
    return (
        <footer style={{ padding: '0px 0px' }}>
            <FooterHead />
            <FooterTail />
        </footer>
    );
}




const FooterHead = () => {
    return <Flex
        justifyContent={'space-between'}
        flexDir={'column'}
        md={{
            flexDirection: 'row'
        }}
    >
        <Flex
            flexDirection={'column'}
        >
            {/* <Box width={'200px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <LogoContainer />
            </Box> */}
            <Flex flexDir={'column'} padding={'20px 30px'} gap={10} alignItems={'flex-start'}>
                <FooterItems heading={'Address'} items={addressItems}/>
                <Flex flexDir={'column'} gap={2}>
                    <FooterItems heading={'Contact'} items={contactItems}/>
                </Flex>
            </Flex>
        </Flex>
        <Flex
            flexDirection={'column'}
            padding={'20px 30px'}
            gap={20}
            flexDir={'row'}
            alignItems={'center'}
        >
            <FooterItems heading={'Pages'} items={pagesList} />
            <FooterItems heading={'Products'} items={productsList}/>
        </Flex>
    </Flex>
}


const FooterItems = ({ heading, items }) => {
    return (
        <Flex flexDir={'column'} gap={2}>
            <Text fontSize="xl" fontWeight="medium" color={useColorModeValue('black', 'white')}>
                {heading}
            </Text>
            <Text fontSize="sm" color="gray.500">
                <Flex flexDir={'column'} gap={2} as={'span'}>
                    {
                        items && items.map((item, index) => (
                            <Link
                                href={item?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                style={{
                                    display: 'block',
                                }}
                            >
                                <Text 
                                    as={'span'}
                                    _hover={{
                                        color: useColorModeValue('black', 'white')
                                    }}
                                >
                                    {
                                        item?.label
                                    }
                                </Text>
                            </Link>
                        ))
                    }
                </Flex>
            </Text>
        </Flex>
    )
}

const FooterTail = () => {
    return <Flex
        justifyContent={'space-between'}
        fontSize="sm"
        padding={'8px 20px'}
        borderTop={'1px solid rgb(47, 47, 47)'}
        color={'gray.500'}
        flexDirection={'column'}

        md={{
            flexDirection: 'row'
        }}
    >
        <Box p={4} textAlign={'center'}>
            &copy; {new Date().getFullYear()} Xerobot. All rights reserved.
        </Box>
        <Flex
            p={4}
            justifyContent="space-between"
            maxWidth={'fit-content'}
            gap={5}
            sm={{
                justifyContent:'space-between',
                maxWidth:'100%',
            }}
        >
            <CustomLink href="/policy">Privacy Policy</CustomLink>
            <CustomLink href="/terms">Terms of Service</CustomLink>
            <CustomLink href="/cookie-policy">Cookie Policy</CustomLink>
        </Flex>
    </Flex>
}


const CustomLink = ({ href, children }) => {
    return (
        <Link
            href={href}
            style={{
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            {children}
        </Link>
    )
}
export default Footer;