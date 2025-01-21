'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode';

import {system} from './theme';
import { ThemeProvider } from 'next-themes';

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem} >
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      <ColorModeProvider {...props} />
      {/* </ThemeProvider> */}
    </ChakraProvider>
  )
}
