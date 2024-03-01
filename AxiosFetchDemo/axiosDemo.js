const axios = require('axios');

// Define a function to handle errors
function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    console.error('Response Error:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request Error:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  console.error('Config:', error.config);
}

// Define the base URL for your API
const baseURL = 'https://jsonplaceholder.typicode.com';

const postId=1;

// GET request
axios.get(`${baseURL}/posts/${postId}`)
  .then(response => {
    console.log('GET Response:', response.data);
  })
  .catch(handleError);

// POST request with JSON data
axios.post(`${baseURL}/posts`, {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then(response => {
    console.log('POST Response:', response.data);
  })
  .catch(handleError);

// PUT request with JSON data
axios.put(`${baseURL}/posts/${postId}`, {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then(response => {
    console.log('PUT Response:', response.data);
  })
  .catch(handleError);

// DELETE request
axios.delete(`${baseURL}/posts/${postId}`)
  .then(response => {
    console.log('DELETE Response:', response.status);
  })
  .catch(handleError);
