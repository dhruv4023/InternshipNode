import mongoose from "mongoose";

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, // Basic email pattern validation
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

// Export the user schema as a Mongoose model named "Users"
export default mongoose.model("Users", userSchema);
