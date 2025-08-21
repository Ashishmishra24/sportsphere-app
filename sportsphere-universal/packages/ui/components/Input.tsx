import { styled } from '@tamagui/core'
import { TextInput } from 'react-native'

export const Input = styled(TextInput, {
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: '$gray8',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  fontSize: '$4',
  color: '$gray12',
  
  placeholderTextColor: '$gray9',
  
  focusStyle: {
    borderColor: '$blue10',
    borderWidth: 2,
  },
  
  variants: {
    size: {
      small: { 
        paddingHorizontal: '$2', 
        paddingVertical: '$1',
        fontSize: '$3'
      },
      large: { 
        paddingHorizontal: '$4', 
        paddingVertical: '$3',
        fontSize: '$5'
      }
    },
    variant: {
      error: {
        borderColor: '$red10',
        focusStyle: {
          borderColor: '$red11',
        }
      },
      success: {
        borderColor: '$green10',
        focusStyle: {
          borderColor: '$green11',
        }
      }
    }
  },
  
  defaultVariants: {
    size: 'medium',
    variant: 'default'
  }
})
