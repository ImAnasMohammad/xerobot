'use client'
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Box, Flex, Text, VStack, HStack, Button, Spinner } from '@chakra-ui/react';
import {
    Home,
    User,
    MessageSquare,
    BarChart2,
    Settings,
    LogOut,
    Menu,
    LayoutTemplate,
    Workflow
} from 'lucide-react';

import { useColorModeValue } from '../ui/color-mode';
import useColors from '@/hooks/useColors';
import { usePathname, useRouter } from 'next/navigation';
import {
    DialogBody,
    DialogContent,
    DialogRoot,
} from "@/components/ui/dialog"
import { toast } from 'react-toastify';
import { sendGet } from '@/utils/sendRequest';

const Sidebar = () => {
    const { mainColor, bgShadedDark } = useColors()
    const [isExpanded, setIsExpanded] = useState(false);
    const bgColor = useColorModeValue('#0d9488', bgShadedDark); // Using the primary color specified
    const textColor = useColorModeValue('white', 'gray.200');
    const [loading, setLoading] = useState(false);

    const [activeLink, setActiveLink] = useState("");
    const pathName = usePathname();
    const router = useRouter();

    const logout = async () => {
        setLoading(true)
        try {
            const res = await sendGet({ url: `/api/logout` });
            console.log(res)
            if (res?.success) {
                router.push('/')
            } else {
                toast.error('Unable to logout.');
            }
        } catch (err) {
            console.log(err)
            toast.error('Unable to logout.');

        } finally {
            setLoading(false)
        }

    }

    const handleRedirect = () => {
        setIsExpanded(false);
    }

    useEffect(() => {
        setActiveLink(pathName.split('/')[2] ?? 'dashboard');
    }, [pathName]);


    const navItems = [
        { href: "/dashboard", label: 'Dashboard', Icon: Home },
        { href: "/dashboard/accounts", label: 'Accounts', Icon: User },
        // { href:"/dashboard/templates",label: 'Templates', Icon: LayoutTemplate},
        { href: "/dashboard/automations", label: 'Automations', Icon: Workflow },
        // { href:"/dashboard/messages",label: 'Messages', Icon: MessageSquare },
        // { href:"/dashboard/analytics",label: 'Analytics', Icon: BarChart2 },
        // { href:"/dashboard/settings",label: 'Settings', Icon: Settings },
        // { href: "/dashboard/logout", label: 'Logout', Icon: LogOut },
    ];

    return (
        <>
            <LogoutDailog open={loading} />
            <Box
                as="nav"
                pos="fixed"
                left="0"
                top="0"
                h="100dvh"
                w={isExpanded ? "250px" : "80px"}
                bg={bgColor}
                p={4}
                color={textColor}
                boxShadow="lg"
                transition="width 0.3s ease"
                zIndex={2}
            >
                <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    bg={'transparent'}
                    mb={6}
                    color={useColorModeValue('#000', '#ffff')}
                    _hover={{ bg: useColorModeValue('red', 'gray.700') }}
                >
                    <Menu />
                </Button>
                <VStack spacing={4} align="stretch">
                    {
                        navItems.map(({ Icon, label, href }) => (
                            <NextLink key={label} onClick={handleRedirect} href={href} >
                                <Flex
                                    align="center"
                                    p={3}
                                    borderRadius="md"
                                    color={activeLink === label.toLowerCase() && mainColor}
                                    _hover={{ color: mainColor }}
                                    cursor="pointer"
                                    gap={2}
                                    alignItems={'center'}
                                    overflow={'hidden'}
                                >
                                    <Box>
                                        <Icon as={Icon} height={'fit-content'} boxsize={16} />
                                    </Box>
                                    <Text as={'span'} transition={'.35s opacity'} opacity={isExpanded ? 1 : 0} fontSize="lg">{label}</Text>
                                </Flex>
                            </NextLink>
                        ))
                    }
                    <LogoutButton Icon={LogOut} handleClick={logout} isExpanded={isExpanded} />
                </VStack>
            </Box>
        </>
    );
};


const LogoutButton = ({ handleClick, Icon, isExpanded }) => {
    const { mainColor } = useColors();

    return <Button onClick={handleClick} p={0} justifyContent={'left'} width={'fit-content'} maxW={'100%'} variant={'plain'} _hover={{ color: mainColor }}>
        <Flex
            align="center"
            p={3}
            borderRadius="md"
            cursor="pointer"
            gap={2}
            alignItems={'center'}
            overflow={'hidden'}
        >
            <Box>
                <Icon as={Icon} height={'fit-content'} boxsize={16} />
            </Box>
            <Text as={'span'} transition={'.35s opacity'} opacity={isExpanded ? 1 : 0} fontSize="lg">Logout</Text>
        </Flex>
    </Button>
}





const LogoutDailog = ({ open }) => {
    return (
        <HStack wrap="wrap" gap="4">
            <DialogRoot
                placement={"center"}
                motionPreset="slide-in-bottom"
                open={open}
                size={'xs'}
            >
                <DialogContent>
                    <DialogBody display={'flex'} flexDirection={'column'} alignItems={'center'} gap={10} padding={10} py={20} >
                        <Spinner />
                        <Text fontSize={'lg'}>Loggingout...</Text>
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </HStack>
    )
}


export default Sidebar;


