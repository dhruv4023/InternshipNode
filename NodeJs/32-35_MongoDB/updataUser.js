require("./connDb")
const userColl = require("./UserModel")

// Update operation
const updateUser = async (userId, newName, newEmail) => {
  try {
    const result = await userColl.findByIdAndUpdate(
      userId,
      { name: newName, email: newEmail },
      { new: true } // returns the updated document
    );
    console.log('User updated:', result);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

updateUser("659d045e412ae4ae85991a55","dhruv","dhruv20345@gmail.com")