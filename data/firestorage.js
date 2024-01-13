import {
  getStorage,
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload a file to Firebase Storage
export const uploadFile = async (folder, filename, file) => {
  try {
    // Create a reference to the storage bucket and specify the filename
    const filename = `${folder}/${filename}`;
    const storageRef = ref(storage);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    console.log("File uploaded successfully!");
    const url = await firebase
      .storage()
      .ref(`${folder}/${filename}`)
      .getDownloadURL();
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// Function to retrieve all images from Firebase Storage
export const getAllImages = async () => {
  try {
    // Create a reference to the root of the storage bucket
    const storageRef = ref(storage, "uploads");

    // List all items (images) in the storage bucket
    const listResult = await listAll(storageRef);

    // Array to store the image objects
    const imagesArray = [];

    // Loop through each item and get the download URL
    for (const item of listResult.items) {
      const downloadURL = await getDownloadURL(item);

      // Create an image object with title, file, and fileURL fields
      const imageObject = {
        title: item.name,
        file: item,
        url: downloadURL,
      };

      // Add the image object to the images array
      imagesArray.push(imageObject);
    }
    console.log("All images retrieved:");
    return imagesArray;
  } catch (error) {
    console.error("Error retrieving images:", error);
    return [];
  }
};

// Function to get a specific file/image from Firebase Storage
export const getFile = async (folder, filename) => {
  try {
    const url = await firebase
      .storage()
      .ref(`${folder}/${filename}`)
      .getDownloadURL();
    return url;
  } catch (error) {
    console.error("Error retrieving file:", error);
  }
};

// Function to delete file/image from Firebase Storage
export const deletefile = async (folder, filename) => {
  const storage = getStorage();
  // Create a reference to the file to delete
  const deleteRef = ref(storage, `${folder}/${filename}`);
  // Delete the file/image
  deleteObject(deleteRef)
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
