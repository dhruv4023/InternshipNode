let x = 0.2 + 0.1;
console.log(x);
x = (0.2 * 10 + 0.1 * 10) / 10;
console.log(x);

x = 10;
let y = "20";
let z = x + y;
console.log(z);

x = 10;
y = 20;
z = "The result is: " + x + y;
console.log(z);

x = 10;
y = 20;
z = "30";
let result = x + y + z;
console.log(result);

console.log("10" / "20");
console.log("10" * "20");
console.log("21" ** "2");
console.log("10" / "a");
console.log(isNaN("10" / "a"));
console.log(isNaN("10" / "10"));
console.log(NaN + 5);
console.log(typeof NaN);

console.log(5 / 0);

let myNumber = 2;
// Execute until Infinity
while (myNumber != Infinity) {
  myNumber = myNumber * myNumber;
  console.log(myNumber);
}
console.log(typeof Infinity);

let hx = 0xf;
console.log(hx + 0x1);
console.log((hx + 0x1).toString(16));

//Comparing two JavaScript objects always returns false.
x = new Number(500);
y = new Number(500);
console.log(x == y);
console.log(x === y);
