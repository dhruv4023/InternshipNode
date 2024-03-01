const baseURL = 'https://jsonplaceholder.typicode.com';
const postId = 1;

// Define a function to handle errors
function handleError(error) {
  console.error('Error:', error);
}

// GET request
fetch(`${baseURL}/posts/${postId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('GET Response:', data);
  })
  .catch(handleError);

// POST request with JSON data
fetch(`${baseURL}/posts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('POST Response:', data);
})
.catch(handleError);

// PUT request with JSON data
fetch(`${baseURL}/posts/${postId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('PUT Response:', data);
})
.catch(handleError);

// DELETE request
fetch(`${baseURL}/posts/${postId}`, {
  method: 'DELETE',
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  console.log('DELETE Response:', response.status);
})
.catch(handleError);
