const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const firebaseAdmin = require('firebase-admin');
const ejs = require('ejs');

// Initialize Firebase Admin SDK
const serviceAccount = require('U:\\AlphavedInternship\\Tasks\\firebaseTutorial\\liquid-virtue-370510-firebase-adminsdk-w9cyn-f455ffe729.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://liquid-virtue-370510-default-rtdb.asia-southeast1.firebasedatabase.app'
});

// Initialize Express and Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Route to fetch old messages
app.get('/messages', (req, res) => {
    const messagesRef = firebaseAdmin.database().ref('messages');
    messagesRef.once('value', (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
            messages.push(childSnapshot.val().message);
        });
        res.json({ messages: messages });
    });
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for new messages
    socket.on('chat message', (msg) => {
        // Save message to Firebase Realtime Database
        const messagesRef = firebaseAdmin.database().ref('messages');
        messagesRef.push({
            message: msg,
            timestamp: firebaseAdmin.database.ServerValue.TIMESTAMP
        });
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
