
// Getting Date and Time Components
let year = currentDate.getFullYear();
let month = currentDate.getMonth(); // Note: Months are zero-indexed (0-11)
let day = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
let milliseconds = currentDate.getMilliseconds();

console.log('Date Components:');
console.log(`Year: ${year}`);
console.log(`Month: ${month + 1}`); // Adding 1 to convert to human-readable month (1-12)
console.log(`Day: ${day}`);
console.log(`Hours: ${hours}`);
console.log(`Minutes: ${minutes}`);
console.log(`Seconds: ${seconds}`);
console.log(`Milliseconds: ${milliseconds}`);

// Setting Date and Time Components
currentDate.setFullYear(2023);
currentDate.setMonth(5); // June (zero-indexed)
currentDate.setDate(15);
currentDate.setHours(18);
currentDate.setMinutes(30);
currentDate.setSeconds(45);

console.log('Modified Date:', currentDate);