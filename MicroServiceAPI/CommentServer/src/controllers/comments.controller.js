import db from "../models/index.js";
import RESPONSE from "../helpers/response.helper.js";

const { Comments } = db

export const getComments = async (req, res) => {
    const { params: { postId } } = req;

    try {
        // Assuming you have a foreign key relationship between Posts and Comments
        const comments = await Comments.findAll({
            where: { postId },
        });

        RESPONSE.success(res, 4006, comments); // Adjust the message code as needed
    } catch (error) {
         
        RESPONSE.error(res, 9999, 500);
    }
};
export const createComment = async (req, res) => {
    const { body: { content, postId }, tokenData: { userId } } = req;

    const validationErr = await isValidData({ content, postId, userId }, {
        content: 'required|string',
        postId: 'required|integer',
        userId: 'required|integer',
    });

    if (validationErr) {
        return RESPONSE.error(res, validationErr);
    }

    try {
        const newComment = await Comments.create({
            content,
            postId,
            userId,
        });

        RESPONSE.success(res, 4002, newComment); // Adjust the message code as needed
    } catch (error) {
         
        RESPONSE.error(res, 9999, 500);
    }
};

export const updateComment = async (req, res) => {
    const { body: { content, postId, userId }, params: { commentId } } = req;

    const validationErr = await isValidData({ content, postId, userId }, {
        content: 'string',
        postId: 'integer',
        userId: 'integer',
    });

    if (validationErr) {
        return RESPONSE.error(res, validationErr);
    }

    try {
        const [rowsUpdated, [updatedComment]] = await Comments.update(
            {
                content,
                postId,
                userId,
            },
            {
                where: { id: commentId },
                returning: true,
            }
        );

        if (rowsUpdated > 0) {
            RESPONSE.success(res, 4004, updatedComment); // Adjust the message code as needed
        } else {
            RESPONSE.error(res, 4003, 404, 'Comment not found');
        }
    } catch (error) {
         
        RESPONSE.error(res, 9999, 500);
    }
};

export const deleteComment = async (req, res) => {
    const { params: { commentId } } = req;

    try {
        const rowsDeleted = await Comments.destroy({
            where: { id: commentId },
        });

        if (rowsDeleted > 0) {
            RESPONSE.success(res, 4005, { commentId }); // Adjust the message code as needed
        } else {
            RESPONSE.error(res, 4003, 404, 'Comment not found');
        }
    } catch (error) {
         
        RESPONSE.error(res, 9999, 500);
    }
};
