import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzNP0QyTGenlUtHeAWlmYLdRN49nxgEHk",
    authDomain: "liquid-virtue-370510.firebaseapp.com",
    databaseURL: "https://liquid-virtue-370510-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "liquid-virtue-370510",
    storageBucket: "liquid-virtue-370510.appspot.com",
    messagingSenderId: "503914551130",
    appId: "1:503914551130:web:30c2bd80a60dd6fa74c563"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Function to create a new post
const createPost = (postId, postData) => {
    const postRef = ref(db, `posts/${postId}`);
    const newPostRef = set(postRef, postData);
    return newPostRef;
};


// Function to read a post by its ID
const readPost = (postId) => {
    try {
        const postRef = ref(db, `posts/${postId}`);
        onValue(postRef, (ss) => {
            console.log(ss.val())
        })
    } catch (error) {
        console.error("Error reading post:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};


// Function to update a post by its ID
const updatePost = (postId, newData) => {
    const postRef = ref(db, `posts/${postId}`);
    return set(postRef, newData);
};

// Function to delete a post by its ID
const deletePost = (postId) => {
    const postRef = ref(db, `posts/${postId}`);
    return remove(postRef);
};

// Function to listen for changes to posts
const listenForPosts = () => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
};

export { createPost, readPost, updatePost, deletePost, listenForPosts };
