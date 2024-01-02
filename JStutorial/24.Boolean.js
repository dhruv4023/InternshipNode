let isTrue = true;
let isFalse = false;

let x = 5;
let y = "5";

console.log(x == y); // true (loose equality)
console.log(x === y); // false (strict equality)
console.log(x != y); // false (loose inequality)
console.log(x !== y); // true (strict inequality)
console.log(x > 3); // true (greater than)
console.log(x <= 4); // false (less than or equal to)

let a = true;
let b = false;

console.log(a && b); // false (true if both are true)
console.log(a || b); // true (true if at least one is true)
console.log(!a); // false (negation)

let isSunny = true;

if (isSunny) {
  console.log("Enjoy the sunshine!");
} else {
  console.log("It's not sunny today.");
}
