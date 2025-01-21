'use client'
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Box, Flex,  Text, VStack, Button } from '@chakra-ui/react';
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
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const {mainColor,bgShadedDark}= useColors()
    const [isExpanded, setIsExpanded] = useState(false);
    const bgColor = useColorModeValue('#0d9488', bgShadedDark); // Using the primary color specified
    const textColor = useColorModeValue('white', 'gray.200');

    const [activeLink, setActiveLink] = useState("");
    const pathName = usePathname();

    const handleRedirect = ()=>{
        setIsExpanded(false);
    }

    useEffect(() => {
        setActiveLink(pathName.split('/')[2] ?? 'dashboard');
    }, [pathName]);


    const navItems = [
        { href:"/dashboard",label: 'Dashboard', Icon: Home },
        { href:"/dashboard/accounts",label: 'Accounts', Icon: User },
        // { href:"/dashboard/templates",label: 'Templates', Icon: LayoutTemplate},
        { href:"/dashboard/automations",label: 'Automations', Icon: Workflow},
        // { href:"/dashboard/messages",label: 'Messages', Icon: MessageSquare },
        // { href:"/dashboard/analytics",label: 'Analytics', Icon: BarChart2 },
        { href:"/dashboard/settings",label: 'Settings', Icon: Settings },
        { href:"/dashboard/logout",label: 'Logout', Icon: LogOut },
    ];

    return (
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
                navItems.map(({ Icon, label,href }) => (
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
                            <Text as={'span'} transition={'.35s opacity'} opacity={isExpanded?1:0} fontSize="lg">{label}</Text>
                        </Flex>
                    </NextLink>
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;


  