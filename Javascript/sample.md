# Difference Between null and undefined (JavaScript Interview Answer)

## 1. undefined

Means a variable has been declared but not assigned a value.
It is the default value given by JavaScript.
Indicates absence of value automatically.

```javascript
let a;
console.log(a); // undefined
```

**When you get undefined:**
*   Variable declared but not initialized
*   Function does not return a value
*   Accessing a non-existing object property
*   Missing function parameters

```javascript
function test() {}
console.log(test()); // undefined
```

## 2. null

Means intentional absence of a value.
Assigned explicitly by the developer.
Represents an empty or cleared value.

```javascript
let b = null;
console.log(b); // null
```

**When to use null:**
*   Resetting a variable
*   Representing "no value" intentionally
*   Clearing object references

```javascript
let user = { name: "Abhi" };
user = null; // intentional reset
```

## Key Differences (Interview Table)

| Feature | undefined | null |
| :--- | :--- | :--- |
| Meaning | Value not assigned | Intentional empty value |
| Assigned by | JavaScript | Developer |
| Type | undefined | object (JS bug) |
| Use case | Uninitialized state | Explicit reset |
| Equality (==) | Equal to null | Equal to undefined |
| Strict equality (===) | Not equal | Not equal |

```javascript
null == undefined   // true
null === undefined  // false
```

## Important Interview Points

*   `typeof undefined` -> "undefined"
*   `typeof null` -> "object" (this is a well-known JavaScript bug)
*   Prefer null when you want to explicitly say "no value"
*   Avoid manually assigning undefined

# Shallow Copy vs Deep Copy (JavaScript Interview)

## What is a Shallow Copy?

A shallow copy copies only the first level of an object/array.
If the object has nested objects, they are copied by reference, not value.

Changes in nested data affect both original & copied object.

### Shallow Copy Example

```javascript
let obj1 = {
  name: "Abhi",
  address: {
    city: "Pune"
  }
};

let obj2 = { ...obj1 }; // shallow copy

obj2.address.city = "Mumbai";

console.log(obj1.address.city); // Mumbai
console.log(obj2.address.city); // Mumbai
```

**Why?**
*   name -> copied by value
*   address -> copied by reference

### Shallow Copy Methods (Interview List)
*   Spread operator `{...obj}`
*   `Object.assign()`
*   Array spread `[...arr]`
*   `Array.slice()`

## What is a Deep Copy?

A deep copy creates a completely independent copy, including all nested objects.
Changes in copied object DO NOT affect original.

### Deep Copy Example (JSON method)

```javascript
let obj1 = {
  name: "Abhi",
  address: {
    city: "Pune"
  }
};

let obj2 = JSON.parse(JSON.stringify(obj1));

obj2.address.city = "Mumbai";

console.log(obj1.address.city); // Pune
console.log(obj2.address.city); // Mumbai
```

### Limitation of JSON Deep Copy (Interview Trap)

Does NOT support:
*   Functions
*   undefined
*   Date
*   Map, Set
*   Circular references

```javascript
let obj = {
  date: new Date(),
  sayHi: function() {}
};

JSON.parse(JSON.stringify(obj)); // data loss
```

### Shallow Copy Example (Array)

```javascript
let arr1 = [1, 2, [3, 4]];

let arr2 = [...arr1]; // shallow copy

arr2[2][0] = 99;

console.log(arr1); // [1, 2, [99, 4]]
console.log(arr2); // [1, 2, [99, 4]]
```

**Explanation (Interview)**
*   1, 2 -> copied by value
*   [3,4] -> copied by reference
*   Change in nested array affects original

### Other Shallow Copy Ways (Array)

```javascript
let arr2 = arr1.slice();

let arr2 = Array.from(arr1);
```

All are shallow copies.

## Deep Copy with Array

A deep copy creates a completely independent array, including nested arrays.

### Deep Copy Example (JSON method)

```javascript
let arr1 = [1, 2, [3, 4]];

let arr2 = JSON.parse(JSON.stringify(arr1));

arr2[2][0] = 99;

console.log(arr1); // [1, 2, [3, 4]]
console.log(arr2); // [1, 2, [99, 4]]
```

### JSON Deep Copy Limitation (Interview Trap)

```javascript
let arr = [1, undefined, function(){}, new Date()];

let copy = JSON.parse(JSON.stringify(arr));

console.log(copy); // [1, null, null, "2026-01-12T..."]
```

### Custom Deep Copy (Interview-Perfect)

```javascript
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
  }

  return copy;
}
```

Usage:
```javascript
let newObj = deepCopy(oldObj);
```

## Shallow vs Deep Copy (Comparison Table)

| Feature | Shallow Copy | Deep Copy |
| :--- | :--- | :--- |
| Nested object | Shared reference | Fully copied |
| Performance | Fast | Slower |
| Memory | Low | Higher |
| Use case | Flat objects | Complex objects |

## Interview One-Line Answers

**Q: What is shallow copy?**

A shallow copy copies only top-level properties and shares references for nested objects.

**Q: What is deep copy?**

A deep copy creates a completely independent copy including nested objects.

**Q: Spread operator does deep or shallow copy?**

Spread operator creates a shallow copy.







