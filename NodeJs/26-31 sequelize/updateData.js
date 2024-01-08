// Assuming you have imported the Post model
const Post = require('./Models/Post');

const updatePostTitleById = async (postId, newTitle, newContent) => {
    try {
        const [updatedRowsCount, updatedRows] = await Post.update(
            { title: newTitle, content: newContent },
            { where: { id: postId }, returning: true }
        );
        
        if (updatedRows > 0) {
            console.log(`Title updated successfully for post with ID ${postId}`);
            console.log('Updated post details:', updatedRows);
        } else {
            console.log(`Post with ID ${postId} not found`);
        }
    } catch (error) {
        console.error('Error updating post title:', error);
    }
};

// Example usage
updatePostTitleById(2, '23 New Post Title', "23 new content");
