import { Box, Flex, Heading, Text, Stack } from '@chakra-ui/react';

import NextLink from 'next/link';
import './hero.css'
import useColors from '@/hooks/useColors';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function HeroSection() {
  const { textUltraShadedDark,mainColor } = useColors();
  const [loading,setLoaidng] = useState(false);

  return (
    <Box
      as="section"
      position="relative"
      style={{ minHeight: 'calc(100dvh - 0px)' }}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      bgImage="url('./images/f6.jpeg')" // Replace with your image path
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="contain"
      backgroundRepeat={'repeat'}
      border={0}
      overflow={'hidden'}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.0)',
        zIndex: 0,
      }}
    >
      <Box
        position={'absolute'}
        top={0}
        borderRadius={'70%'}
        boxShadow={`0px 0px 0px red,0px 0px 0px red,0px 1px 1200px blue,0px 0px 0px red`}
        width={'100vw'}
        left={0}
        height={'100dvh'}
        zIndex={1}
        transform={"translateY(-100%)"}
      > </Box>
      <Flex
        position="relative"
        zIndex={1}
        maxW="container.xl"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={5}
        textAlign={'center'}
        py={20}
        px={2}
      >
        <Heading
          as="h1"
          size={{smDown:'3xl',sm:'4xl',md:'6xl'}}
          mb={6}
          maxWidth={1000}
          color={'#ffff'}
          className='heading'
        >
          Automate – The Smarter Way to Scale Your Social Media
        </Heading>
        <Text
          color={textUltraShadedDark}
          fontSize={{ base: 'md', md: 'lg' }}
          mb={8}
          maxW={700}
          fontFamily={'roboto'}
          className='text'
        >
          Transform the way you work with our cutting-edge automation solutions.
        </Text>
        <Stack direction="row" spacing={6} justify="center">
          <NextLink href="/login" passHref className='button'>
            <Button
              loading={loading}
              onClick={()=>setLoaidng(true)}
              colorScheme="teal"
              color={'#ffff'}
              size="lg"
              px={8}
              py={6}
              bg={mainColor}
              borderRadius={'4xl'}
              transition={'all .5s'}
              _hover={{ 
                borderRadius: 'xs',
                color:'black',
                bg:'#ffff'
              }}
            >
              Get Started
            </Button>
          </NextLink>
        </Stack>
      </Flex>
    </Box>
  );
}
