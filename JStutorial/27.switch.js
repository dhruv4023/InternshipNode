const identifyNumberRange = (number) => {
  switch (true) {
    case number >= 1 && number <= 10:
      return "1 to 10";
    case number >= 11 && number <= 20:
      return "11 to 20";
    case number >= 21 && number <= 30:
      return "21 to 30";
    case number >= 91 && number <= 100:
      return "91 to 100";
    default:
      return "Number outside specified ranges";
  }
};

// Test the function with different numbers
console.log("5 is in between:", identifyNumberRange(5)); // Output: 1 to 10
console.log("15 is in between:", identifyNumberRange(15)); // Output: 11 to 20
console.log("25 is in between:", identifyNumberRange(25)); // Output: 21 to 30
console.log("95 is in between:", identifyNumberRange(95)); // Output: 91 to 100
console.log("120 is in between:", identifyNumberRange(120)); // Output: Number outside specified ranges
