// var 
// same var can be define many times in one scope
// var x = 5
var x=7

function hello() {
    var y = 8
        console.log(x)
        function xyz() {
            console.log(y)
        }
        xyz()
}
hello()
// console.log(y) // not accessible as it declared locally inside hello function


// // let
// // same var cannot define again
// let x=5

// // let x=7

// function hello() {
//     let y=7
//     console.log(x)
//     function xyz() {
//         console.log(y)
//     }
//     xyz()
// }
// hello()
// console.log(y) // not accessible as it declared locally inside hello function

// // const
// // same var cannot define again
// const x=5
const z=7
// z=9 // valcue cannot be changed after declaration
function ZZ() {
    const q=5
}
