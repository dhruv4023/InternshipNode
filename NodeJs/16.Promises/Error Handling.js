// 4. Error Handling with Promises
const rejectPromise = new Promise((resolve, reject) => {
    reject(new Error('Rejected Promise with Error'));
});

rejectPromise.catch(error => console.error('4. Error Handling:', error.message));
