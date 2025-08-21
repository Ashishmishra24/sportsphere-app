import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { styled } from '@tamagui/core'

const SpinnerContainer = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

const SpinnerText = styled(Text, {
  marginTop: '$2',
  fontSize: '$3',
  color: '$gray11',
  fontWeight: '500',
})

interface LoadingSpinnerProps {
  size?: 'small' | 'large'
  text?: string
  fullScreen?: boolean
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  text = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const spinner = (
    <SpinnerContainer className={className}>
      <ActivityIndicator 
        size={size} 
        color="#3b82f6" 
      />
      {text && (
        <SpinnerText>{text}</SpinnerText>
      )}
    </SpinnerContainer>
  )

  if (fullScreen) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f8fafc'
      }}>
        {spinner}
      </View>
    )
  }

  return spinner
}
