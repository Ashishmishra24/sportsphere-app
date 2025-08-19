import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log('User Signed In:', result.user);
      return result.user;
    })
    .catch((error) => {
      console.error('Error during sign-in:', error);
      throw error;
    });
};

export const signOutUser = () => {
  return signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
    })
    .catch((error) => {
      console.error('Error during sign-out:', error);
      throw error;
    });
};

export const getCurrentUser = () => {
  return auth.currentUser;
}; 