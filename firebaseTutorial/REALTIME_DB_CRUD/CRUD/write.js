import { createPost } from "./main.js";

// // Example usage
createPost("4", {
    username: 'user4',
    title: 'Post Titl4',
    body: 'This is the body of the post4'
}).then(() => {
    console.log("Post created successfully");
}).catch((error) => {
    console.error("Error creating post:", error);
}); 