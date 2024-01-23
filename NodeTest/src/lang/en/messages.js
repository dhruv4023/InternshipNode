const MESSAGES = {

    1001: 'User registered successfully',
    1002: 'User login successful',
    1003: 'User already exists!',
    1004: 'Email already used!',
    1005: 'Invalid credentials, please check your username/email and password',
    1006: 'User data retrived!',
    1007: 'User data updated!',
    1027: 'User not found, please check your username/email',


    2001: 'Cart created successful',
    2002: 'Item added to Cart',
    2003: 'Cart not found',
    2004: 'Item not found in this cart',
    2005: 'Cart and item removed successfully',
    2006: 'Cart item removed successfully',
    2007: "Unauthorised cart user",
    2008: "Carts retrieved successfully",

    3001: 'Name, price, quantity are required fields',
    3002: 'Product added successfully',
    3003: 'Product not found as per productId and userId',
    3004: 'Product updated successfully',
    3005: 'Product deleted successfully',
    3006: 'Products retrieved successfully',
    3007: 'Product retrieved successfully',
    3008: "Unauthorised product update not allowed",

    4001: 'Cart is empty.',
    4002: 'Items purchased successfully.',
    4003: 'Purchase history retrieved successfully.',
    4004: 'Order list retrieved successfully.',
    4005: "Unauthorised Purchaser",
    4006: 'Insufficient quantity available for the product.',
    4007: 'Insufficient quantity available for one or more items.',
    5001: 'Unauthorized - Admin access required',
    5002: "Unauthorised Access denied",
    5003: "Your session expired! Please login again",

    9999: 'Internal Server Error',
};

const getMessage = messageCode => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

export default getMessage;
