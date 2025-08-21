import { createClient, SupabaseClient } from '@supabase/supabase-js'

export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt?: string
  updatedAt?: string
}

export class AuthService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    return {
      id: data.user.id,
      email: data.user.email!,
      displayName: data.user.user_metadata?.display_name,
      photoURL: data.user.user_metadata?.avatar_url
    }
  }

  async signUp(email: string, password: string, displayName?: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    })
    
    if (error) throw error
    
    return {
      id: data.user!.id,
      email: data.user!.email!,
      displayName: data.user!.user_metadata?.display_name,
      photoURL: data.user!.user_metadata?.avatar_url
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) return null
    
    return {
      id: user.id,
      email: user.email!,
      displayName: user.user_metadata?.display_name,
      photoURL: user.user_metadata?.avatar_url
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          displayName: session.user.user_metadata?.display_name,
          photoURL: session.user.user_metadata?.avatar_url
        }
        callback(user)
      } else {
        callback(null)
      }
    })
  }
}
