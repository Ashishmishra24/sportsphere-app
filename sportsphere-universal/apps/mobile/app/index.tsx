import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@sportsphere/api'
import { Button, Card, YStack, XStack, H1, Paragraph } from '@sportsphere/ui'
import { LoadingSpinner } from '@sportsphere/ui'

export default function Index() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Check if user has completed onboarding
        if (hasCompletedOnboarding) {
          router.replace('/home')
        } else {
          router.replace('/onboarding')
        }
      } else {
        router.replace('/auth')
      }
    }
  }, [user, isLoading, hasCompletedOnboarding, router])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingSpinner size="large" text="Loading SportSphere..." />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Card size="large">
        <YStack space="$4" alignItems="center">
          <H1>Welcome to SportSphere</H1>
          <Paragraph textAlign="center">
            Your ultimate sports community platform
          </Paragraph>
          <XStack space="$3">
            <Button
              onPress={() => router.push('/auth')}
              size="large"
            >
              Get Started
            </Button>
          </XStack>
        </YStack>
      </Card>
    </View>
  )
}
