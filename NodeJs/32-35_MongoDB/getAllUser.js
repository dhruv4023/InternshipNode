require("./connDb")
const userColl = require("./UserModel")
// Read operation
const getAllUsers = async () => {
  try {
    const users = await userColl.find();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};
getAllUsers()