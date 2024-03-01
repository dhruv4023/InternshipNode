const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

let data = new FormData();
data.append('firstName', 'Dhruv');
data.append('lastName', 'Patel');
data.append('username', 'dhruv4023');
data.append('email', 'dhruv20345@gmail.com');
data.append('password', '123Test');
data.append('picPath', fs.createReadStream('/D:/TempFiles/OneDrive/Pictures/img.jpg'));

// axios -----------------------------------------------------
let config = {
    method: 'post',
    url: 'https://127.0.0.1:5001/api/v1/auth/register/',
    headers: { ...data.getHeaders() },
    data: data
};

axios.request(config).then((response) => { console.log(JSON.stringify(response.data)); }).catch(console.log);

// fetch -----------------------------------------------------
const requestOptions = {
    method: "POST",
    body: data,
};

fetch("https://127.0.0.1:5001/api/v1/auth/register/", requestOptions)
    .then((response) => response.text())
    .then(console.log)
    .catch(console.error);