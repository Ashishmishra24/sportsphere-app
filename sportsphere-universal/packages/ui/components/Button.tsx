import { Button as TamaguiButton, styled } from '@tamagui/core'
import { Platform } from 'react-native'

export const Button = styled(TamaguiButton, {
  backgroundColor: '$blue10',
  borderRadius: '$4',
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  color: 'white',
  fontSize: '$4',
  fontWeight: '600',
  alignItems: 'center',
  justifyContent: 'center',
  
  pressStyle: {
    backgroundColor: '$blue11',
    scale: 0.95,
  },
  
  variants: {
    size: {
      small: { 
        paddingHorizontal: '$2', 
        paddingVertical: '$1',
        fontSize: '$3'
      },
      large: { 
        paddingHorizontal: '$6', 
        paddingVertical: '$3',
        fontSize: '$5'
      }
    },
    variant: {
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$blue10',
        color: '$blue10',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$blue10',
      },
      secondary: {
        backgroundColor: '$gray5',
        color: '$gray12',
      }
    }
  },
  
  defaultVariants: {
    size: 'medium',
    variant: 'solid'
  }
})
