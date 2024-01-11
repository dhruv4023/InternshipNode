const objects = [
    { type: 'bird', name: 'peacock' },
    { type: 'animal', name: 'cat' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'mineral', name: 'gold' },
];


console.log(objects.sort((a, b) => (a.type.toLowerCase() < b.type.toLowerCase() ? -1 : 1)))