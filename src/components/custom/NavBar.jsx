import React from 'react';
import NextLink from 'next/link';
import '@/styles/navBar.css'
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '../ui/color-mode';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Links = ['Home', 'About', 'Services', 'Contact'];

const NavLink = ({ children, href }) => (
  <NextLink href={href} passHref>
    <Button
      variant="ghost"
      px={3}
      py={2}
      color={'#ffff'}
      rounded="md"
      fontSize={18}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Button>
  </NextLink>
);

const Navbar = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('#0d9488', '#171717')} height={'fit-content'} px={5} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex justifyContent="center" alignItems={'center'} gap={3}fontWeight="bold" color="white">
          <Button className="nav-toggle-btn" onClick={() => open ? onClose() : onOpen()} variant="ghost">
            {open ? <X /> : <Menu />}
          </Button>
          <NextLink href="/">MyLogo</NextLink>
        </Flex>
        <HStack spacing={10} gap={10} alignItems="center" display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </HStack>
        <Flex alignItems="center" gap={3}>
          <NextLink href={'/login'}>
            <Button
                borderRadius={'20px'}
                fontSize={16}
                padding={'10px 20px'}
            >
              Get Started
            </Button>
          </NextLink>
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('rgba(0,0,0,0.1)', 'gray.700'),
            }}
            style={{ borderRadius: '50%', aspectRatio: '1/1' }}
          >
            {colorMode === 'light' ? <Moon color='#fff' /> : <Sun />}
          </Button>
        </Flex>
      </Flex>
      {
        open && <MobileItems Links={Links}/>
      }
    </Box>
  );
};


const MobileItems = ({Links}) => {
  return <Box pb={4} display={{ md: 'none' }}>
    <Stack as="nav" spacing={4}>
      {Links.map((link) => (
        <NavLink key={link} href={`/${link.toLowerCase()}`}>
          {link}
        </NavLink>
      ))}
    </Stack>
  </Box>
}

export default Navbar;
