// Example of adding data to the datxyzase
const User = require('./Models/User'); // Adjust the path based on your project structure
const Post = require('./Models/Post'); // Adjust the path based on your project structure

// Adding a user
const addUser = async (username, email) => {
    const user = await User.create({
        username: username,
        email: email,
    });

    return user.id;
}

const addPost = async (userId, title, content) => {
    return await Post.create({
        title: title,
        content: content,
        userId: userId, // Linking the post to the user
    })
}
// console.log(addUser("xy", "xy@mail.com"))
// console.log(addPost(1, "post title", "test content"))