
// GET method
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => console.log('GET Response:', data))
    .catch(error => console.error('GET Error:', error));




// POST method
const postData = {
    title: 'New Task',
    completed: false
};

fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
    .then(response => response.json())
    .then(data => console.log('POST Response:', data))
    .catch(error => console.error('POST Error:', error));

    
// DELETE method
fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'DELETE'
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('DELETE Success');
    })
    .catch(error => console.error('DELETE Error:', error));
