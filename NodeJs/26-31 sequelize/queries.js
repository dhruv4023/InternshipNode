

const User = require('./Models/User'); // Adjust the path based on your project structure
const Post = require('./Models/Post'); // Adjust the path based on your project structure

const getPostByUserId = async (uid) => {
    const posts = await Post.findAll({
        where: { userId: uid },
        include: [{ model: User }],
    });
    console.log(posts.map(post => post.get()));
}

// Function to get posts by username
const getPostsByUsername = async (username) => {
    try {
        const postsByUsername = await Post.findAll({
            include: [{
                model: User,
                where: { username: username },
            }],
        });

        console.log(postsByUsername.map(post => post.get()));
    } catch (error) {
        console.error('Error retrieving posts by username:', error);
        throw error; // Optional: Rethrow the error if needed
    }
};

const getPostsWithUsers = async () => {
    try {
        const postsWithUsers = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username', 'email'], // Optional: Specify the user attributes you want to retrieve
            }],
            attributes: ['title']
        });

        console.log(postsWithUsers.map(post => post.get()));
    } catch (error) {
        console.error('Error retrieving posts with users:', error);
        throw error; // Optional: Rethrow the error if needed
    }
};

// Example usage
getPostsWithUsers();


// (getPostsByUsername("xyz"));

// getPostByUserId(1)