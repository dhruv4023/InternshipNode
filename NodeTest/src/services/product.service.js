// Controller function to update the quantity of an existing product
// export const updateQuantity = async (req, res) => {
//     try {
//         const {
//             tokenData: { userId },
//             params: { productId },
//             body: { quantity },
//         } = req;

//         // Validate request data
//         if (await isValidData({ ...req.params, ...req.body, ...req.tokenData }, res, {
//             userId: 'required|integer|min:1',
//             productId: 'required|integer|min:1',
//             quantity: 'required|integer|min:1',
//         })) return;

//         // Check if the product exists
//         const product = await Products.findOne({ where: { id: productId, userId } });
//         if (!product) {
//             return RESPONSE.error(res, 3003, 404);
//         }

//         // Update the quantity of the product in the database
//         await Products.update(
//             { quantity },
//             { where: { id: productId, userId } }
//         );

//         const updatedProduct = await Products.findOne({ where: { id: productId } });
//         RESPONSE.success(res, 3004, { product: updatedProduct });
//     } catch (error) {
//         RESPONSE.error(res, 9999, 500, error);
//     }
// };

