# JavaScript Coding Interview Questions

## Table of Contents
1. [Create Counter (Closure)](#1-create-counter-closure)
2. [Debounce Function](#2-debounce-function)
3. [Throttle Function](#3-throttle-function)
4. [Reverse a String](#4-reverse-a-string)
5. [Flatten a Nested Array](#5-flatten-a-nested-array)
6. [Remove Duplicates from an Array](#6-remove-duplicates-from-an-array)
7. [Count Occurrences of Items](#7-count-occurrences-of-items)
8. [Find Largest Number](#8-find-largest-number)
9. [Find Second Largest Number](#9-find-second-largest-number)
10. [Find Smallest Number](#10-find-smallest-number)
11. [Find Second Smallest Number](#11-find-second-smallest-number)
12. [Find Largest and Smallest Numbers](#12-find-largest-and-smallest-numbers)
13. [Sort String (Manual Array Sort)](#13-sort-string-manual-array-sort)
14. [Sort String (Manual String Sort with substring)](#14-sort-string-manual-string-sort-with-substring)
15. [Sort String (Manual Sort with Custom Substring)](#15-sort-string-manual-sort-with-custom-substring)
16. [Check if Object is Empty](#16-check-if-object-is-empty)
17. [setTimeout Loop (Closure Trap)](#17-settimeout-loop-closure-trap)
18. [Scope and Hoisting (Global Variable)](#18-scope-and-hoisting-global-variable)
19. [Sort Array (Bubble Sort)](#19-sort-array-bubble-sort)
20. [Count Character Occurrence in String](#20-count-character-occurrence-in-string)
21. [Find Frequency of Elements in Array](#21-find-frequency-of-elements-in-array)
22. [Check Prime and Even Number](#22-check-prime-and-even-number)
23. [Remove Falsy Values from Array](#23-remove-falsy-values-from-array)
24. [Predict Output: Pre-increment vs Post-increment](#24-predict-output-pre-increment-vs-post-increment)
25. [Generate Random Hex Color](#25-generate-random-hex-color)
26. [Hoisting with Var](#26-hoisting-with-var)
27. [Hoisting with Let (Temporal Dead Zone)](#27-hoisting-with-let-temporal-dead-zone)

---

## 1. Create Counter (Closure)

**Description:**
A simple example of a closure where the inner function retains access to the `count` variable from the outer function's scope.

```javascript
function createCounter() {
  let count = 0; // private variable

  return function () {
    count++;
    console.log(count);
  };
}

const counter1 = createCounter();

counter1(); // 1
counter1(); // 2
counter1(); // 3
```

---

## 2. Debounce Function

**Description:**
Debouncing ensures that a function is not called until a certain amount of time has passed since the last time it was invoked. Useful for search bars.

```javascript
function debounce(fn, delay) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}


function search(text) {
  console.log("Searching for:", text);
}

const debouncedSearch = debounce(search, 500);

// Simulate typing
debouncedSearch("R");
debouncedSearch("Re");
debouncedSearch("Rea");
debouncedSearch("React"); // Only this runs after 500ms
```

---

## 3. Throttle Function

**Description:**
Throttling ensures that a function is called at most once in a specified time period. Useful for scroll events.

```javascript
function throttle(fn, limit) {
  let inThrottle = false;

  return function () {
    const context = this;
    const args = arguments;

    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;

      setTimeout(function () {
        inThrottle = false;
      }, limit);
    }
  };
}


function logScroll() {
  console.log("Scroll event triggered");
}

const throttledScroll = throttle(logScroll, 1000);

// Simulate rapid calls
throttledScroll();
throttledScroll();
throttledScroll(); // runs only once per second
```

---

## 4. Reverse a String

**Description:**
Reversing a string manually using a loop.

```javascript
let a = 'Abhijit';
let b = '';

for (let i = a.length - 1; i >= 0; i--) {  
    b += a[i];
}

console.log(b); // tijihbA
```

---

## 5. Flatten a Nested Array

**Description:**
Flattening a nested array structure using recursion.

```javascript
let t = [1, 2, 3, [4, 5], [7, 8], 9];
let r = [];

const arr = (t) => {
  for (let i = 0; i < t.length; i++) {
    if (Array.isArray(t[i])) {
      arr(t[i]); // recurse on inner array
    } else {
      r.push(t[i]);
    }
  }
};

arr(t);
console.log(r); // [1, 2, 3, 4, 5, 7, 8, 9]
```

---

## 6. Remove Duplicates from an Array

**Description:**
Multiple ways to remove duplicates from an array.

```javascript
let c = [2, 3, 1, 2, 4, 3, 5, 7, 9, 4, 6, 3, 9, 5];

// Method 1: Using Loop and includes
let d = [];
for (let i = 0; i < c.length; i++) {
  if (!d.includes(c[i])) {
    d.push(c[i]);
  }
}
console.log(d);

// Method 2: Using Set (One-liner)
const unique = [...new Set(c)];
console.log(unique);

// Method 3: Using for...of loop
const result = [];
for (let n of c) {
  if (!result.includes(n)) result.push(n);
}
console.log(result);

// Method 4: Manual check loop
const arr = [1, 2, 3, 2, 4, 1, 5];
let uniqueArr = [];

for (let i = 0; i < arr.length; i++) {
  let isDuplicate = false;

  for (let j = 0; j < uniqueArr.length; j++) {
    if (arr[i] === uniqueArr[j]) {
      isDuplicate = true;
      break;
    }
  }

  if (!isDuplicate) {
    uniqueArr.push(arr[i]);
  }
}

console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

---

## 7. Count Occurrences of Items

**Description:**
Counting the frequency of objects in an array based on a property.

```javascript
let data = [
  { language: 'JavaScript' }, { language: 'JavaScript' }, { language: 'TypeScript' },
  { language: 'C++' }, { language: 'Java' }, { language: 'Java' }
];

// Output Goal:
// [
//   { language: 'JavaScript', count: 2 },
//   { language: 'C++', count: 1 },
//   { language: 'TypeScript', count: 1 },
//   { language: 'Java', count: 2 }
// ]

// Method 1: Using forEach
const resultt = [];

data.forEach(item => {
  const index = resultt.findIndex(
    obj => obj.language === item.language
  );

  if (index !== -1) {
    resultt[index].count++;
  } else {
    resultt.push({ language: item.language, count: 1 });
  }
});
console.log(resultt);

// Method 2: Using reduce to return an Array
const result = Object.values(
  data.reduce((a, { language }) => (
    a[language] = a[language] || { language, count: 0 },
    a[language].count++,
    a
  ), {})
);

console.log(result);
```

---

## 8. Find Largest Number

**Description:**
Finding the largest number in an array using a loop.

```javascript
const arr = [10, 4, 25, 7];

let largest = -Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > largest) {
    largest = arr[i];
  }
}

console.log("Largest:", largest); // 25
```

---

## 9. Find Second Largest Number

**Description:**
Finding the second largest number in a single pass.

```javascript
const arr = [10, 4, 25, 7];

let largest = -Infinity;
let secondLargest = -Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > largest) {
    secondLargest = largest;
    largest = arr[i];
  } else if (arr[i] > secondLargest && arr[i] !== largest) {
    secondLargest = arr[i];
  }
}

if (secondLargest === -Infinity) {
  console.log("Second Largest: Not available");
} else {
  console.log("Second Largest:", secondLargest); // 10
}
```

---

## 10. Find Smallest Number

**Description:**
Finding the smallest number in an array.

```javascript
const arr = [10, 4, 25, 7];

let smallest = Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] < smallest) {
    smallest = arr[i];
  }
}

console.log("Smallest:", smallest); // 4
```

---

## 11. Find Second Smallest Number

**Description:**
Finding the second smallest number in a single pass.

```javascript
const arr = [10, 4, 25, 7];

let smallest = Infinity;
let secondSmallest = Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] < smallest) {
    secondSmallest = smallest;
    smallest = arr[i];
  } else if (arr[i] < secondSmallest && arr[i] !== smallest) {
    secondSmallest = arr[i];
  }
}

if (secondSmallest === Infinity) {
  console.log("Second Smallest: Not available");
} else {
  console.log("Second Smallest:", secondSmallest); // 7
}
```

---

## 12. Find Largest and Smallest Numbers

**Description:**
Finding both the largest and smallest numbers in the same loop.

```javascript
const arr = [-10, -5, -20, -3];

let largest = -Infinity;
let smallest = Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > largest) largest = arr[i];
  if (arr[i] < smallest) smallest = arr[i];
}

console.log("Largest:", largest);   // -3
console.log("Smallest:", smallest); // -20
```

---

## 13. Sort String (Manual Array Sort)

**Description:**
Sorting a string by first converting it to an array, performing a manual Bubble Sort, and then joining it back.

```javascript
let str = "bca";
let arr = [];

for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
}

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}

let sortedStr = "";
for (let i = 0; i < arr.length; i++) {
    sortedStr += arr[i];
}

console.log("Ascending order:", sortedStr);
```

---

## 14. Sort String (Manual String Sort with substring)

**Description:**
Sorting a string manually without converting to an array, using `substring` to handle character swaps.

```javascript
let str = "bca";

for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < str.length - 1; j++) {
        if (str[j] > str[j + 1]) {
            // Swap characters using substring
            let temp = str[j];
            str = str.substring(0, j) + str[j + 1] + str[j] + str.substring(j + 2);
        }
    }
}

console.log("Ascending order:", str);
```

---

## 15. Sort String (Manual Sort with Custom Substring)

**Description:**
Sorting a string manually using a custom `substring` function implementation to avoid built-in methods entirely.

```javascript
function customSubstring(str, start, end) {
    let result = '';
    for (let i = start; i < end; i++) {
        result += str[i];
    }
    return result;
}

let str = "bca";

for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < str.length - 1; j++) {
        if (str[j] > str[j + 1]) {
            // Swap characters using custom substring function
            let temp = str[j];
            str = customSubstring(str, 0, j) + str[j + 1] + str[j] + customSubstring(str, j + 2, str.length);
        }
    }
}

console.log("Ascending order:", str);
```

---

## 16. Check if Object is Empty

**Description:**
Checking if an object has no own enumerable properties.

```javascript
function isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
}

var emptyObject = {};
var object = {"foo": "bar"};

console.log(isObjEmpty(emptyObject)); // true
console.log(isObjEmpty(object));      // false
```

---

## 17. setTimeout Loop (Closure Trap)

**Description:**
The classic interview question demonstrating the difference between `let` (block scope) and `var` (function scope) in asynchronous loops.

```javascript
// Using let (Block Scope) - Works as expected
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // Outputs: 0, 1, 2
    }, 100);
}

// Using var (Function Scope) - Closure trap
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // Outputs: 3, 3, 3
    }, 100);
}
```

---

## 18. Scope and Hoisting (Global Variable)

**Description:**
Understanding how implicit global variables differ from declared variables.

```javascript
function fetch() {
    a = 5; // Reassigns the outer 'a'
    console.log(a);
}

let a; // Declared in outer scope
fetch(); // 5
```

---

## 19. Sort Array (Bubble Sort)

**Description:**
Sorting an array of numbers using the Bubble Sort algorithm.

```javascript
let arr = [5, 2, 9, 1, 6];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

console.log(arr); // [1, 2, 5, 6, 9]
```

---

## 20. Count Character Occurrence in String

**Description:**
Counting the frequency of each character in a string.

```javascript
function charCount(str) {
  var obj = {};

  for (var i = 0; i < str.length; i++) {
    var ch = str[i];
    obj[ch] = obj[ch] ? obj[ch] + 1 : 1;
  }

  return obj;
}

console.log(charCount("hello")); // { h: 1, e: 1, l: 2, o: 1 }
```

---

## 21. Find Frequency of Elements in Array

**Description:**
Counting the frequency of each element (numbers, strings, etc.) in an array.

```javascript
function frequency(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = obj[arr[i]] ? obj[arr[i]] + 1 : 1;
  }

  return obj;
}

console.log(frequency([1, 2, 2, 3, 3, 3])); // { '1': 1, '2': 2, '3': 3 }
```

---

## 22. Check Prime and Even Number

**Description:**
Standard utility functions to check if a number is Prime or Even.

```javascript
// Check Prime
function isPrime(n) {
  if (n <= 1) return false;

  for (var i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}

// Check Even
function isEven(n) {
  return n % 2 === 0;
}

console.log(isPrime(7)); // true
console.log(isEven(4));  // true
```

---

## 23. Remove Falsy Values from Array

**Description:**
Manually filtering out falsy values (like `false`, `0`, `""`, `null`, `undefined`, `NaN`) from an array without using `filter()`.

```javascript
function removeFalsy(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) result.push(arr[i]);
  }

  return result;
}

console.log(removeFalsy([0, 1, false, 2, "", 3])); // [1, 2, 3]
```

---

## 24. Predict Output: Pre-increment vs Post-increment

**Description:**
Understanding operator precedence and behavior between pre-increment (`++a`) and post-increment (`a++`).

```javascript
let a = 1;

// const b = ++a (2) + a++ (2 -> a becomes 3)
const b = ++a  + a++;

console.log(b); // 4
console.log(a); // 3
```

---

## 25. Generate Random Hex Color

**Description:**
Generating a random hexadecimal color code.

```javascript
function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

console.log(getRandomHexColor()); // e.g. #3fa2cc
```

---

## 26. Hoisting with Var

**Description:**
Demonstrating that variables declared with `var` are hoisted and initialized with `undefined`.

```javascript
console.log(a); // undefined
var a = 1;
```

---

## 27. Hoisting with Let (Temporal Dead Zone)

**Description:**
Demonstrating that variables declared with `let` are hoisted but are in the Temporal Dead Zone (TDZ) and cannot be accessed before declaration.

```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 1;
```
