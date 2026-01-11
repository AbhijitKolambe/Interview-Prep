Difference Between null and undefined (JavaScript Interview Answer)
1. undefined

Means a variable has been declared but not assigned a value

It is the default value given by JavaScript

Indicates absence of value automatically

let a;
console.log(a); // undefined


When you get undefined:

Variable declared but not initialized

Function does not return a value

Accessing a non-existing object property

Missing function parameters

function test() {}
console.log(test()); // undefined

2. null

Means intentional absence of a value

Assigned explicitly by the developer

Represents an empty or cleared value

let b = null;
console.log(b); // null


When to use null:

Resetting a variable

Representing “no value” intentionally

Clearing object references

let user = { name: "Abhi" };
user = null; // intentional reset

Key Differences (Interview Table)
Feature	undefined	null
Meaning	Value not assigned	Intentional empty value
Assigned by	JavaScript	Developer
Type	undefined	object (JS bug)
Use case	Uninitialized state	Explicit reset
Equality (==)	Equal to null	Equal to undefined
Strict equality (===)	❌ Not equal	❌ Not equal
null == undefined   // true
null === undefined  // false

Important Interview Points ⭐

typeof undefined → "undefined"

typeof null → "object" (this is a well-known JavaScript bug)

Prefer null when you want to explicitly say “no value”

Avoid manually assigning undefined



