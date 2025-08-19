import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// User profile functions
export const createUserProfile = async (userId, userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userId,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Sports activities functions
export const addActivity = async (userId, activityData) => {
  try {
    const docRef = await addDoc(collection(db, "activities"), {
      userId,
      ...activityData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding activity:", error);
    throw error;
  }
};

export const getUserActivities = async (userId) => {
  try {
    const q = query(
      collection(db, "activities"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user activities:", error);
    throw error;
  }
};

// Real-time listeners
export const subscribeToUserActivities = (userId, callback) => {
  const q = query(
    collection(db, "activities"), 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const activities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(activities);
  });
};

// Update and delete functions
export const updateActivity = async (activityId, updates) => {
  try {
    const activityRef = doc(db, "activities", activityId);
    await updateDoc(activityRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const deleteActivity = async (activityId) => {
  try {
    await deleteDoc(doc(db, "activities", activityId));
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
}; 