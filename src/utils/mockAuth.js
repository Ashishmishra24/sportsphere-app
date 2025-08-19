// Mock authentication system for testing
class MockAuth {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.authStateListeners = [];
  }

  // Mock sign in
  async signInWithEmailAndPassword(email, password) {
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Demo account credentials
      if (email === 'demo@sportsphere.com' && password === 'demo123') {
        this.currentUser = {
          uid: 'demo-user-123',
          email: 'demo@sportsphere.com',
          displayName: 'Demo User',
          photoURL: null
        };
        this.isAuthenticated = true;
        this.notifyAuthStateChange();
        return { user: this.currentUser };
      }
      
      // Allow any email/password combination for testing
      this.currentUser = {
        uid: 'test-user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null
      };
      this.isAuthenticated = true;
      this.notifyAuthStateChange();
      return { user: this.currentUser };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Mock sign up
  async createUserWithEmailAndPassword(email, password) {
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      this.currentUser = {
        uid: 'new-user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null
      };
      this.isAuthenticated = true;
      this.notifyAuthStateChange();
      return { user: this.currentUser };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Mock sign out
  async signOut() {
    try {
      this.currentUser = null;
      this.isAuthenticated = false;
      this.notifyAuthStateChange();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Mock password reset
  async sendPasswordResetEmail(email) {
    try {
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if authenticated
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  // Add auth state listener (similar to Firebase's onAuthStateChanged)
  onAuthStateChanged(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    this.authStateListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of auth state change
  notifyAuthStateChange() {
    this.authStateListeners.forEach(callback => {
      try {
        callback(this.currentUser);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }
}

export const mockAuth = new MockAuth();
