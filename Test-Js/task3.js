const users = [
    { age: 15, height: 162.2, "name": "Abc", "id": 2 },
    { age: 25, height: 165.5, "name": "xyz", "id": 1 },
    { age: 35, height: 170.3, "name": "pqr", "id": 3 },
    { age: 45, height: 167.2, "name": "mno", "id": 4 }
]

console.log(users.map(x => x.id))