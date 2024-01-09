const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 22 }
];

app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: "My Site",
        x: 3,
        name: 'xyz',
        hobbies: ["hobby1", "hobby2", "hobby3"],
        users: users,
        currentYear: 2024
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

