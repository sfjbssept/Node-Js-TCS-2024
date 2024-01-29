var name = "nishant" // string
var age = 33 // number
var isAdult = true //
// var allows us to define variable in the whole program

console.log(name);
{
    let name = "Peter"
    console.log(name);
    // let allows us to create a variable in blocked scope

}
console.log(name);

// const allows us to create a constant
const id = "a123"
console.log(id);

var multiply = function(x,y) {
    z = x * y;
    return z;
} 
// traditional method to create a function


// ec6 arrow function 
const add = (x,y) => x + y;

console.log(multiply(10,20));
console.log(add(10,7));