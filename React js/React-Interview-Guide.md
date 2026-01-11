# React Interview Guide - Complete Questions & Answers

## Table of Contents
- [Question 1: What is React?](#question-1-what-is-react)
- [Question 2: What are the features of React JS?](#question-2-what-are-the-features-of-react-js)
- [Question 3: Difference Between Block-Level and Inline Elements](#question-3-difference-between-block-level-and-inline-elements)
- [Question 4: Difference between ID and Class](#question-4-difference-between-id-and-class)
- [Question 5: What are Semantic Tags and why are they important?](#question-5-what-are-semantic-tags-and-why-are-they-important)
- [Question 6: Difference between `visibility: hidden` and `display: none`](#question-6-difference-between-visibility-hidden-and-display-none)
- [Question 7: Box Model (Margin vs Padding)](#question-7-box-model-margin-vs-padding)
- [Question 8: Difference Between CSS Grid and Flexbox](#question-8-difference-between-css-grid-and-flexbox)
- [Question 9: Difference Between var, let, and const](#question-9-difference-between-var-let-and-const)
- [Question 10: What is the Event Loop?](#question-10-what-is-the-event-loop)
- [Question 11: Async/Await vs Promises](#question-11-asyncawait-vs-promises)
- [Question 12: Difference Between `==` and `===`](#question-12-difference-between--and-)
- [Question 13: What is Closure?](#question-13-what-is-closure)
- [Question 14: Map vs Filter vs Reduce](#question-14-map-vs-filter-vs-reduce)
- [Question 15: Primitive vs Reference Types (e.g. `[] === []` is false)](#question-15-primitive-vs-reference-types-eg---is-false)
- [Question 16: What is JSX?](#question-16-what-is-jsx)
- [Question 17: What is the Virtual DOM?](#question-17-what-is-the-virtual-dom)
- [Question 18: What is Reconciliation?](#question-18-what-is-reconciliation)
- [Question 19: One-Way Data Binding](#question-19-one-way-data-binding)
- [Question 20: Functional vs Class Components](#question-20-functional-vs-class-components)
- [Question 21: What are Props?](#question-21-what-are-props)
- [Question 22: What is Prop Drilling and how to avoid it?](#question-22-what-is-prop-drilling-and-how-to-avoid-it)
- [Question 23: What is `children` prop?](#question-23-what-is-children-prop)
- [Question 24: What is State?](#question-24-what-is-state)
- [Question 25: Controlled vs Uncontrolled Components](#question-25-controlled-vs-uncontrolled-components)
- [Question 26: Why setting state inside `render` causes an infinite loop?](#question-26-why-setting-state-inside-render-causes-an-infinite-loop)
- [Question 27: What are React Hooks?](#question-27-what-are-react-hooks)
- [Question 28: Common Hooks](#question-28-common-hooks)
- [Question 29: `useEffect` vs Lifecycle Methods](#question-29-useeffect-vs-lifecycle-methods)
- [Question 30: `useMemo` vs `useCallback`](#question-30-usememo-vs-usecallback)
- [Question 31: What are Custom Hooks?](#question-31-what-are-custom-hooks)
- [Question 32: How Lists work and why Keys are important?](#question-32-how-lists-work-and-why-keys-are-important)
- [Question 33: Ways to style React Components](#question-33-ways-to-style-react-components)
- [Question 34: What is React Router and why use it?](#question-34-what-is-react-router-and-why-use-it)
- [Question 35: `<Link>` vs `<a>` tag](#question-35-link-vs-a-tag)
- [Question 36: Protected Routes](#question-36-protected-routes)
- [Question 37: Context API vs Redux](#question-37-context-api-vs-redux)
- [Question 38: What is Redux?](#question-38-what-is-redux)
- [Question 39: Redux Toolkit (RRT) vs Redux](#question-39-redux-toolkit-rrt-vs-redux)
- [Question 40: Axios vs Fetch](#question-40-axios-vs-fetch)
- [Question 41: How to handle API errors gracefully?](#question-41-how-to-handle-api-errors-gracefully)
- [Question 42: How to prevent unnecessary re-renders?](#question-42-how-to-prevent-unnecessary-re-renders)
- [Question 43: Code Splitting & Lazy Loading](#question-43-code-splitting--lazy-loading)
- [Question 44: Debouncing vs Throttling](#question-44-debouncing-vs-throttling)
- [Question 45: Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)](#question-45-server-side-rendering-ssr-vs-client-side-rendering-csr)
- [Question 46: What are Error Boundaries?](#question-46-what-are-error-boundaries)
- [Question 47: What are Higher-Order Components (HOC)?](#question-47-what-are-higher-order-components-hoc)
- [Question 48: React Server Components (RSC)](#question-48-react-server-components-rsc)
- [Question 49: Reverse a string without `reverse()`](#question-49-reverse-a-string-without-reverse)
- [Question 50: Remove Duplicates from Loop](#question-50-remove-duplicates-from-loop)
- [Question 51: Implementation of a simple Debounce function](#question-51-implementation-of-a-simple-debounce-function)

---

## Getting Started

### Question 1: What is React?
**Answer:** React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta (Facebook). React can be used to develop single-page or server-rendered applications with frameworks like Next.js. React uses one-way data binding and a virtual DOM. It is often faster than other frameworks due to its lightweight nature.

### Question 2: What are the features of React JS?
**Answer:**
1. **Components**: The building blocks of UI, reusable and manageable.
2. **JSX**: Syntax extension allowing HTML-like code in JavaScript.
3. **Virtual DOM**: Lightweight copy of the DOM for efficient updates.
4. **One-Way Data Binding**: Data flows down from parent to child.
5. **Declarative UI**: React updates and renders components when data changes.

---

## HTML & CSS Basics

### Question 3: Difference Between Block-Level and Inline Elements
**Answer:**
- **Block elements:** Take full width, start on a new line (e.g., `div`, `p`, `section`).
- **Inline elements:** Take only required width, do not start new line (e.g., `span`, `a`, `strong`).

### Question 4: Difference between ID and Class
| Aspect | ID | Class |
|--------|----|-------|
| Uniqueness | Unique per page | Can be reused |
| CSS Selector | `#id` | `.class` |
| Priority | High | Low |

### Question 5: What are Semantic Tags and why are they important?
**Answer:** Semantic tags (e.g., `<header>`, `<footer>`, `<article>`) clearly describe their content.
**Benefits:**
- Better SEO (Search engines understand structure).
- Improved Accessibility (Screen readers).
- Cleaner, more readable code.

### Question 6: Difference between `visibility: hidden` and `display: none`
**Answer:**
- **`visibility: hidden`**: The element is invisible, but it **still takes up space** in the layout.
- **`display: none`**: The element is removed from the layout; it takes up **no space**.

### Question 7: Box Model (Margin vs Padding)
**Answer:**
- **Padding**: Space *inside* the border (between content and border).
- **Margin**: Space *outside* the border (between element and others).

### Question 8: Difference Between CSS Grid and Flexbox
**Answer:**
- **Flexbox**: 1D layout (Row OR Column). Best for aligning items in a single direction.
- **CSS Grid**: 2D layout (Rows AND Columns). Best for complex page layouts.

---

## JavaScript Fundamentals

### Question 9: Difference Between var, let, and const
| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Re-assign | Yes | Yes | No |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |

### Question 10: What is the Event Loop?
**Answer:** The Event Loop handles asynchronous callbacks in JavaScript. It continuously checks if the **Call Stack** is empty. If it is, it moves tasks from the **Callback Queue** (or Microtask Queue) to the Call Stack to be executed.

### Question 11: Async/Await vs Promises
**Answer:**
- **Promises**: `.then()` chaining. Can lead to "callback hell" if nested.
- **Async/Await**: Syntactic sugar over Promises. Makes asynchronous code look and behave like synchronous code, improving readability.

### Question 12: Difference Between `==` and `===`
**Answer:**
- `==`: Checks value (performs type coercion). `5 == "5"` is true.
- `===`: Checks value AND type (strict equality). `5 === "5"` is false.

### Question 13: What is Closure?
**Answer:** A closure is a function that "remembers" its lexical scope even when the function is executed outside that scope.
```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
```

### Question 14: Map vs Filter vs Reduce
- **map()**: Transforms each element and returns a new array.
- **filter()**: Returns a new array with elements that pass a condition.
- **reduce()**: Accumulates the array into a single value.

### Question 15: Primitive vs Reference Types (e.g. `[] === []` is false)
**Answer:** Objects and Arrays are reference types in JS. `[] === []` returns `false` because they compare memory addresses (references), not the content inside.

---

## React Fundamentals

### Question 16: What is JSX?
**Answer:** JSX (JavaScript XML) allows writing HTML elements in JavaScript and placing them in the DOM without using `createElement()` or `appendChild()` methods. Browsers can't read it directly; it must be transpiled (e.g., by Babel) into standard JavaScript objects.

### Question 17: What is the Virtual DOM?
**Answer:** The Virtual DOM is a lightweight, in-memory representation of the real DOM. When state changes:
1. React creates a new Virtual DOM tree.
2. It compares ("diffs") it with the previous tree.
3. It updates strictly individual nodes in the real DOM (Reconciliation), making it efficient.

### Question 18: What is Reconciliation?
**Answer:** Reconciliation is the process through which React updates the DOM. It compares the Virtual DOM with the real DOM and updates only the text/attributes that have changed.

### Question 19: One-Way Data Binding
**Answer:** In React, data flows in one direction: from Parent to Child via **props**. This makes applications easier to debug and data flow more predictable.

---

## Components & Props

### Question 20: Functional vs Class Components
| Feature | Functional | Class |
|---------|------------|-------|
| Syntax | Function returning JSX | Class extending `React.Component` |
| State | `useState` Hook | `this.state` |
| Lifecycle | `useEffect` Hook | `componentDidMount`, etc. |
| Boilerplate | Low | High |
| Best Practice | Preferred Modern Approach | Legacy / specific use cases |

### Question 21: What are Props?
**Answer:** Props (short for Properties) are read-only inputs passed from a parent component to a child component. They make components reusable.
```jsx
<Welcome name="Alice" /> // Accessed as props.name
```

### Question 22: What is Prop Drilling and how to avoid it?
**Answer:** Prop drilling happens when you pass data through many layers of components just to reach a deeply nested child.
**Solutions:**
1. **Context API**: For global state like themes or auth.
2. **State Management Libraries**: Redux, Zustand, Recoil.

### Question 23: What is `children` prop?
**Answer:** `children` is a special prop that allows you to pass elements *inside* the opening and closing tags of a component.
```jsx
<Card> <h1>Title</h1> </Card>
```

---

## State & Lifecycle

### Question 24: What is State?
**Answer:** State is a built-in object/hook used to contain data or information about the component. Unlike props, **state is mutable** and managed within the component. When state changes, the component re-renders.

### Question 25: Controlled vs Uncontrolled Components
**Answer:**
- **Controlled**: Form data is handled by the React component state. (`value` prop + `onChange` handler).
- **Uncontrolled**: Form data is handled by the DOM itself. Access values using **Refs** (`useRef`).

### Question 26: Why setting state inside `render` causes an infinite loop?
**Answer:** `render` (or the function body) runs when state updates. If you set state *inside* it, it triggers a re-render, which sets state again, creating an infinite loop. Always set state in efficient handlers or `useEffect`.

---

## React Hooks

### Question 27: What are React Hooks?
**Answer:** Hooks are functions introduced in React 16.8 that allow you to use State and Lifecycle features in functional components.

### Question 28: Common Hooks
1. **`useState`**: Manages local state.
2. **`useEffect`**: Manages side effects (API calls, subscriptions).
3. **`useContext`**: Accesses global Context data.
4. **`useRef`**: Persists values between renders without causing re-renders; accesses DOM.
5. **`useReducer`**: Advanced state management (Redux-like).

### Question 29: `useEffect` vs Lifecycle Methods
| Lifecycle Method | `useEffect` Equivalent |
|------------------|------------------------|
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate` | `useEffect(() => { ... }, [dependencies])` |
| `componentWillUnmount` | `useEffect(() => { return () => cleanup }, [])` |

### Question 30: `useMemo` vs `useCallback`
- **`useMemo`**: Memoizes a **computed value**. Re-computes only when dependencies change. (Optimization for expensive calculations).
- **`useCallback`**: Memoizes a **function definition**. Prevents function recreation on re-renders. (Useful when passing functions to child components).

### Question 31: What are Custom Hooks?
**Answer:** Custom hooks are user-defined hooks (starting with `use`, e.g., `useFetch`) that encapsulate reusable logic. They can call other hooks.

---

## Lists & Keys

### Question 32: How Lists work and why Keys are important?
**Answer:** Lists are rendered using `.map()`.
**Keys:**
- Unique string/number identifying items.
- Crucial for React's reconciliation process to know which items were added, changed, or removed.
- **Avoid** using array index as keys if the list order can change.

---

## Styling in React

### Question 33: Ways to style React Components
1. **Inline Styles**: `<div style={{ color: 'red' }}>`
2. **CSS Stylesheets**: `import './App.css'`
3. **CSS Modules**: `import styles from './App.module.css'` (Scoped locally).
4. **Styled Components** (CSS-in-JS).
5. **Utility Frameworks**: Tailwind CSS.

---

## Routing

### Question 34: What is React Router and why use it?
**Answer:** React Router is a standard library for routing in React. It enables navigation among views/components in a Single Page Application (SPA), allows the URL to change, and keeps the UI in sync with the URL without a full page reload.

### Question 35: `<Link>` vs `<a>` tag
- **`<a>` tag**: Causes a full page refresh (server request).
- **`<Link>` component**: Handles navigation internally (Client-side routing), preserving state and avoiding refresh.

### Question 36: Protected Routes
**Answer:** Protected routes restrict access to certain pages based on authentication status.
```jsx
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
```

---

## State Management

### Question 37: Context API vs Redux
| Feature | Context API | Redux |
|---------|-------------|-------|
| Complexity | Low (Built-in) | High (Requires setup/libs) |
| Use Case | Theme, Auth, simple global state | Complex state, heavy data flow |
| Performance | Can cause extra re-renders if not careful | Optimized for frequent updates |

### Question 38: What is Redux?
**Answer:** Redux is a predictable state container for JavaScript apps. It helps write applications that behave consistently across environments.
**Core Principles:**
1. **Store**: Single source of truth.
2. **Actions**: Events that describe "what happened".
3. **Reducers**: Pure functions determining "how state changes".

### Question 39: Redux Toolkit (RRT) vs Redux
**Answer:** Redux Toolkit is the official, recommended way to write Redux.
- Reduces boilerplate (no manual actions/types).
- `createSlice` automatically generates action creators.
- Built-in Thunk support and Immer (mutable syntax).

---

## API Handling

### Question 40: Axios vs Fetch
| Feature | Fetch (Native) | Axios (Library) |
|---------|----------------|-----------------|
| Syntax | Verbose (needs `.json()`) | Clean (auto JSON parsing) |
| Error Handling | Only rejects on network error | Rejects on HTTP errors (4xx, 5xx) |
| Interceptors | No | Yes (request/response interception) |

### Question 41: How to handle API errors gracefully?
**Best Practices:**
1. **Try/Catch blocks**: Handle failures.
2. **Status Checks**: Handle 401 (Auth), 404 (Not Found), 500.
3. **UI Feedback**: Show Toast notifications or Error Boundary screens.

---


### Question 42: How to prevent unnecessary re-renders?
1. **`React.memo`**: Wraps components to only re-render if props change.
2. **`useMemo`**: Caches expensive calculations.
3. **`useCallback`**: Caches function references.
4. **Virtualization**: Use `react-window` for large lists.

### Question 43: Code Splitting & Lazy Loading
**Answer:** Break up the bundle so users only load what they need.
```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
// Usage
<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

### Question 44: Debouncing vs Throttling
- **Debouncing**: Delays execution until 'X' ms have passed since the last event (e.g., Search bar type-ahead).
- **Throttling**: Limits execution to once every 'X' ms (e.g., Scroll listeners).

---

## Advanced React Concepts

### Question 45: Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)
- **CSR (Create-React-App)**: Browser downloads empty HTML + JS. JS builds UI. Slower initial load, bad SEO.
- **SSR (Next.js)**: Server sends fully rendered HTML. Faster initial content, great SEO.

### Question 46: What are Error Boundaries?
**Answer:** Class components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI. (Does not work for event handlers or async code).

### Question 47: What are Higher-Order Components (HOC)?
**Answer:** A function that takes a component and returns a new component, adding additional functionality or data (e.g., `withRouter`, `connect(Redux)`).

### Question 48: React Server Components (RSC)
**Answer:** new feature allowing components to render exclusively on the server, resulting in zero bundle size for those components on the client.

---

## Coding Problems

### Question 49: Reverse a string without `reverse()`
```javascript
function reverseStr(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}
```

### Question 50: Remove Duplicates from Loop
```javascript
const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)];
```

### Question 51: Implementation of a simple Debounce function
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
```

---

## Code Examples

### Example 1: Simple Counter (Hooks)
```jsx
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={() => setCount(c => c - 1)}>Decrement</button>
        </div>
    );
};
```

### Example 2: API Fetch Hook
```jsx
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
};
```

---

