var sampleString =
  "Hello, JavaScript! This is a JavaScript example. JavaScript";

// String indexOf(substr, [start])
console.log(
  "String indexOf('JavaScript'):",
  sampleString.indexOf("JavaScript")
);
console.log(
  "String indexOf('JavaScript'):",
  sampleString.indexOf("JavaScript", 10)
);

// String lastIndexOf(substr, [start])
console.log(
  "String lastIndexOf('JavaScript'):",
  sampleString.lastIndexOf("JavaScript")
);

// String search(regexp)
console.log("String search(/JavaScript/):", sampleString.search(/JavaScript/));

// String match(regexp)
console.log("String match('JavaScript'):", sampleString.match("JavaScript"));
console.log("String match('JavaScript').index:", sampleString.match("JavaScript").index);

// String matchAll(regexp) (ES2020+)
if (sampleString.matchAll) {
  var matches = sampleString.matchAll(/JavaScript/g);
  console.log("String matchAll(/JavaScript/g):", [...matches]);
} else {
  console.log("String matchAll is not supported in this environment.");
}

// String includes(substr)
console.log(
  "String includes('JavaScript'):",
  sampleString.includes("JavaScript")
);

// String startsWith(substr)
console.log("String startsWith('Hello'):", sampleString.startsWith("Hello"));

// String endsWith(substr)
console.log("String endsWith('example.'):", sampleString.endsWith("example."));
