import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { 
  OnboardingWheel, 
  Button, 
  Card, 
  YStack, 
  XStack, 
  H1, 
  Paragraph,
  Input 
} from '@sportsphere/ui'

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
}

const sports = [
  { id: 'cricket', name: 'Cricket', icon: '🏏', color: '#3B82F6' },
  { id: 'football', name: 'Football', icon: '⚽', color: '#10B981' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', color: '#F59E0B' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: '#EF4444' },
  { id: 'hockey', name: 'Hockey', icon: '🏒', color: '#8B5CF6' },
  { id: 'baseball', name: 'Baseball', icon: '⚾', color: '#06B6D4' },
]

export default function OnboardingScreen() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [userData, setUserData] = useState({
    name: '',
    location: '',
    skillLevel: 'beginner',
    goals: '',
  })

  const handleSportSelect = (sport: any) => {
    if (selectedSports.includes(sport.id)) {
      setSelectedSports(selectedSports.filter(id => id !== sport.id))
    } else {
      setSelectedSports([...selectedSports, sport.id])
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      router.replace('/home')
    }
  }

  const handleSkip = () => {
    router.replace('/home')
  }

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to SportSphere',
      description: 'Your ultimate sports community platform',
      component: (
        <YStack space="$6" alignItems="center">
          <H1 textAlign="center">🏆</H1>
          <H1 textAlign="center">Welcome to SportSphere</H1>
          <Paragraph textAlign="center" size="$5">
            Connect, compete, and celebrate sports together. Join the ultimate sports community where every game matters.
          </Paragraph>
          <Card size="large">
            <YStack space="$4">
              <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                What you'll discover:
              </Text>
              <YStack space="$2">
                <Text>• Live scores and real-time updates</Text>
                <Text>• Find players and teams nearby</Text>
                <Text>• Join sport-specific communities</Text>
                <Text>• Track your performance and progress</Text>
              </YStack>
            </YStack>
          </Card>
        </YStack>
      )
    },
    {
      id: 'sports',
      title: 'Choose Your Sports',
      description: 'Select the sports you love to play and follow',
      component: (
        <YStack space="$6" alignItems="center">
          <H1 textAlign="center">Choose Your Sports</H1>
          <Paragraph textAlign="center">
            Select the sports you love to play and follow. You can always change this later.
          </Paragraph>
          <OnboardingWheel
            sports={sports}
            onSportSelect={handleSportSelect}
            selectedSports={selectedSports}
          />
          <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
            Selected: {selectedSports.length} sports
          </Text>
        </YStack>
      )
    },
    {
      id: 'profile',
      title: 'Tell Us About Yourself',
      description: 'Help us personalize your experience',
      component: (
        <YStack space="$6">
          <H1 textAlign="center">Tell Us About Yourself</H1>
          <YStack space="$4">
            <Input
              placeholder="Your name"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            <Input
              placeholder="Your location (city)"
              value={userData.location}
              onChangeText={(text) => setUserData({ ...userData, location: text })}
            />
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                Skill Level
              </Text>
              <XStack space="$2">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setUserData({ ...userData, skillLevel: level })}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: userData.skillLevel === level ? '#3B82F6' : '#F3F4F6',
                    }}
                  >
                    <Text
                      style={{
                        color: userData.skillLevel === level ? 'white' : '#374151',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                      }}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </XStack>
            </View>
            <Input
              placeholder="What are your sports goals? (optional)"
              value={userData.goals}
              onChangeText={(text) => setUserData({ ...userData, goals: text })}
              multiline
            />
          </YStack>
        </YStack>
      )
    },
    {
      id: 'communities',
      title: 'Join Communities',
      description: 'Connect with fellow sports enthusiasts',
      component: (
        <YStack space="$6">
          <H1 textAlign="center">Join Communities</H1>
          <Paragraph textAlign="center">
            Connect with fellow sports enthusiasts in your area and around the world.
          </Paragraph>
          <YStack space="$4">
            {selectedSports.map((sportId) => {
              const sport = sports.find(s => s.id === sportId)
              return (
                <Card key={sportId}>
                  <XStack space="$3" alignItems="center">
                    <Text style={{ fontSize: 24 }}>{sport?.icon}</Text>
                    <YStack flex={1}>
                      <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        {sport?.name} Community
                      </Text>
                      <Text style={{ fontSize: 14, color: '#6B7280' }}>
                        Connect with {sport?.name.toLowerCase()} players
                      </Text>
                    </YStack>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: '#3B82F6',
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: '600' }}>Join</Text>
                    </TouchableOpacity>
                  </XStack>
                </Card>
              )
            })}
          </YStack>
        </YStack>
      )
    },
    {
      id: 'ready',
      title: "You're All Set!",
      description: 'Welcome to the SportSphere community',
      component: (
        <YStack space="$6" alignItems="center">
          <Text style={{ fontSize: 64 }}>🎉</Text>
          <H1 textAlign="center">You're All Set!</H1>
          <Paragraph textAlign="center" size="$5">
            Welcome to the SportSphere community. Start exploring, connecting, and playing!
          </Paragraph>
          <Card size="large">
            <YStack space="$4">
              <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                What's next?
              </Text>
              <YStack space="$2">
                <Text>• Explore live matches and scores</Text>
                <Text>• Find players and teams nearby</Text>
                <Text>• Join your first community</Text>
                <Text>• Create or join your first match</Text>
              </YStack>
            </YStack>
          </Card>
        </YStack>
      )
    }
  ]

  const currentStepData = steps[currentStep]

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          padding: 20,
          justifyContent: 'center'
        }}
      >
        {currentStepData.component}
      </ScrollView>
      
      <View style={{ padding: 20, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
        <YStack space="$3">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Step {currentStep + 1} of {steps.length}
            </Text>
            {currentStep < steps.length - 1 && (
              <TouchableOpacity onPress={handleSkip}>
                <Text style={{ fontSize: 14, color: '#3B82F6' }}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {currentStep > 0 && (
              <Button
                onPress={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                size="large"
              >
                Back
              </Button>
            )}
            
            <Button
              onPress={handleNext}
              size="large"
              style={{ flex: 1, marginLeft: currentStep > 0 ? 12 : 0 }}
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </View>
        </YStack>
      </View>
    </View>
  )
}
