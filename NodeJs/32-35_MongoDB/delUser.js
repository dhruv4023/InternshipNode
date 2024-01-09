require("./connDb")
const userColl = require("./UserModel")
// Delete operation
const deleteUser = async (userId) => {
  try {
    const result = await userColl.findByIdAndDelete(userId);
    console.log('User deleted:', result);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

deleteUser("659bf5082a4b4c6ebc6eec40")