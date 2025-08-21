import { styled } from '@tamagui/core'
import { View } from 'react-native'

export const Card = styled(View, {
  backgroundColor: 'white',
  borderRadius: '$4',
  padding: '$4',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 5,
  
  variants: {
    size: {
      small: { padding: '$2' },
      large: { padding: '$6' }
    },
    variant: {
      elevated: {
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$gray5',
        shadowOpacity: 0,
        elevation: 0,
      }
    }
  },
  
  defaultVariants: {
    size: 'medium',
    variant: 'default'
  }
})
