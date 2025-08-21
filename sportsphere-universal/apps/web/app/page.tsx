'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@sportsphere/api'
import { Button, Card, YStack, XStack, H1, Paragraph } from '@sportsphere/ui'
import { LoadingSpinner } from '@sportsphere/ui'

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/auth')
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <LoadingSpinner size="large" text="Loading SportSphere..." />
      </div>
    )
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
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
    </div>
  )
}
