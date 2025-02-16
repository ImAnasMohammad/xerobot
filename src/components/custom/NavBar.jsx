import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import '@/styles/navBar.css';
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
import Logo from './Logo';

const Links = ['Home', 'About', 'Services', 'Contact'];

const NavLink = ({ children, href }) => (
  <NextLink href={href} passHref>
    <Button
      variant="ghost"
      px={3}
      py={2}
      color="white"
      rounded="md"
      fontSize={{ base: '16px', md: '18px' }}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const normalBg = useColorModeValue('transperant', 'transperant');
  const scrolledBg = useColorModeValue('#09090b', '#09090b');
  const bgColor = scrolled ? scrolledBg : normalBg;

  return (
    <Box
      bg={bgColor}
      px={5}
      py={2}
      position="fixed"
      top="0"
      zIndex="1000"
      width={'100%'}
      transition="background-color 0.3s ease"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" py={10}>
        {/* Logo & Mobile Menu Toggle */}
        <Flex alignItems="center" gap={3} fontWeight="bold" color="white">
          {/* <Button
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            display={{ base: 'block', md: 'none' }}
          >
            {isOpen ? <X /> : <Menu />}
          </Button> */}
          <NextLink href="/" passHref>
            <Logo />
          </NextLink>
        </Flex>

        {/* Desktop Navigation */}
        {/* <HStack gap={16} alignItems="center" display={{ base: 'none', md: 'flex' }} bg="rgba(0,0,0,0.3)" px={5} py={2} borderRadius={'3xl'}>
          {Links.map((link) => (
            <NavLink key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </HStack> */}

        {/* Action Buttons */}
        <Flex alignItems="center" gap={3}>
          <NextLink href="/login" passHref>
            <Button borderRadius="20px" fontSize="16px" px={6} py={2}>
              Get Started
            </Button>
          </NextLink>
          {/* <Button
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('rgba(0,0,0,0.1)', 'gray.700'),
            }}
            borderRadius="full"
            w={10}
            h={10}
          >
            {colorMode === 'light' ? <Moon color="#fff" /> : <Sun />}
          </Button> */}
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      {/* {isOpen && <MobileItems Links={Links} />} */}
    </Box>
  );
};

const MobileItems = ({ Links }) => {
  return (
    <Box pb={4} display={{ md: 'none' }}>
      <Stack as="nav" spacing={4}>
        {Links.map((link) => (
          <NavLink key={link} href={`/${link.toLowerCase()}`}>
            {link}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;
