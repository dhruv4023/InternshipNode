// Example 1: Using break in a for loop
console.log('Example 1: Using break in a for loop');
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    console.log('Break at i = 3');
    break;
  }
  console.log(i);
}

// Example 2: Using break in a while loop
console.log('\nExample 2: Using break in a while loop');
let j = 0;
while (j < 5) {
  if (j === 2) {
    console.log('Break at j = 2');
    break;
  }
  console.log(j);
  j++;
}

// Example 3: Using continue in a for loop
console.log('\nExample 3: Using continue in a for loop');
for (let k = 0; k < 5; k++) {
  if (k === 2) {
    console.log('Continue at k = 2');
    continue;
  }
  console.log(k);
}

// Example 4: Using continue in a while loop
console.log('\nExample 4: Using continue in a while loop');
let l = 0;
while (l < 5) {
  l++;
  if (l === 2) {
    console.log('Continue at l = 2');
    continue;
  }
  console.log(l);
}

// Example 5: Using break in nested loops
console.log('\nExample 5: Using break in nested loops');
for (let m = 0; m < 3; m++) {
  console.log(`Outer loop ${m}`);
  for (let n = 0; n < 3; n++) {
    if (n === 1) {
      console.log('Break inner loop at n = 1');
      break;
    }
    console.log(`Inner loop ${n}`);
  }
}

// Example 6: Using continue in nested loops
console.log('\nExample 6: Using continue in nested loops');
for (let p = 0; p < 3; p++) {
  console.log(`Outer loop ${p}`);
  for (let q = 0; q < 3; q++) {
    if (q === 1) {
      console.log('Continue inner loop at q = 1');
      continue;
    }
    console.log(`Inner loop ${q}`);
  }
}
