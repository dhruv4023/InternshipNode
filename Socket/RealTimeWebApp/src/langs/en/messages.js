const MESSAGES = {
    // Chatroom messages
    4101: 'Chatroom retrieved successfully',
    4102: 'Chatroom created successfully',
    4103: 'Chatroom not found',
    4104: 'Chatroom updated successfully',
    4105: 'Chatroom deleted successfully',

    // Message messages
    4201: 'Message retrieved successfully',
    4202: 'Message created successfully',
    4203: 'Message not found',
    4204: 'Message updated successfully',
    4205: 'Message deleted successfully',

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