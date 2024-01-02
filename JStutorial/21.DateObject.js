// Creating a Date object (current date and time)
let currentDate = new Date();
console.log('Current Date and Time:', currentDate);

// Creating a Date object with a specific date and time
let specificDate = new Date('2024-01-01T12:00:00');
console.log('Specific Date and Time:', specificDate);

// Formatting Dates
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let formattedDate = currentDate.toLocaleDateString(undefined, options);
console.log('Formatted Date:', formattedDate);

// Working with Timestamps
let timestamp = currentDate.getTime();
console.log('Timestamp:', timestamp);
