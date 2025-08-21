import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { styled } from '@tamagui/core'

const FABContainer = styled(View, {
  position: 'absolute',
  bottom: 20,
  right: 20,
  zIndex: 1000,
})

const MainFAB = styled(TouchableOpacity, {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '$blue10',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
})

const FABIcon = styled(Text, {
  fontSize: 24,
  color: 'white',
})

const ActionButton = styled(Animated.View, {
  position: 'absolute',
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
})

const ActionIcon = styled(Text, {
  fontSize: 20,
})

const ActionLabel = styled(Text, {
  position: 'absolute',
  right: 60,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
  fontSize: 12,
  fontWeight: '500',
})

interface FABAction {
  id: string
  icon: string
  label: string
  onPress: () => void
  color?: string
}

interface FloatingActionButtonProps {
  actions: FABAction[]
  context?: 'home' | 'match' | 'team' | 'community'
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions,
  context = 'home',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [animation] = useState(new Animated.Value(0))

  const getMainIcon = () => {
    switch (context) {
      case 'match':
        return '⚽'
      case 'team':
        return '👥'
      case 'community':
        return '💬'
      default:
        return '+'
    }
  }

  const toggleFAB = () => {
    const toValue = isOpen ? 0 : 1
    setIsOpen(!isOpen)

    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
    }).start()
  }

  const renderActionButton = (action: FABAction, index: number) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(index + 1) * 60],
    })

    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    return (
      <ActionButton
        key={action.id}
        style={{
          transform: [{ translateY }, { scale }],
          opacity,
          backgroundColor: action.color || 'white',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            action.onPress()
            toggleFAB()
          }}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <ActionIcon>{action.icon}</ActionIcon>
        </TouchableOpacity>
        <ActionLabel>{action.label}</ActionLabel>
      </ActionButton>
    )
  }

  return (
    <FABContainer>
      {actions.map((action, index) => renderActionButton(action, index))}
      <MainFAB onPress={toggleFAB}>
        <FABIcon>{getMainIcon()}</FABIcon>
      </MainFAB>
    </FABContainer>
  )
}
