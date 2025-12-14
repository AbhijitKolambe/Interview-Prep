# React Native Interview Guide - Complete Questions & Answers

## Table of Contents
1. [React Native vs React](#1-what-is-react-native-and-how-does-it-differ-from-react)
2. [JSX in React Native](#2-explain-the-concept-of-jsx-in-react-native)
3. [React.createElement](#3-what-is-reactcreateelement)
4. [Render Phase](#4-what-is-the-render-phase-in-react)
5. [Commit Phase](#5-what-is-the-commit-phase-in-react)
6. [Render vs Commit Phases](#6-how-do-render-and-commit-phases-work-together)
7. [Importance of Understanding Phases](#7-why-is-understanding-render-vs-commit-phase-important)
8. [Real-World Optimization](#real-world-impact-optimizing-render-logic-in-react-native)
9. [Render Method](#8-what-is-the-significance-of-the-render-method-in-react-native-components)
10. [Creating Components](#9-how-do-you-create-a-component-in-react-native)
11. [Styling Components](#10-how-do-you-style-a-react-native-component)
12. [Props Basics](#11-what-are-props-in-react-native)
13. [Purpose of Props](#12-purpose-of-props)
14. [Props Example](#13-example-passing-props)
15. [Props Characteristics](#14-props-characteristics)
16. [Props Read-Only](#15-are-props-really-read-only-common-confusion)
17. [Why Props Are Immutable](#16-why-modifying-props-is-wrong-even-if-it-works)

---

## 1. What is React Native and how does it differ from React?

React Native is a framework developed by Meta for building mobile applications using JavaScript and React. It allows developers to create cross-platform apps for both iOS and Android using a single codebase.

While React is mainly used for building web applications with HTML and the DOM, React Native uses native components like `<View>` and `<Text>` instead of web elements, which are directly rendered using the platform's native APIs. This approach gives React Native apps a native look, feel, and performance similar to apps built in Swift or Kotlin.

---

## 2. Explain the concept of JSX in React Native.

JSX (JavaScript XML) is a syntax extension in React Native that allows developers to write UI components using an HTML-like syntax directly within JavaScript. It makes the code more readable and intuitive by visually representing the component structure.

Under the hood, JSX is transpiled into JavaScript function calls (like `React.createElement`) which tell React Native how to construct and render native components such as `<View>` or `<Text>` instead of traditional HTML elements.

---

## 3. What is React.createElement?

React.createElement() is the core function that React uses to create a React element — the building 
block of React’s virtual DOM.
Whenever you write JSX, it’s transpiled (converted) into React.createElement() calls.

So, this JSX:

const element = <Text>Hello World</Text>;

…is actually compiled into:

const element = React.createElement(Text, null, "Hello World");

 Function Signature
React.createElement(
  type,         // The type of element (string like 'div' or a React component)
  props,        // An object containing properties and attributes
  ...children   // Any nested elements or text nodes
)

Example:
const button = React.createElement(
  "Button",
  { title: "Click me", onPress: () => alert("Pressed!") },
  null
);


This creates a React element object, not an actual UI component yet.

🧠 What Does It Return?

React.createElement() returns a plain JavaScript object describing what should appear in the UI — it’s called a React Element.

Example output (simplified):

{
  type: 'Text',
  props: {
    children: 'Hello World'
  }
}


This object is then used by React’s reconciliation process (the Virtual DOM or Fabric Renderer in React Native) to decide:

What to render initially

What needs updating when state or props change

⚙️ How It Works in React Native

On web (React DOM): elements like <div> are turned into actual DOM nodes.

On mobile (React Native): elements like <View> or <Text> are turned into native UI components via the React Native bridge or Fabric renderer.

So React Native takes the same React element structure but maps it to platform-native widgets instead of HTML tags.

🧠 Why JSX Uses It

JSX is just syntactic sugar for React.createElement() — it’s easier to read and write.
Without JSX, you’d have to manually write all elements like this:

const app = React.createElement(View, { style: { flex: 1 } },
  React.createElement(Text, null, "Hello World")
);


Instead of:

<View style={{ flex: 1 }}>
  <Text>Hello World</Text>
</View>





1️⃣ Developer writes JSX code
--------------------------------
<View style={{ padding: 10 }}>
  <Text>Hello World</Text>
</View>


2️⃣ JSX gets compiled (by Babel) into React.createElement() calls
-----------------------------------------------------------------
React.createElement(
  View,
  { style: { padding: 10 } },
  React.createElement(Text, null, "Hello World")
)


3️⃣ React.createElement() creates a "React Element"
---------------------------------------------------
{
  type: View,
  props: {
    style: { padding: 10 },
    children: [
      {
        type: Text,
        props: { children: "Hello World" }
      }
    ]
  }
}


4️⃣ React reconciler processes the React Element tree
-----------------------------------------------------
- Compares new tree with previous one (Virtual DOM diffing)
- Finds what changed (if anything)
- Prepares a minimal set of updates


5️⃣ React Native Renderer (Fabric / Bridge)
--------------------------------------------
- Converts the React Element tree into native commands
- Communicates with platform-specific UI APIs

Example:
  View → Android ViewGroup / iOS UIView
  Text → Android TextView / iOS UILabel


6️⃣ Final Output on Device
--------------------------
📱 Native UI displayed:
[Hello World]





JSX
 ↓
React.createElement()
 ↓
React Element (Virtual Representation)
 ↓
Reconciliation (diffing & updates)
 ↓
Native Renderer (Fabric / Bridge)
 ↓
Native UI (Actual Mobile Components)



## 4. What is the Render Phase in React?

The **render phase** is where React determines **what changes are needed** in the UI. This phase is a **pure calculation step** and does **not** interact with the real DOM.

**Key characteristics:**

- **Pure & Side‑Effect Free**: Components are evaluated based on props and state without causing side effects.
- **Virtual DOM Creation**: React builds a new virtual representation of the UI.
- **Interruptible**: In modern React (Concurrent Rendering), this phase can be paused, restarted, or abandoned to prioritize urgent updates (like user input).
- **No DOM Mutations**: React only prepares a description of UI changes.

**Example:** When a component’s state changes, React re-renders the component tree in memory to compute what has changed.

---

## 5. What is the Commit Phase in React?

The **commit phase** is where React **applies the calculated changes** from the render phase to the actual DOM.

**Key characteristics:**

- **DOM Updates**: React creates, updates, or removes DOM nodes.
- **Side Effects Execution**:
  - `componentDidMount`
  - `componentDidUpdate`
  - `useEffect`
- **Non‑Interruptible**: Once started, this phase must finish to keep the UI consistent.

**Example:** After determining the required DOM updates, React applies them and runs effects so the UI visibly reflects the new state.

---

## 6. How Do Render and Commit Phases Work Together?

React’s rendering workflow happens in two clear steps:

### Render Phase

- React renders the component tree virtually.
- Calculates differences between previous and next UI.
- Can be paused or resumed in Concurrent Mode.

### Commit Phase

- React updates the real DOM.
- Executes lifecycle methods and hooks.
- Ensures UI consistency.

**Flow:**

```
State/Props Change → Render Phase (Virtual Calculation) → Commit Phase (DOM + Effects)
```

This separation allows React to optimize performance and avoid blocking the browser.

---

## 7. Why Is Understanding Render vs Commit Phase Important?

Understanding these phases helps in writing **high‑performance React applications**.

**Best Practices:**

- ✅ Keep render phase lightweight (avoid heavy computations).
- ✅ Use `useMemo` and `useCallback` to reduce unnecessary renders.
- ✅ Place side‑effect logic inside `useEffect`, not during render.
- ❌ Avoid DOM access or API calls in the render phase.

**Real‑World Impact:** Poorly optimized render logic can block UI updates, while correct separation ensures smoother user interactions and better performance.

# Real-World Impact: Optimizing Render Logic in React Native

In React Native, the JavaScript thread handles both your business logic and the instructions sent to the UI. If you perform heavy computations directly inside the component body, you block the thread, causing dropped frames, laggy animations, and unresponsive buttons.

Below is a comparison of a **Blocking** implementation versus an **Optimized** implementation.

## 1. The Problem: Blocking the UI
In this scenario, we have a "heavy" function (simulating complex data filtering or transformation) running directly in the render body. Even though the user is only trying to increment a simple counter, the application freezes because it forces the heavy calculation to run on every single re-render.

```javascript
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// 🔴 BAD: A heavy function that runs purely synchronously
const expensiveCalculation = (n) => {
  console.log('Calculating...');
  let total = 0;
  // Artificially slow loop to simulate heavy work
  for (let i = 0; i < 100000000; i++) {
    total += i;
  }
  return n + total;
};

export default function UnoptimizedScreen() {
  const [count, setCount] = useState(0);

  // 🔴 BLOCKING: This runs on EVERY render.
  // When you press the button, the JS thread locks up here before it can
  // update the screen, making the button feel "stuck" or laggy.
  const heavyResult = expensiveCalculation(5); 

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Result: {heavyResult}</Text>
      <Text style={styles.label}>Counter: {count}</Text>
      
      {/* Interaction lags because the render cycle is blocked */}
      <Button 
        title="Increment Count (Will Lag)" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
});


import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const expensiveCalculation = (n) => {
  console.log('Calculating...');
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += i;
  }
  return n + total;
};

export default function OptimizedScreen() {
  const [count, setCount] = useState(0);
  const [baseNumber, setBaseNumber] = useState(5);

  // 🟢 GOOD: The calculation is separated from unrelated updates.
  // This will ONLY run if 'baseNumber' changes.
  const heavyResult = useMemo(() => {
    return expensiveCalculation(baseNumber);
  }, [baseNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cached Result: {heavyResult}</Text>
      <Text style={styles.label}>Counter: {count}</Text>
      
      {/* Interaction is instant because heavyResult is not re-calculated */}
      <Button 
        title="Increment Count (Smooth)" 
        onPress={() => setCount(count + 1)} 
      />
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Change Base (Triggers Calc)" 
          color="orange"
          onPress={() => setBaseNumber(baseNumber + 1)} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
});


## 8. What is the significance of the `render` method in React Native components?

The `render` method in a React Native component is responsible for **describing what the UI should look like**.

It returns a **JSX representation** of the component based on the current **state and props**.

### Key Points:
- Defines the UI output of a component
- Automatically re-invoked when state or props change
- Should be **pure** (no side effects)
- Does not directly manipulate the DOM or native UI

### Explanation:
React Native compares the new JSX returned by `render` with the previous one and updates **only the required parts of the UI**, improving performance.

---

## 9. How do you create a component in React Native?

A component in React Native can be created using a **functional component**.

```js
import React from 'react';
import { View, Text } from 'react-native';

const Greeting = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text>Hello, Welcome to React Native!</Text>
    </View>
  );
};

export default Greeting;
```

### Key Points:
- Components are reusable UI blocks
- Functional components are preferred over class components
- Hooks can be used for state and lifecycle management

---

## 10. How do you style a React Native component?

React Native uses **JavaScript objects** instead of traditional CSS.  
The recommended approach is using the **`StyleSheet` API**.

### Using the `StyleSheet` API (Recommended)

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StyledBox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StyledBox;
```

### Why use `StyleSheet.create()`?
- Better performance
- Style validation
- Cleaner and reusable styles

---

## 11. What are Props in React Native?

**Props** (short for *properties*) are used to **pass data from a parent component to a child component**.

They make components:
- Dynamic
- Reusable
- Predictable

Props follow **one-way data flow** (parent → child).

---

## 12. Purpose of Props

- Customize child components
- Share data between components
- Improve component reusability
- Keep components pure and predictable

---

## 13. Example: Passing Props

```js
import React from 'react';
import { View, Text } from 'react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
};

// Parent component
const App = () => {
  return (
    <>
      <Greeting name="Abhijit" />
      <Greeting name="Test" />
    </>
  );
};

export default App;
```

---

## 14. Props Characteristics

| Property | Description |
|--------|-------------|
| Read-only | Props are immutable in child components |
| Passed from parent | Defined and controlled by the parent |
| Dynamic | Can change when parent re-renders |
| Any data type | Strings, numbers, arrays, objects, functions |

---

## 15. Are Props Really Read-Only? (Common Confusion)

You can reassign a prop variable inside a component, and it may appear to work:

```js
const Greeting = ({ name }) => {
  name = 'test';
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
};
```

⚠️ **But this does NOT mean props are mutable.**

---

## 16. Why Modifying Props Is Wrong (Even If It “Works”)

React treats props as **immutable data from the parent**.

### What actually happens:
- Reassigning props only changes the local variable
- React does not track this change
- No re-render is triggered
- Parent state remains unchanged
- Change is not persistent

### Key Rule:
> Props should be treated as **read-only inputs**.  
> If data needs to change, use **state** instead.

