import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react"
import { defaultSystem } from "@chakra-ui/react"
const customConfig = defineConfig({
  ...defaultSystem,
  theme: {
    fonts: {
      heading: `'Montserrat', sans-serif`,
      body: `'Roboto', sans-serif`,
    },
  colors: {
    primary: {
      50: '#e0f7f4',
      100: '#b3e7de',
      200: '#80d7c8',
      300: '#4dc6b2',
      400: '#26b69c',
      500: '#0d9488', // Your main brand color
      600: '#0a766a',
      700: '#07594d',
      800: '#033c30',
      900: '#001f14',
    },
    accent: '#ff6b6b',
    secondary: '#1a202c',
    success: '#38a169',
    danger: '#e53e3e',
    warning: '#dd6b20',
    info: '#3182ce',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      sizes: {
        sm: {
          fontSize: '12px',
          px: 4,
          py: 2,
        },
        md: {
          fontSize: '16px',
          px: 6,
          py: 3,
        },
        lg: {
          fontSize: '20px',
          px: 8,
          py: 4,
        },
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          _focus: {
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px #0d9488',
          },
        },
      },
      sizes: {
        md: {
          field: {
            h: 12,
            fontSize: '16px',
            px: 4,
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            _hover: {
              borderColor: 'primary.500',
            },
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'lg',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
        },
        subtle: {
          bg: 'primary.50',
          color: 'primary.800',
        },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        fontSize: '16px',
        color: 'gray.800',
        bg: 'white',
        lineHeight: 'tall',
      },
      '*::placeholder': {
        color: 'gray.400',
      },
      '*, *::before, *::after': {
        borderColor: 'gray.200',
      },
      a: {
        color: 'primary.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
    colors: {
      brand: {
        500: "tomato",
      },
    },
  },
})

export const system = createSystem(defaultBaseConfig, customConfig)