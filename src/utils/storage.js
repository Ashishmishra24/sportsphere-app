import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll
} from "firebase/storage";
import { storage } from "../firebaseConfig";

// Upload a file to Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Upload user profile image
export const uploadProfileImage = async (userId, file) => {
  const fileExtension = file.name.split('.').pop();
  const path = `users/${userId}/profile.${fileExtension}`;
  return await uploadFile(file, path);
};

// Upload activity image
export const uploadActivityImage = async (userId, activityId, file) => {
  const fileExtension = file.name.split('.').pop();
  const path = `activities/${userId}/${activityId}/image.${fileExtension}`;
  return await uploadFile(file, path);
};

// Delete a file from Firebase Storage
export const deleteFile = async (path) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// Get download URL for a file
export const getFileURL = async (path) => {
  try {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};

// List all files in a directory
export const listFiles = async (path) => {
  try {
    const listRef = ref(storage, path);
    const result = await listAll(listRef);
    return result.items;
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (files, basePath) => {
  try {
    const uploadPromises = files.map((file, index) => {
      const fileExtension = file.name.split('.').pop();
      const path = `${basePath}/file_${index}.${fileExtension}`;
      return uploadFile(file, path);
    });
    
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw error;
  }
}; 