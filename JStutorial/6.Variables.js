// JavaScript Variables can be declared in 4 ways:

// Automatically ----------------------------------------------------------------------------------------------------------------------------
x = 5;
y = 6;
y--;
z = x + y;
// console.log(z);

// Using var --------------------------------------------------------------------------------------------------------------------------------
var x = 5;
var y = 6;
x++;
var z = x + y;
// console.log(z);

var x = 55; // can be redeclared within same scope

function fun(){
   var YY = 10;
  //  console.log(x);  // Accessible
}
fun()
// console.log("YY:",YY);  // Error: y is not defined (outside the function scope)

// Using let -------------------------------------------------------------------------------------------------------------------------------
let a = 5;
let b = 6;
b--;
a--;
let c = a + b;
c--;

// console.log(c);
function fun(){
  let aa = 10;
  // console.log(a);  // Error: not Accessible
}
fun()
const arrowFun=()=>{
  let aa = 10;
  // console.log(a);  //  Accessible
}
arrowFun()
// console.log("aa:",aa); // Error: y is not defined (outside the function scope)

// Using const -----------------------------------------------------------------------------------------------------------------------------
const p = 7;
const q = 6;
// p++; // throw error
const r=p+q;
// console.log(r);



// some valid variables

let $ = "Hello World";
let $$$ = 2;
let $myMoney = 5;

let _lastName = "Johnson";
let _x = 2;
let _100 = 5;

// Global Object Property
// var z = 25;
// console.log(window.z);  // 25 (in a browser environment)

// let w = 30;
// console.log(window.w);  // undefined (in a browser environment)
