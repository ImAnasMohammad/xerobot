'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NextNProgress from "react-top-loading-bar";
import useColors from './hooks/useColors';

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem} >
      {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
      <ColorModeProvider {...props} />
      {/* </ThemeProvider> */}
    </ChakraProvider>
  )
}


export function LoadingProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const {mainColor} = useColors();

  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <NextNProgress
        color={mainColor}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
        options={{ showSpinner: false }}
      />
      {children}
    </>
  );
}