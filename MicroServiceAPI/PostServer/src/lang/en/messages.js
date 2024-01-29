const MESSAGES = {
    // Post messages
    3001: 'Post created successfully',
    3002: 'Post updated successfully',
    3003: 'Post not found',
    3004: 'Post deleted successfully',
    3005: 'Error creating post',
    3006: 'Error updating post',
    3007: 'Error deleting post',

    // General messages
    9999: 'Internal Server Error',
};

const getMessage = messageCode => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

export default getMessage;