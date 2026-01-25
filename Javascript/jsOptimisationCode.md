# Javascript Optimisation Code

## Table of Contents
1. [Simple Cache in JS](#simple-cache-in-js)
2. [Simple Cache in JS (Using Object)](#simple-cache-in-js-using-object)
3. [Simple Cache in JS (Using Map)](#simple-cache-in-js-using-map)
4. [JS Cache with TTL (Expiry) using Map](#js-cache-with-ttl-expiry-using-map)
5. [LRU Cache (Map based)](#lru-cache-map-based)
6. [LRU vs FIFO vs LFU](#lru-vs-fifo-vs-lfu)
7. [Performance Comparison: Array.includes vs Set.has](#performance-comparison-arrayincludes-vs-sethas)
8. [Performance Comparison: Array of Objects vs Map](#performance-comparison-array-of-objects-vs-map)
9. [Performance Comparison: Normal Loop Find vs Map Lookup](#performance-comparison-normal-loop-find-vs-map-lookup)

---

## 1. Simple Cache in JS

Simple Cache in JS means storing data in memory so next time you don't call the API again.

**Simple Cache (Theory)**

*   **Without cache**: Every time -> API call (slow)
*   **With cache**:
    1.  1st time -> API call + store result
    2.  2nd time -> return stored result (fast)

## 2. Simple Cache in JS (Using Object)

```javascript
const cache = {}; // simple cache store

async function getUser(id) {
  // if cached return directly
  if (cache[id]) {
    console.log("From Cache:", id);
    return cache[id];
  }

  console.log("API Call:", id);
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();

  // store in cache
  cache[id] = data;

  return data;
}

// Test
getUser(1).then(console.log); // API call
getUser(1).then(console.log); // from cache
getUser(2).then(console.log); // API call
getUser(2).then(console.log); // from cache
```

## 3. Simple Cache in JS (Using Map)

```javascript
const cache = new Map();

async function getUser(id) {
  if (cache.has(id)) {
    console.log("From Cache:", id);
    return cache.get(id);
  }

  console.log("API Call:", id);
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();

  cache.set(id, data);
  return data;
}
```

**Why Map is better than Object?**

*   Supports any key type (number/object)
*   Faster for large cache
*   Easy `.has()`, `.get()`, `.delete()` methods

## 4. JS Cache with TTL (Expiry) using Map

**Working:**

*   If data exists + not expired -> return from cache
*   If expired -> remove + call API again

**Code:**

```javascript
const cache = new Map();
const TTL = 10 * 1000; // 10 seconds (you can change to 10 mins => 10 * 60 * 1000)

async function getUserWithTTL(id) {
  const now = Date.now();

  // Check cache
  if (cache.has(id)) {
    const cachedValue = cache.get(id);

    // Check expiry
    if (now - cachedValue.time < TTL) {
      console.log("From Cache (Not Expired):", id);
      return cachedValue.data;
    } else {
      console.log("Cache Expired, Removing:", id);
      cache.delete(id);
    }
  }

  // If not cached or expired, call API
  console.log("API Call:", id);
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();

  // Store with timestamp
  cache.set(id, { data, time: now });

  return data;
}

// ===================
// Testing
// ===================
(async () => {
  console.log(await getUserWithTTL(1)); // API call
  console.log(await getUserWithTTL(1)); // from cache (fast)

  // wait 11 seconds to expire
  setTimeout(async () => {
    console.log(await getUserWithTTL(1)); // cache expired => API call again
  }, 11000);
})();

/* Output Example:
API Call: 1
From Cache (Not Expired): 1
Cache Expired, Removing: 1
API Call: 1
*/
```

**When TTL Cache is Useful?**

*   Stock data (refresh every 5 sec / 10 sec)
*   Dashboard counts (refresh every 1 min)
*   Profile data (refresh every 10 min)
*   Master data (refresh every 1 hour)

## 5. LRU Cache (Map based)

LRU Cache (Map based) is an in-memory cache. So when the web app/tab/browser is closed or refreshed -> cache is gone. Because it stays only in RAM (memory). Same like normal JS variables.

**LRU Cache vs Redux (Persistence)**

**LRU Cache:**
*   Stored in memory (RAM)
*   Fastest
*   Removed on: page refresh, tab close, browser close.
*   So LRU cache = temporary cache

**Redux Store (Normal):**
*   Redux data also stays in memory only.
*   So Redux also resets when: refresh, close tab.
*   Unless you use `redux-persist`.

**If you want cache even after app closed:**
Then you need Persistent Storage like:
*   **Browser**:
    *   localStorage (stays even after close)
    *   sessionStorage (removed when tab closes)
    *   IndexedDB (best for large data)
    *   Service Worker Cache (PWA)
*   **Mobile (React Native)**:
    *   AsyncStorage / MMKV / SQLite

**LRU Cache (Theory) – Simple Explanation**
LRU Cache stands for Least Recently Used Cache. It is a caching technique where we store a limited number of items in memory, and when the cache becomes full, it removes the item that was used least recently (oldest unused).

**Why we need LRU Cache?**
Because cache memory is limited. If we keep storing data continuously:
*   Memory will increase
*   App becomes slow / crash

So LRU cache helps to:
*   Keep cache size fixed
*   Improve performance
*   Avoid memory overflow

**How LRU Works (Main Logic)**
LRU cache always tracks which item was used recently.

Rules:
*   If item is already in cache -> return it and mark it as most recently used.
*   If item is not in cache -> fetch from API/DB and store it.
*   If cache is full and new item comes -> remove least recently used item.

**Example (Easy)**
Cache size = 3

1.  Add A -> [A]
2.  Add B -> [A, B]
3.  Add C -> [A, B, C] (cache full)
4.  Now you access A again -> A becomes most recently used: [B, C, A]
5.  Now add D -> cache full, remove B (least recently used): [C, A, D]

So B removed because it was not used for long time.

**LRU Cache Advantages**
*   Faster access (cache hit)
*   Controlled memory usage
*   Best for frequently repeated data

## 6. LRU vs FIFO vs LFU

Here is LRU vs FIFO vs LFU in simple theory.

**1) FIFO Cache (First In First Out)**
Meaning: The oldest inserted item will be removed first.

Example (size = 3):
1.  Add A -> [A]
2.  Add B -> [A, B]
3.  Add C -> [A, B, C]
4.  Add D -> remove A -> [B, C, D]

Simple but not smart because it doesn't care which data is used most.

**2) LRU Cache (Least Recently Used)**
Meaning: The item not accessed recently will be removed.

Example (size = 3):
1.  Add A -> [A]
2.  Add B -> [A, B]
3.  Add C -> [A, B, C]
4.  Use A again -> [B, C, A]
5.  Add D -> remove B -> [C, A, D]

Smart for real apps because it keeps recent used data.

**3) LFU Cache (Least Frequently Used)**
Meaning: The item with minimum frequency (count) is removed.

Example (size = 3):
*   A used 5 times
*   B used 2 times
*   C used 1 time
*   Add D -> remove C (least used) -> keep A, B, D

Best when frequency matters (like trending data), but more complex to implement.

**Quick Comparison Table**

| Cache Type | Removes | Best For |
| :--- | :--- | :--- |
| FIFO | Oldest inserted | Simple caching |
| LRU | Least recently used | API caching, UI caching |
| LFU | Least frequently used | Analytics / repeated patterns |

**Which is best in real projects?**
Most used in apps = **LRU**. Because user generally reopens recent screens/data again.

## 7. Performance Comparison: Array.includes vs Set.has

```javascript
const hugeArray = Array.from({ length: 100000 }, (_, i) => i);
const itemsToCheck = [99999, 50000, 12345];

console.log("===== FULL COMPARISON =====");

// Array.includes total
let start1 = performance.now();

itemsToCheck.forEach((item) => {
  hugeArray.includes(item);
});

let end1 = performance.now();
console.log("Array.includes() Total Time:", (end1 - start1).toFixed(4), "ms");


// Set.has total (including set creation)
const lookupSet = new Set(hugeArray);
let start2 = performance.now();

 // setup cost included
itemsToCheck.forEach((item) => {
  lookupSet.has(item);
});

let end2 = performance.now();
console.log("Set.has() Total Time (with Set creation):", (end2 - start2).toFixed(4), "ms");
```

## 8. Performance Comparison: Array of Objects vs Map

```javascript
const hugeObjects = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  name: `User${i}`,
  age: 20 + (i % 50),
  city: "Pune",
  role: "Dev",
  active: true,
  salary: 10000 + i,
  dept: "IT",
  level: i % 5,
  createdAt: Date.now()
}));

const itemsToCheck = [99999, 50000, 12345];

console.log("===== ARRAY OF OBJECTS COMPARISON =====");


// =====================================
// 1) Normal Loop / Array.some (O(n*m))
// =====================================
let start1 = performance.now();

itemsToCheck.forEach((targetId) => {
  hugeObjects.some(obj => obj.id === targetId);
});

let end1 = performance.now();
console.log("Array.some() Total Time:", (end1 - start1).toFixed(4), "ms");


// =====================================
// 2) Map lookup (Build + O(1*m))
// =====================================

// Build Map first (setup cost)
let buildStart = performance.now();

const lookupMap = new Map();
hugeObjects.forEach(obj => lookupMap.set(obj.id, obj));

let buildEnd = performance.now();

console.log("Map Build Time:", (buildEnd - buildStart).toFixed(4), "ms");


// Lookup time
let start2 = performance.now();

itemsToCheck.forEach((targetId) => {
  lookupMap.has(targetId); // O(1)
});

let end2 = performance.now();
console.log("Map.has() Lookup Time:", (end2 - start2).toFixed(4), "ms");

console.log("Map Total Time (Build + Lookup):", ((buildEnd - buildStart) + (end2 - start2)).toFixed(4), "ms");
```

## 9. Performance Comparison: Normal Loop Find vs Map Lookup

```javascript
// 1 lakh objects create
const size = 100000;
const arr = [];

for (let i = 1; i <= size; i++) {
  arr.push({
    id: i,
    name: `User${i}`,
    age: 20 + (i % 50)
  });
}

// Target to find (near end so loop will take more time)
const targetId = 99999;

console.log("Array size:", arr.length);
console.log("Target ID:", targetId);



// ===============================
// 1) Normal Loop Find (O(n))
// ===============================
let start1 = performance.now(); // start time

let found1 = null;
for (let i = 0; i < arr.length; i++) {
  if (arr[i].id === targetId) {
    found1 = arr[i];
    break;
  }
}

let end1 = performance.now(); // end time

console.log("\n--- Normal Loop O(n) ---");
console.log("Found:", found1);
console.log("Start Time:", start1.toFixed(2));
console.log("End Time:", end1.toFixed(2));
console.log("Total Time (ms):", (end1 - start1).toFixed(2));



// ===============================
// 2) Map Lookup (O(1))
// ===============================

// Create Map first (O(n) one time)
let mapStart = performance.now();

const map = new Map();
for (let i = 0; i < arr.length; i++) {
  map.set(arr[i].id, arr[i]);
}

let mapEnd = performance.now();

console.log("\n--- Map Build Time O(n) (One Time) ---");
console.log("Start Time:", mapStart.toFixed(2));
console.log("End Time:", mapEnd.toFixed(2));
console.log("Total Time (ms):", (mapEnd - mapStart).toFixed(2));


// Now find using map (O(1))
let start2 = performance.now();

let found2 = map.get(targetId);

let end2 = performance.now();

console.log("\n--- Map Lookup O(1) ---");
console.log("Found:", found2);
console.log("Start Time:", start2.toFixed(2));
console.log("End Time:", end2.toFixed(2));
console.log("Total Time (ms):", (end2 - start2).toFixed(2));
```
