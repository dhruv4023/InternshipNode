// Example of adding data to the datxyzase
const User = require('./Models/User'); // Adjust the path based on your project structure
const Post = require('./Models/Post'); // Adjust the path based on your project structure


const deletePostById = async (postId) => {
    try {
        const deletedRowCount = await Post.destroy({ where: { id: postId } });

        if (deletedRowCount > 0) {
            console.log(`Post with ID ${postId} deleted successfully`);
        } else {
            console.log(`Post with ID ${postId} not found`);
        }
    } catch (error) {
        console.error('Error deleting post by ID:', error);
    }
};

// Example usage
// deletePostById(2); // Replace 1 with the actual ID of the post you want to delete



const deleteUserById = async (userId) => {
    try {
        const deletedRowCount = await User.destroy({ where: { id: userId } });

        if (deletedRowCount > 0) {
            console.log(`User with ID ${userId} deleted successfully`);
        } else {
            console.log(`User with ID ${userId} not found`);
        }
    } catch (error) {
        console.error('Error deleting user by ID:', error);
    }
};


// deleteUserById(2); // Replace 1 with the actual ID of the user you want to delete
