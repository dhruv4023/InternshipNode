
export const getComments = async (req, res) => {
    const { postId, parentCommentId } = req.params;
    
    const url = parentCommentId
        ? `${COMMENT_API_END}/api/v1/comment/post/${postId}/parent/${parentCommentId}`
        : `${COMMENT_API_END}/api/v1/comment/post/${postId}`;
        
    try {
        const response = await sendRequest('get', url);

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const getNestedComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const response = await sendRequest('get', `${COMMENT_API_END}/api/v1/comment/post/${postId}/nested`, null, {
            params: req.query,
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const createComment = async (req, res) => {
    const { postId, parentCommentId } = req.params;
    const url = parentCommentId
        ? `${COMMENT_API_END}/api/v1/comment/post/${postId}/parent/${parentCommentId}`
        : `${COMMENT_API_END}/api/v1/comment/post/${postId}`;

    try {
        const response = await sendRequest('post', url, {
            'Authorization': req.header("Authorization"),
            'Content-Type': 'application/json',
        }, req.body);

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const updateComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const response = await sendRequest('put', `${COMMENT_API_END}/api/v1/comment/${commentId}`, {
            'Authorization': req.header("Authorization"),
            'Content-Type': 'application/json',
        }, req.body);

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const response = await sendRequest('delete', `${COMMENT_API_END}/api/v1/comment/${commentId}`, {
            'Authorization': req.header("Authorization"),
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};