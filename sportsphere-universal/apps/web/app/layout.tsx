import { Metadata } from 'next'
import { TamaguiProvider } from '@tamagui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@sportsphere/ui'
import { AuthProvider } from '@sportsphere/api'

export const metadata: Metadata = {
  title: 'SportSphere - Your Sports Community',
  description: 'Connect, compete, and celebrate sports together',
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryClientProvider>
        </TamaguiProvider>
      </body>
    </html>
  )
}
