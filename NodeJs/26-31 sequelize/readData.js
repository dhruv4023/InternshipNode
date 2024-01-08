// Example of adding data to the datxyzase
const User = require('./Models/User'); // Adjust the path based on your project structure
const Post = require('./Models/Post'); // Adjust the path based on your project structure


// Retrieve all users
const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        console.log('All Users:', users.map(user => user.get()));
    } catch (error) {
        console.error('Error retrieving users:', error);
    }
};

// Retrieve all posts
const getAllPosts = async () => {
    try {
        const posts = await Post.findAll();
        console.log('All Posts:', posts.map(post => post.get()));
    } catch (error) {
        console.error('Error retrieving posts:', error);
    }
};

// // Example usage
getAllUsers();
// getAllPosts();

