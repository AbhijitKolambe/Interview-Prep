# React Interview Guide - Complete Questions & Answers

## Table of Contents
1. [React Performance & Debugging](#react-performance--debugging)
2. [Authentication & Protected Routes](#authentication--protected-routes)
3. [API Error Handling](#api-error-handling)
4. [State Management](#state-management)
5. [Performance Optimization](#performance-optimization)
6. [Advanced React Concepts](#advanced-react-concepts)
7. [JavaScript Fundamentals](#javascript-fundamentals)
8. [HTML & CSS Basics](#html--css-basics)
9. [Coding Problems](#coding-problems)
10. [Code Examples](#code-examples)

---

## React Performance & Debugging

### Question 1: Your React app suddenly becomes slow after adding new features. How do you find and fix the issue?

**How to Debug:**

1. **Chrome DevTools - Performance Tab**
   - Record performance to find long tasks, slow renders, memory leaks

2. **React DevTools - Profiler**
   - Detect unnecessary re-renders and components causing slowdowns

3. **Avoid Unnecessary Re-Renders**
   - Use React.memo
   - Use useMemo
   - Use useCallback

4. **Virtualization for Large Lists**
   - Use react-window or react-virtualized to render only visible items

5. **Avoid Inline Functions & Objects**
   - Inline props cause re-creation on every render, triggering child re-renders

**Real-world Example:**
An e-commerce app showing 10,000 products without virtualization will lag. With virtualization, only visible items render and performance improves dramatically.

---

## Authentication & Protected Routes

### Question 2: How do you prevent the login page from being accessible after the user is logged in?

**Solution:**

1. **Use Protected Routes**
   - Restrict routes based on authentication status

2. **Maintain Global Auth State**
   - Keep isAuthenticated flag using Context API or Redux

3. **Conditional Routing**
   ```jsx
   {isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
   ```

4. **Redirect After Login**
   - If already logged in, redirect user to dashboard

**Real-world Example:**
Banking apps never allow access to the login page after login unless you log out.

---

## API Error Handling

### Question 3: How do you handle API errors gracefully in the UI?

**Best Practices:**

1. **Use try-catch or .catch()**
   - Handle errors appropriately

2. **Show User-Friendly Messages**
   - Example: "Something went wrong. Please try again."

3. **Use Toast Notifications**
   - Show error/success messages non-intrusively

4. **Show Fallback UI**
   - Error screen, retry button, skeleton loader

5. **Retry Mechanism**
   - Allow user to retry failed requests

6. **Use Error Boundaries**
   - Catch rendering errors at component level

7. **Categorize Errors**
   - Network error
   - Server error
   - Unauthorized (401)
   - Forbidden (403)

**Real-world Example:**
Food delivery app says "Restaurant is currently unavailable" instead of showing a blank screen or error stack.

---

## State Management

### Question 4: A component is fetching the same data multiple times unnecessarily. How would you fix it?

**Solutions:**

1. **Use React Query / TanStack Query**
   - Built-in caching and background refetching

2. **Store Data in Global State**
   - Use Context API or Redux to avoid duplicate fetching

3. **Use useMemo for Derived Data**
   - Prevent expensive recalculations

4. **Conditional Fetching**
   - Only fetch if data doesn't exist: `if (!data) fetchData();`

**Real-world Example:**
On a dashboard, if 5 charts fetch the same user profile, fetch once globally and reuse it.

---

## Performance Optimization

### Question 5: How do you optimize bundle size in a large React app?

**Optimization Techniques:**

1. **Code Splitting**
   ```javascript
   const Dashboard = React.lazy(() => import("./Dashboard"));
   ```

2. **Tree Shaking**
   - Remove unused code via Webpack / Vite

3. **Dynamic Imports**
   ```javascript
   import("chart-library").then(...)
   ```

4. **Asset Optimization**
   - Compress images, fonts, videos

5. **Caching Static Files**
   - Use browser cache, CDN, service workers

6. **Remove Unused Dependencies**
   - Regularly audit and clean dependencies

---

## Advanced React Concepts

### Question 6: How to detect and fix unnecessary re-renders?

**Step 1: Detect Unnecessary Re-renders**
- Use React DevTools → Profiler

**Step 2: Fix with React.memo**
```javascript
const ProductCard = React.memo(({ product }) => {
  console.log("Rendered");
  return <div>{product.name}</div>;
});
```

**Step 3: Fix Expensive Calculations using useMemo**
```javascript
const totalPrice = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price, 0);
}, [cart]);
```

**Step 4: Avoid Inline Functions using useCallback**
```javascript
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

**Step 5: Virtualization for Large Lists**
```javascript
import { FixedSizeList as List } from "react-window";

<List
  height={500}
  itemCount={10000}
  itemSize={35}
  width={300}
>
  {({ index, style }) => <div style={style}>Item {index}</div>}
</List>
```

**Result:** Only visible rows render, leading to massive performance boost.

---

### Question 7: Prevent Login Page After User is Logged In (Protected Routes)

**Auth Context:**
```javascript
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Protected Route:**
```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to="/login" />;
};
```

**Route Setup:**
```jsx
<Route path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Redirect Logged-in Users from Login:**
```javascript
if (isAuth) return <Navigate to="/dashboard" />;
```

Used in: Banking, E-commerce, SaaS Apps

---

### Question 8: Handling API Errors Gracefully in React UI

**API Call with Try-Catch:**
```javascript
const fetchData = async () => {
  try {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    setUser(data);
  } catch (err) {
    setError(err.message);
  }
};
```

**Show Toast Error:**
```jsx
{error && <Toast message="Something went wrong!" />}
```

**Retry Button:**
```jsx
<button onClick={fetchData}>Retry</button>
```

**Error Boundary:**
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
```

**Why this matters:** Prevents white screen of death in production.

---

### Question 9: Prevent Multiple API Calls for Same Data

**Using React Query (BEST PRACTICE):**
```javascript
const { data, isLoading } = useQuery(
  ["users"],
  fetchUsers,
  { staleTime: 60000 }
);
```

**Using Context Cache:**
```javascript
if (!users.length) fetchUsers();
```

**Using Redux:**
- Store API result once → reuse everywhere

**Avoid Re-fetch with useEffect:**
```javascript
useEffect(() => {
  fetchData();
}, []); // Avoids multiple calls
```

**Real-world Use:** Dashboards, Notifications, Profile APIs

---

### Question 10: Optimizing Bundle Size in Large React App

**Code Splitting with Lazy + Suspense:**
```javascript
const Dashboard = React.lazy(() => import("./Dashboard"));

<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>
```

**Dynamic Imports:**
```javascript
import("chart.js").then(chart => {
  chart.render();
});
```

**Tree Shaking (Webpack/Vite default):**
```javascript
import { debounce } from "lodash"; // BAD
import debounce from "lodash/debounce"; // GOOD
```

---

### Question 11: How to optimize large Redux datasets (10,000+ records)?

**Best Practices:**

1. **Never store huge datasets at once**
   - Use server-side pagination or cursor-based pagination

2. **Normalize Redux State**
   ```javascript
   {
     users: { byId: {}, allIds: [] }
   }
   ```
   - Prevents duplication and improves lookup speed

3. **Use Selectors with Memoization**
   ```javascript
   import { createSelector } from '@reduxjs/toolkit';
   ```
   - Avoids unnecessary recalculations

4. **Virtualize Rendering**
   - Use react-window or react-virtualized
   - Render only visible rows

5. **Avoid Deeply Nested State**
   - Flat structure equals faster updates

6. **Use Redux Toolkit**
   - Faster, less boilerplate, better performance

**Interview One-Line:**
"I optimize large Redux datasets using server-side pagination, normalized state, memoized selectors, and list virtualization."

---

### Question 12: How to handle slow APIs in the UI? (5-10 sec delay)

**UI/UX Improvements:**

1. Skeleton Loaders / Shimmer
2. Central Loader
3. Optimistic UI (if applicable)
4. React Query / Caching
5. Lazy Loading Components
6. Timeout + Retry Button
7. Network Error Handling

**Example:**
```javascript
const { data, isLoading } = useQuery("users", fetchUsers);
```

**Interview One-Line:**
"For slow APIs, I use loaders, skeleton UI, caching, background refetch, and retry mechanisms for better UX."

---

### Question 13: How to secure JWT authentication in React?

**Best Security Practices:**

1. Store Access Token in HTTP-Only Secure Cookie
2. Use Refresh Token Flow
3. Short Expiry for Access Token
4. Enable CORS, SameSite, Secure Flags
5. Never store JWT in localStorage for banking apps
6. Validate token on every API call using middleware

**Token Flow:**
```
Login → Access Token (short expiry)
     → Refresh Token (long expiry)
```

**Interview One-Line:**
"I secure JWT using HTTP-only cookies, refresh tokens, short expiry, and server-side validation middleware."

---

### Question 14: How to avoid dashboard re-rendering with multiple charts & filters?

**Optimization Techniques:**

1. Fetch API at Parent Only
2. Pass Data via Props
3. Use React.memo() for Charts
4. Use useMemo for Computed Data
5. Use useCallback for Filter Handlers
6. Avoid Inline Objects & Functions
7. Single Global Loader

**Example:**
```javascript
const Chart = React.memo(({ data }) => { ... });
```

**Interview One-Line:**
"I prevent dashboard re-renders by lifting data to parent, memoizing charts, and caching handlers and computed values."

---

### Question 15: How SSR improves SEO?

**CSR vs SSR Comparison:**

| Aspect | CSR (CRA) | SSR (Next.js) |
|--------|-----------|---------------|
| HTML on load | Empty | Fully rendered |
| Google crawling | Waits for JS | Crawls instantly |
| SEO | Poor | Excellent |
| First paint | Slower | Faster |

**SSR Benefits:**

1. Better Google indexing
2. Faster First Contentful Paint (FCP)
3. Social media preview works
4. Better Lighthouse score

**Interview One-Line:**
"SSR improves SEO because search engines receive fully rendered HTML instead of an empty JavaScript shell."

---

### Question 16: Why use Next.js instead of CRA?

**Key Advantages of Next.js:**

1. Built-in SSR & SSG
2. File-based routing
3. API routes (Backend + Frontend)
4. Automatic code splitting
5. Image optimization
6. SEO-friendly out of the box
7. Better performance

**CRA Limitations:**

1. Client-Side Rendering only
2. Poor SEO
3. Manual optimization required

**Interview One-Line:**
"Next.js gives built-in SEO, SSR, API routes, and production-level performance which CRA lacks."

---

### Question 17: How debouncing improves search performance?

**Without Debounce:**
- API called on every keystroke
- Server overload
- Poor UX

**With Debounce:**
- API is called only after user stops typing

**Working Logic:**
```javascript
setTimeout(() => callAPI(value), 500);
```

**Benefits:**

1. Fewer API calls
2. Better performance
3. Saves server cost
4. Smooth UX

**Interview One-Line:**
"Debouncing prevents unnecessary API calls by waiting until the user stops typing before firing the request."

---

### Question 18: How virtualization improves table performance?

**Problem Without Virtualization:**
- 10,000+ DOM nodes
- High memory usage
- Page lag & crashes

**With Virtualization:**
- Only visible rows are rendered
- DOM size is minimal
- Smooth scrolling

**Tools:**
- react-window
- react-virtualized

**Example Use Cases:**
- Large logs table
- CRM transactions
- Stock market dashboards

**Interview One-Line:**
"Virtualization boosts performance by rendering only visible rows instead of the entire dataset."

---

## JavaScript Fundamentals

### Question 19: Difference Between Block-Level and Inline Elements

**Answer:**

- **Block elements:** Take full width and start on a new line
  - Examples: div, p, section

- **Inline elements:** Take only required width
  - Examples: span, a, strong

---

### Question 20: Difference Between var, let, and const

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function / Global | Block | Block |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |
| Hoisting | Yes (undefined) | TDZ | TDZ |

Notes:
- let and const are block-scoped
- var is function-scoped
- const must be initialized at declaration

---

### Question 21: What is Hoisting?

**Answer:**
Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope before execution.

**Example:**
```javascript
console.log(a); // undefined
var a = 5;
```

---

### Question 22: Difference Between Arrow Function and Normal Function

| Feature | Normal Function | Arrow Function |
|---------|-----------------|----------------|
| Syntax | Longer | Shorter |
| this | Dynamic | Lexical |
| Constructor | Yes | No |
| arguments object | Yes | No |

Note: Arrow functions don't have their own this.

---

### Question 23: Difference Between == and ===

- `==` → Compares value only
- `===` → Compares value + type

**Example:**
```javascript
2 == "2"   // true
2 === "2"  // false
```

---

### Question 24: What is Closure?

**Answer:**
A closure gives access to an outer function's variables even after the outer function has finished execution.

**Example:**
```javascript
function outer() {
  let count = 0;
  return function() {
    return count++;
  };
}

const counter = outer();
counter(); // 0
counter(); // 1
```

---

### Question 25: What is a Pure Function?

**Answer:**
A pure function:
- Always returns the same output for the same input
- Has no side effects

**Example:**
```javascript
function add(a, b) {
  return a + b;
}
```

---

### Question 26: What is the Event Loop?

**Answer:**
The event loop continuously:
1. Checks if the call stack is empty
2. Moves tasks from Callback Queue and Microtask Queue into the call stack for execution

This enables non-blocking asynchronous execution.

---

### Question 27: Difference Between Async/Await and Promises

| Feature | Promises | Async/Await |
|---------|----------|------------|
| Syntax | Uses .then() & .catch() | Uses await |
| Readability | Less readable | More readable |
| Style | Callback-style | Synchronous-looking |

---

### Question 28: Difference Between map, filter, and reduce

| Method | Returns | Purpose |
|--------|---------|---------|
| map | New array | Transform data |
| filter | New array | Filter data |
| reduce | Single value | Aggregate data |

**map() Example:**
```javascript
const arr = [1, 2, 3];
const doubled = arr.map(n => n * 2);
```

**filter() Example:**
```javascript
const even = arr.filter(n => n % 2 === 0);
```

---

### Question 29: Difference Between Debouncing and Throttling

| Aspect | Debouncing | Throttling |
|--------|-----------|-----------|
| Execution | After delay | At fixed interval |
| Used in | Search | Scroll |

---

### Question 30: Floating Point Issue: 0.1 + 0.2 === 0.3

**Output:** false

**Reason:** Floating-point precision error in JavaScript

---

### Question 31: Object Reference Example

```javascript
let obj = { a: 1 };
let copy = obj;
copy.a = 5;
console.log(obj.a); // 5
```

**Reason:** Objects are copied by reference, not by value.

---

### Question 32: Reverse a String Without reverse()

```javascript
function reverseStr(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}
```

---

### Question 33: Remove Duplicate Values from Array

```javascript
function removeDuplicates(arr) {
  let result = [];
  for (let i of arr) {
    if (!result.includes(i)) result.push(i);
  }
  return result;
}
```

---

### Question 34: What is Event Delegation and Why Is It Used?

**Answer:**
Event delegation is attaching one event listener to a parent instead of many children using event.target.

**Benefits:**
- Improves performance
- Handles dynamically added elements

---

### Question 35: Why [] === [] is false?

**Answer:** Arrays are compared by reference, not by value.

---

## HTML & CSS Basics

### Question 36: What new tags were introduced in HTML5?

**Answer:**
HTML5 introduced semantic tags such as:
- header, footer, nav, section, article, figure, figcaption, main, aside, video, audio, canvas, picture

These improve SEO, accessibility, and code readability.

---

### Question 37: What are Semantic Tags and why are they important?

**Answer:**
Semantic tags clearly describe the purpose of content.

**Benefits:**
1. Search engines understand page structure
2. Improve SEO
3. Improve screen-reader accessibility
4. Make code more readable

---

### Question 38: Difference between ID and Class

| Aspect | ID | Class |
|--------|----|----|
| Uniqueness | Unique | Can be reused |
| Priority | Higher | Lower |
| Usage | Used once | Used multiple times |
| Selector | #id | .class |

Note: Prefer class for styling, id for unique JS access.

---

### Question 39: Difference between Inline, Block, and Inline-Block

**Answer:**

- **Inline:** No new line, no width/height
  - Examples: span, a, strong

- **Block:** Takes full width, starts new line
  - Examples: div, p, section

- **Inline-block:** Inline + supports width & height

---

### Question 40: Difference between Relative, Absolute, Fixed, Sticky

**Answer:**

- **Relative:** Moves relative to itself
- **Absolute:** Relative to nearest positioned parent
- **Fixed:** Relative to viewport, never moves
- **Sticky:** Acts relative first, then fixed after scroll threshold

---

### Question 41: Difference between LocalStorage, SessionStorage & Cookies

| Storage | Persistence | Server Access | Size |
|---------|-------------|---------------|------|
| LocalStorage | Permanent | No | ~5MB |
| SessionStorage | Until tab close | No | ~5MB |
| Cookies | Configurable | Yes | ~4KB |

Note: Banking apps use Cookies (HTTP-Only, Secure) for tokens.

---

### Question 42: Difference between visibility: hidden and display: none

**Answer:**

- **visibility: hidden** → Element invisible but space remains
- **display: none** → Element removed completely from layout

---

### Question 43: Pseudo-class vs Pseudo-element

**Answer:**

- **Pseudo-class:** :hover, :focus, :active
- **Pseudo-element:** ::before, ::after

---

### Question 44: Difference Between px, %, and em

| Unit | Meaning |
|------|---------|
| px | Fixed size |
| % | Relative to parent |
| em | Relative to parent font size |

---

### Question 45: How to Make a Website Mobile Friendly?

**Answer:**

1. Media queries
2. Flexbox & Grid
3. Relative units (%, em, rem)
4. Responsive images

---

### Question 46: Difference Between CSS Grid and Flexbox

**Answer:**

- **Flexbox** → 1D layout (row or column)
- **CSS Grid** → 2D layout (row + column)

---

### Question 47: How to Make Images Responsive

```css
img {
  max-width: 100%;
  height: auto;
}
```

---

## React Fundamentals

### Question 48: Difference Between Functional and Class Components

| Feature | Functional | Class |
|---------|-----------|-------|
| Uses | Hooks | Lifecycle |
| Syntax | render() not needed | Needs render() |
| Boilerplate | Less | More |
| Modern Status | Preferred now | Legacy use |

---

### Question 49: What are React Hooks?

**Answer:**
Hooks allow state, lifecycle, and side-effect handling in functional components.

**Common hooks:**
- useState
- useEffect
- useMemo
- useCallback
- useRef

---

### Question 50: Controlled vs Uncontrolled Components

| Aspect | Controlled | Uncontrolled |
|--------|-----------|-------------|
| State Management | React manages | DOM manages |
| Implementation | Uses useState | Uses useRef |
| Predictability | Predictable | Less predictable |

---

### Question 51: What is Prop Drilling? How to Avoid It?

**Answer:**
Prop drilling is passing props through multiple intermediate components.

**Solutions:**
1. Context API
2. Redux / Redux Toolkit

---

### Question 52: How Does React.memo Work?

**Answer:**
React.memo prevents unnecessary re-rendering of a component if props don't change.

**Usage:**
```javascript
export default React.memo(MyComponent);
```

Note: Works only for functional components

---

### Question 53: Difference Between useMemo and useCallback

| Aspect | useMemo | useCallback |
|--------|---------|-----------|
| Memoizes | Values | Functions |
| Use Case | Heavy computation | Callback re-creation |

---

### Question 54: Why is key Important in Lists?

**Answer:**
- Helps React track list items
- Improves reconciliation
- Prevents UI bugs

Without key, rendering and performance issues occur.

---

### Question 55: Difference Between <a> Tag and <Link> in React

| Aspect | <a> Tag | <Link> |
|--------|---------|--------|
| Page reload | Yes | No |
| Navigation | Server-side | Client-side |
| SPA Impact | Breaks SPA | Maintains SPA |

---

### Question 56: What is Virtual DOM?

**Answer:**
Virtual DOM is a lightweight copy of the real DOM used to optimize performance by updating only changed elements.

---

### Question 57: What is Reconciliation?

**Answer:**
Reconciliation is React's process of comparing old and new Virtual DOM and updating only the changed nodes in the real DOM.

---

### Question 58: Why Do We Use useState and useEffect?

- **useState** → Manages component state
- **useEffect** → Handles side effects like API calls, subscriptions

---

### Question 59: Relation Between useEffect and Class Lifecycle Methods

| useEffect | Class Lifecycle |
|-----------|-----------------|
| Empty deps | componentDidMount |
| With deps | componentDidUpdate |
| Cleanup | componentWillUnmount |

---

### Question 60: Other Ways to Manage State

1. useReducer
2. Context API
3. Redux / Redux Toolkit

---

### Question 61: Redux Toolkit vs Redux

**Redux Toolkit advantages:**
- Less boilerplate
- Faster development
- Official recommended approach

---

### Question 62: How Context API Works

**Answer:**
Context allows passing global data without prop drilling using:
1. createContext
2. Provider
3. useContext

---

### Question 63: How to Optimize React App Performance

**Answer:**
1. Lazy loading
2. Code splitting
3. useMemo, useCallback
4. CDN for assets
5. Virtual DOM optimization

---

### Question 64: If API Takes 5 Seconds, How Do You Improve UX?

**Answer:**
1. Loader
2. Skeleton UI
3. Retry option
4. Background fetch
5. Pagination & caching

---

### Question 65: How to Handle 10,000+ Rows in Dashboard

**Answer:**
1. Pagination
2. Virtualization
3. Infinite scrolling
4. Server-side filtering

---

## Coding Problems

### Question 66: Reverse a String Using reverse()

```javascript
str.split('').reverse().join('');
```

---

### Question 67: Find Second Largest Number in Array

```javascript
const arr = [10, 4, 25, 7];
arr.sort((a,b) => b - a);
console.log(arr[1]);
```

---

### Question 68: Remove Duplicates from an Array

```javascript
const unique = [...new Set(arr)];
```

**Or without Set:**
```javascript
const result = [];
for (let n of arr) {
  if (!result.includes(n)) result.push(n);
}
```

---

### Question 69: Basic Debounce Function

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

---

### Question 70: Can Debouncing Work Without setTimeout?

**Answer:** No — setTimeout is required to control the delay.

---

## Code Examples

### Counter with Functional Update

```javascript
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
    </div>
  );
};

export default Counter;
```

Test cases:
- State update
- Functional update
- Re-render understanding

---

### API Call with Axios + Loader + Error

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";

const AxiosAPI = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => setUsers(res.data))
      .catch(() => setError("API Failed"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
};

export default AxiosAPI;
```

---

### Fetch + Promise API Call

```javascript
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}, []);
```

---

### Debounced Search

```javascript
import React, { useState, useEffect } from "react";

const DebounceSearch = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(text);
      console.log("API Call:", text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <input
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default DebounceSearch;
```

---

### Filter List with useMemo

```javascript
import React, { useMemo, useState } from "react";

const names = ["Apple", "Mango", "Banana", "Orange"];

const FilterList = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return names.filter(n =>
      n.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <ul>
        {filtered.map(n => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </>
  );
};

export default FilterList;
```

---

### Controlled Input

```javascript
const Controlled = () => {
  const [name, setName] = useState("");

  return <input value={name} onChange={e => setName(e.target.value)} />;
};
```

---

### Uncontrolled Input

```javascript
import { useRef } from "react";

const Uncontrolled = () => {
  const inputRef = useRef(null);

  const submit = () => alert(inputRef.current?.value);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={submit}>Submit</button>
    </>
  );
};
```

---

### Protected Route

```javascript
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) return <Navigate to="/login" />;
  return children;
};
```

---

### Prevent Unnecessary Re-render with React.memo

```javascript
const Child = React.memo(({ value }) => {
  console.log("Rendered");
  return <p>{value}</p>;
});
```

---

### Virtualization Example (10,000 Rows)

```javascript
import { FixedSizeList as List } from "react-window";

const BigList = () => (
  <List height={400} itemCount={10000} itemSize={40} width={300}>
    {({ index, style }) => (
      <div style={style}>Row {index}</div>
    )}
  </List>
);
```

---

### Redux Toolkit Basic Setup

```javascript
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value++; }
  }
});

export const { increment } = counterSlice.actions;

export const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});
```

---

### JWT Token Handling (Front-End)

```javascript
localStorage.setItem("token", response.data.accessToken);

axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
```

---

### Lazy Loading Component

```javascript
import React, { Suspense } from "react";

const LazyComp = React.lazy(() => import("./Profile"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LazyComp />
    </Suspense>
  );
}
```

---

### Error Boundary

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h2>Something went wrong</h2>;
    return this.props.children;
  }
}
```

---

### useCallback Interview Example

```javascript
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

### useReducer Interview Example

```javascript
const reducer = (state, action) => {
  if (action.type === "INC") return state + 1;
  return state;
};

const [count, dispatch] = useReducer(reducer, 0);
```

---

## Interview Tips

1. Always ask clarifying questions before answering
2. Provide real-world examples for each concept
3. Show code examples when applicable
4. Explain both the problem and solution
5. Mention performance implications
6. Discuss trade-offs and best practices
7. Stay updated with latest React features
8. Practice coding problems regularly
9. Understand concepts deeply, not just memorize
10. Be ready to explain your design decisions

---

**Good luck with your React interviews!**
