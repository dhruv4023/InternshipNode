import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, push, query, orderByChild, limitToLast } from "firebase/database";

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

// Function to send a message to a chat
const sendMessage = (chatId, userId, message) => {
    const chatRef = ref(db, `chats/${chatId}/messages`);

    // Push the message to the messages node
    push(chatRef, {
        userId: userId,
        text: message,
        timestamp: new Date().getTime() // Add timestamp to track when the message was sent
    }).then(() => {
        console.log("Message sent successfully");
    }).catch(error => {
        console.error("Error sending message:", error);
    });
}

// Function to receive messages from a chat
const receiveMessages = (chatId) => {
    const chatRef = ref(db, `chats/${chatId}/messages`);

    // Query the last 10 messages from the chat
    const messagesQuery = query(chatRef, orderByChild('timestamp'), limitToLast(10));

    // Listen for changes to the messages node
    onValue(messagesQuery, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
            messages.push(childSnapshot.val());
        });
        console.log("Received messages:", messages);
    }, {
        onlyOnce: false // Keep listening for changes
    });
}

// Example usage
const chatId = "1"; // Chat ID to send/receive messages
const messageToSend = "Hello, abc!"; // Message to send
const userId = "xyz123"
// sendMessage(chatId, userId, messageToSend); // Send the message

// Receive messages from the chat
receiveMessages(chatId);
