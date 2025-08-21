import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Animated, PanGestureHandler, State } from 'react-native'
import { styled } from '@tamagui/core'

const WheelContainer = styled(View, {
  width: 300,
  height: 300,
  justifyContent: 'center',
  alignItems: 'center',
})

const Wheel = styled(Animated.View, {
  width: 280,
  height: 280,
  borderRadius: 140,
  borderWidth: 8,
  borderColor: '$blue10',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
})

const SportOption = styled(View, {
  position: 'absolute',
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '$blue10',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})

const SportText = styled(Text, {
  color: 'white',
  fontSize: 12,
  fontWeight: '600',
  textAlign: 'center',
})

interface Sport {
  id: string
  name: string
  icon: string
  color: string
}

interface OnboardingWheelProps {
  sports: Sport[]
  onSportSelect: (sport: Sport) => void
  selectedSports: string[]
}

export const OnboardingWheel: React.FC<OnboardingWheelProps> = ({
  sports,
  onSportSelect,
  selectedSports,
}) => {
  const [rotation] = useState(new Animated.Value(0))
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null)
  const panRef = useRef(null)

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: rotation } }],
    { useNativeDriver: true }
  )

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent
      const rotationValue = translationX / 50
      
      Animated.spring(rotation, {
        toValue: rotationValue,
        useNativeDriver: true,
      }).start()

      // Calculate which sport is at the top
      const sportIndex = Math.round(rotationValue / (360 / sports.length)) % sports.length
      const sport = sports[sportIndex]
      setSelectedSport(sport)
    }
  }

  const renderSportOptions = () => {
    return sports.map((sport, index) => {
      const angle = (360 / sports.length) * index
      const radius = 120
      const x = Math.cos((angle * Math.PI) / 180) * radius
      const y = Math.sin((angle * Math.PI) / 180) * radius

      const isSelected = selectedSports.includes(sport.id)

      return (
        <Animated.View
          key={sport.id}
          style={{
            position: 'absolute',
            left: 140 + x - 40,
            top: 140 + y - 40,
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [-360, 360],
                  outputRange: [`${-360}deg`, `${360}deg`],
                }),
              },
            ],
          }}
        >
          <SportOption
            backgroundColor={isSelected ? '$green10' : '$blue10'}
            onTouchEnd={() => onSportSelect(sport)}
          >
            <SportText>{sport.icon}</SportText>
            <SportText>{sport.name}</SportText>
          </SportOption>
        </Animated.View>
      )
    })
  }

  return (
    <WheelContainer>
      <PanGestureHandler
        ref={panRef}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Wheel>
          {renderSportOptions()}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 50 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
              {selectedSport ? selectedSport.name : 'Select Sport'}
            </Text>
          </View>
        </Wheel>
      </PanGestureHandler>
    </WheelContainer>
  )
}
