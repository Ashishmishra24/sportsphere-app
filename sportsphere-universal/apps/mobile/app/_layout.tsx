import { Stack } from 'expo-router'
import { TamaguiProvider } from '@tamagui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@sportsphere/ui'
import { AuthProvider } from '@sportsphere/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f8fafc',
              },
              headerTintColor: '#1e293b',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'SportSphere',
              }}
            />
            <Stack.Screen
              name="onboarding"
              options={{
                title: 'Welcome to SportSphere',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="auth"
              options={{
                title: 'Authentication',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              options={{
                title: 'Home',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="discover"
              options={{
                title: 'Discover',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                title: 'Profile',
              }}
            />
            <Stack.Screen
              name="matches"
              options={{
                title: 'Matches',
              }}
            />
            <Stack.Screen
              name="communities"
              options={{
                title: 'Communities',
              }}
            />
            <Stack.Screen
              name="teams"
              options={{
                title: 'Teams',
              }}
            />
            <Stack.Screen
              name="create-match"
              options={{
                title: 'Create Match',
              }}
            />
            <Stack.Screen
              name="create-team"
              options={{
                title: 'Create Team',
              }}
            />
            <Stack.Screen
              name="match/[id]"
              options={{
                title: 'Match Details',
              }}
            />
            <Stack.Screen
              name="community/[id]"
              options={{
                title: 'Community',
              }}
            />
            <Stack.Screen
              name="team/[id]"
              options={{
                title: 'Team Details',
              }}
            />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  )
}
