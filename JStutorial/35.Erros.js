// Example 1: ReferenceError
try {
  console.log(x); // ReferenceError: undefinedVariable is not defined
} catch (error) {
  console.log("Example 1: ReferenceError");
  console.error(error.message);
}
console.log();

// Example 2: TypeError
try {
  null.toUpperCase(); // TypeError: null is not an object (evaluating 'null.toUpperCase')
} catch (error) {
  console.log("Example 2: TypeError");
  console.error(error.message);
}
console.log();

// Example 3: SyntaxError
try {
  eval("2 + 2 ="); // SyntaxError: Invalid left-hand side in assignment
} catch (error) {
  console.log("Example 3: SyntaxError");
  console.error(error.message);
}
console.log();

// Example 4: Custom Error
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

try {
  throw new CustomError("This is a custom error."); // CustomError: This is a custom error.
} catch (error) {
  console.log("Example 4: Custom Error");
  console.error(error.message);
}
console.log();

// Example 5: Finally block
try {
  console.log("Inside try block");
  throw new Error("An error occurred");
} catch (error) {
  console.log("Inside catch block");
  console.error(error.message);
} finally {
  console.log("Inside finally block");
}
