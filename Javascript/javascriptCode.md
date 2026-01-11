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

---
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
```

---
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
<br>
<br>
<br>

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
