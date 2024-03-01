import { updatePost } from "./main.js";

const postId = "4"; // ID of the post to update
const updatedPostData = {
    username: 'updated user4',
    title: 'updated Post Titl4',
    body: 'updated This is the body of the post4'
};

// Call the updatePost function to update the post
updatePost(postId, updatedPostData);
