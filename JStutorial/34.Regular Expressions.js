// Example 1: Creating a regular expression
let regex1 = /hello/;
let regex2 = new RegExp('world');

// Example 2: Testing a string against a regular expression
let str1 = 'hello, world!';
let str2 = 'Hi there!';

console.log('Example 2: Testing a string against a regular expression');
console.log('Regex 1 test:', regex1.test(str1)); // true
console.log('Regex 2 test:', regex2.test(str1)); // false
console.log('Regex 1 test:', regex1.test(str2)); // false
console.log('Regex 2 test:', regex2.test(str2)); // false
console.log();

// Example 3: Matching with regular expression exec() method
let regex3 = /quick\s(brown|red) fox/i;
let sentence = 'The Quick Brown Fox jumps over the lazy Dog';

console.log('Example 3: Matching with regular expression exec() method');
let match = regex3.exec(sentence);
console.log('Match result:', match);
console.log('Matched group:', match[0]); // Entire match
console.log('Matched group 1:', match[1]); // First capturing group
console.log();

// Example 4: Extracting matches using match() method
let regex4 = /\d+/g;
let stringWithNumbers = '123 apples and 456 oranges';

console.log('Example 4: Extracting matches using match() method');
let matches = stringWithNumbers.match(regex4);
console.log('Matches:', matches);
console.log();

// Example 5: Replacing using replace() method
let regex5 = /apple/g;
let fruitString = 'apple apple orange apple banana';

console.log('Example 5: Replacing using replace() method');
let replacedString = fruitString.replace(regex5, 'grape');
console.log('Replaced String:', replacedString);
