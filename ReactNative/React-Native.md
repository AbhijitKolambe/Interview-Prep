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
18. [State in React Native](#17-what-is-state-in-react-native-and-how-it-differs-from-props)
19. [Debugging React Native](#18-how-would-you-debug-a-react-native-application)
20. [StyleSheet](#19-what-is-stylesheet-in-react-native-and-why-is-it-used)
21. [Navigation](#20-how-do-you-handle-navigation-between-screens-in-react-native)
22. [Flexbox](#21-what-is-flexbox-and-its-role-in-react-native-layout)
23. [Keys in Lists](#22-what-are-keys-in-react-native-and-why-are-they-important-in-lists)
24. [Network Requests](#23-how-can-you-make-a-network-request-in-react-native)
25. [AsyncStorage](#24-describe-the-purpose-of-asyncstorage-in-react-native)
26. [Redux Integration](#25-how-can-you-integrate-redux-with-a-react-native-app)
27. [Performance Optimization](#26-how-do-you-optimize-performance-in-a-react-native-application)
28. [HOC Pattern](#27-explain-the-concept-of-hoc-higher-order-component-in-react-native)
29. [Third-party Libraries](#28-how-can-you-integrate-third-party-libraries-in-a-react-native-app)
30. [Touchable Components](#29-what-are-touchable-components-in-react-native-and-how-do-they-work)
31. [Form Validation](#30-how-do-you-handle-form-validation-in-react-native)
32. [App Architecture](#31-explain-the-architecture-of-a-react-native-app)
33. [Platform-specific Code](#33-how-do-you-handle-platform-specific-code-in-react-native)
34. [Avoid DOM / API Access in Render Phase (React Native)](#34-avoid-dom--api-access-in-render-phase-react-native)

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

### What Does It Return?

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

How It Works in React Native

On web (React DOM): elements like <div> are turned into actual DOM nodes.

On mobile (React Native): elements like <View> or <Text> are turned into native UI components via the React Native bridge or Fabric renderer.

So React Native takes the same React element structure but maps it to platform-native widgets instead of HTML tags.

### Why JSX Uses It

JSX is just syntactic sugar for React.createElement() — it’s easier to read and write.
Without JSX, you’d have to manually write all elements like this:

const app = React.createElement(View, { style: { flex: 1 } },
  React.createElement(Text, null, "Hello World")
);


Instead of:

<View style={{ flex: 1 }}>
  <Text>Hello World</Text>
</View>





1. Developer writes JSX code
--------------------------------
<View style={{ padding: 10 }}>
  <Text>Hello World</Text>
</View>


2. JSX gets compiled (by Babel) into React.createElement() calls
-----------------------------------------------------------------
React.createElement(
  View,
  { style: { padding: 10 } },
  React.createElement(Text, null, "Hello World")
)


3. React.createElement() creates a "React Element"
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


4. React reconciler processes the React Element tree
-----------------------------------------------------
- Compares new tree with previous one (Virtual DOM diffing)
- Finds what changed (if anything)
- Prepares a minimal set of updates


5. React Native Renderer (Fabric / Bridge)
--------------------------------------------
- Converts the React Element tree into native commands
- Communicates with platform-specific UI APIs

Example:
  View → Android ViewGroup / iOS UIView
  Text → Android TextView / iOS UILabel


6. Final Output on Device
--------------------------
Native UI displayed:
[Hello World]





```

JSX → React.createElement() → React Element (Virtual Representation) → Reconciliation (diffing & updates) → Native Renderer (Fabric / Bridge) → Native UI (Actual Mobile Components)

```



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

- Keep render phase lightweight (avoid heavy computations).
- Use `useMemo` and `useCallback` to reduce unnecessary renders.
- Place side‑effect logic inside `useEffect`, not during render.
- Avoid DOM access or API calls in the render phase.


##  Avoid DOM / API Access in Render Phase (React Native)

In React Native, the **render phase must be pure**.
You should **NOT perform side effects** such as API calls, native module access, ref usage, or state updates inside render.

Below are **5 WRONG examples** and their **CORRECT solutions**.

---

## 1. Native API Call in Render

### Wrong
```js
import { Text, Dimensions } from 'react-native';

const Screen = () => {
  const width = Dimensions.get('window').width; // native API in render

  return <Text>{width}</Text>;
};
```

### Correct
```js
import { Text, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

const Screen = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(Dimensions.get('window').width);
  }, []);

  return <Text>{width}</Text>;
};
```

## 2. API Call in Render

### Wrong
```js
const Screen = () => {
  fetch('https://api.example.com/data'); // API call in render

  return <Text>Hello</Text>;
};
```

### Correct
```js
import { useEffect, useState } from 'react';

const Screen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <Text>{JSON.stringify(data)}</Text>;
};
```

## 3. Ref (DOM-like) Access in Render

### Wrong
```js
import { View } from 'react-native';
import { useRef } from 'react';

const Screen = () => {
  const viewRef = useRef(null);

  console.log(viewRef.current); // ref access in render

  return <View ref={viewRef} />;
};
```

### Correct
```js
import { View } from 'react-native';
import { useRef, useEffect } from 'react';

const Screen = () => {
  const viewRef = useRef(null);

  useEffect(() => {
    console.log(viewRef.current); // safe after render
  }, []);

  return <View ref={viewRef} />;
};
```

## 4. State Update in Render

### Wrong
```js
import { useState } from 'react';

const Screen = () => {
  const [count, setCount] = useState(0);

  setCount(count + 1); // state update in render

  return <Text>{count}</Text>;
};
```

### Correct
```js
import { useState } from 'react';
import { Button, Text } from 'react-native';

const Screen = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </>
  );
};
```

## 5. Side Effects (Logs / Storage / Alerts) in Render

### Wrong
```js
const Screen = () => {
  console.log('Rendering'); // side effect in render

  return <Text>Hello</Text>;
};
```

### Correct
```js
import { useEffect } from 'react';

const Screen = () => {
  useEffect(() => {
    console.log('Component mounted'); 
  }, []);

  return <Text>Hello</Text>;
};
```



**Real‑World Impact:** Poorly optimized render logic can block UI updates, while correct separation ensures smoother user interactions and better performance.

# Real-World Impact: Optimizing Render Logic in React Native

In React Native, the JavaScript thread handles both your business logic and the instructions sent to the UI. If you perform heavy computations directly inside the component body, you block the thread, causing dropped frames, laggy animations, and unresponsive buttons.

Below is a comparison of a **Blocking** implementation versus an **Optimized** implementation.

## 1. The Problem: Blocking the UI
In this scenario, we have a "heavy" function (simulating complex data filtering or transformation) running directly in the render body. Even though the user is only trying to increment a simple counter, the application freezes because it forces the heavy calculation to run on every single re-render.

```javascript
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// BAD: A heavy function that runs purely synchronously
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

  // BLOCKING: This runs on EVERY render.
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

  // GOOD: The calculation is separated from unrelated updates.
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
```

## 8. What is the significance of the `render` method in React Native components?

The `render` method in a React Native component is responsible for **describing what the UI should look like**.

It returns a **JSX representation** of the component based on the current **state and props**.

### Key Points:
- Defines the UI output of a component
- Automatically re-invoked when state or props change
- Should be **pure** (no side effects)
- Does not directly manipulate the DOM or native UI


---

## 9. How do you create a component in React Native?

A component in React Native can be created using a **functional component**.

### Basic Component Example:

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

### Component with Hooks Example:

Hooks can be used for state and lifecycle management. Here's a practical example using `useState` and `useEffect`:

```js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter = () => {
  // useState hook for managing state
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Welcome!');

  // useEffect hook for lifecycle management
  useEffect(() => {
    console.log('Component mounted or count changed');
    
    // Cleanup function (runs when component unmounts or before re-running effect)
    return () => {
      console.log('Cleanup: count is now', count);
    };
  }, [count]); // Dependency array - runs when 'count' changes

  const incrementCount = () => {
    setCount(count + 1);
    setMessage(`Count increased to ${count + 1}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.message}>{message}</Text>
      
      <Button 
        title="Increment" 
        onPress={incrementCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default Counter;
```

### Key Points:
- Components are reusable UI blocks
- Functional components are preferred over class components
- **Hooks can be used for state and lifecycle management**:
  - `useState` – Manage component state
  - `useEffect` – Handle side effects and lifecycle events (componentDidMount, componentDidUpdate, componentWillUnmount)
  - `useCallback` – Memoize callback functions
  - `useMemo` – Memoize expensive computations
  - `useContext` – Access context values
  - `useRef` – Create persistent references

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

**Props** (short for *properties*) are **read-only inputs** passed from a **parent component to a child component**.
They allow components to receive data and configuration from outside, making them **dynamic, reusable, and predictable**.

Props enforce **one-way data flow**:
**Parent ➝ Child**

---

##  Key Characteristics of Props

###  Props are **Immutable (Read-Only)**
- A child component **cannot modify** the props it receives.
- Props should never be changed directly inside a component.

 **Wrong**
```js
const Child = (props) => {
  props.title = 'New Title'; //  Not allowed
  return <Text>{props.title}</Text>;
};


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

**But this does NOT mean props are mutable.**

---

## 16. Why Modifying Props Is Wrong (Even If It “Works”)

React treats props as **immutable data from the parent**.

### What actually happens:
- Reassigning props only changes the local variable
- React does not track this change
- No re-render is triggere
- Parent state remains unchanged
- Change is not persistent

### Key Rule:
> Props should be treated as **read-only inputs**.  
> If data needs to change, use **state** instead.


## 17. What is 'state' in React Native and how it differs from 'props'?

**Definition:**

In React Native, state is an object that holds mutable, local data that influences how a component renders. Unlike props, which are received from a parent, state is owned and controlled by the component itself.

When the state changes, React Native automatically re-renders the component to reflect the updated data in the UI.

---

### Under the Hood (How State Works Internally)

When you use a React hook like `useState` or a class-based `this.setState`, React uses an internal mechanism called the **Fiber Reconciliation Algorithm** to track and schedule updates efficiently.

Let’s break it down step-by-step:

#### Initial Render Phase

When a component mounts:

```js
const [count, setCount] = useState(0);

```

## 18. How would you debug a React Native application?

React Native provides multiple debugging tools and techniques to identify and fix issues. Here's a comprehensive guide to debugging:

### 1. In-App Developer Menu (Core Tool)

**Access:**
- **Android:** `Ctrl + M` / `Cmd + M` or shake device  
- **iOS:** `Cmd + D` or shake device  

**Features:**
- Reload App  
- Enable / Disable **Fast Refresh**  
- Toggle **Debug JS Remotely**  
- Enable **Performance Monitor**  
- Show **Element Inspector**

---

### 2. React Developer Tools

Used to inspect the **React component tree**.

**Features:**
- View component hierarchy  
- Inspect **props and state**  
- Debug hooks  
- Detect unnecessary re-renders  

**Usage:**
```bash
npx react-devtools
```

**Works with:**
- React Native CLI
- Expo
- Flipper integration

---

### 3. React Profiler (Performance Debugging)

Used to analyze render performance.

**Capabilities:**
- Measure component render time
- Identify slow components
- Detect unnecessary re-renders
- Optimize using `React.memo`, `useMemo`, `useCallback`

**Available via:**
- React DevTools → Profiler tab
- Flipper → React DevTools plugin

---

### 4. Flipper (All-in-One Debugging Tool)

Flipper is the recommended all-in-one debugging tool for React Native.

**Features:**
- Logs viewer
- React DevTools
- React Profiler
- Layout inspector
- Network inspector (API calls)
- Redux / Zustand debugging
- Performance monitoring
- Crash inspection

**Supports:**
- Android & iOS
- Emulator & physical devices

---

### 5. API & Network Debugging

#### A. Flipper Network Inspector
- Inspect API requests and responses
- View headers, payload, and status codes
- Works automatically with `fetch` and `axios`

#### B. React Native Network Logger (In-App)
Used to log network calls inside the app.

**Common libraries:**
- `react-native-network-logger`
- `reactotron-react-native`

**Use Cases:**
- Debug API calls in development builds
- Useful when Flipper is not available

#### C. Axios Interceptors (Manual API Logging)

```js
axios.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
```

---

### 6. Reactotron (Debug Build Tool)

Used for state, API, and network debugging.

**Features:**
- Track API requests
- Inspect Redux / Zustand state
- Log async actions
- Custom debug logs

**Typically used in:**
- Development mode
- Debug builds only

---

### 7. Performance Monitor (FPS & Memory)

Enabled from the Developer Menu.

**Shows:**
- JS FPS
- UI FPS
- Memory usage

**Helps identify:**
- Frame drops
- Heavy re-renders
- Memory leaks

---

### 8. Element Inspector (UI Debugging)

Used to inspect UI layout and touch handling.

**Capabilities:**
- Identify rendered components
- Inspect styles
- Debug touchable areas
- Detect overlapping views

---

### 9. Native Network & Crash Debugging

**Android (Android Studio):**
- Logcat for logs and crashes
- Network and native error inspection

**iOS (Xcode):**
- Console logs
- Native crash traces
- Memory graph debugger

---

### 10. Debug Builds (In-App Debugging)

In debug builds you can:
- Enable Flipper
- Enable Reactotron
- Log API and state changes
- Add custom debug panels

**Note:** Debug tools are disabled in release builds for performance and security.

---

## 19. What is StyleSheet in React Native and why is it used?

StyleSheet is a React Native module used to define and manage component styles in a structured and optimized way.

Instead of using inline styles directly in JSX, you can create a style object using `StyleSheet.create()`.
This approach helps validate, organize, and optimize styles for better performance.

### Example:

```js
import { StyleSheet, View, Text } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#333',
  },
});
```

### Why use StyleSheet:
- **Performance optimization**: Styles are preprocessed and referenced by ID instead of passing full objects every render
- **Validation**: StyleSheet.create() warns you if you use invalid style properties
- **Maintainability**: Keeps styles organized and reusable across components
- **Consistency**: Encourages a single source of truth for component styling




---

## 20. How do you handle navigation between screens in React Native?

In React Native, navigation between screens is commonly handled using React Navigation, which is a popular and flexible library for managing screen transitions and routing.

### Step 1: Install React Navigation and dependencies

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### Step 2: Set up a Navigation Container

```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Step 3: Navigate between screens

```js
// Inside HomeScreen.js
const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  );
};
```

### Common Navigation Methods

| Method | Description |
|--------|-------------|
| `navigate('ScreenName')` | Go to a screen (doesn't add duplicate if already on stack) |
| `push('ScreenName')` | Always adds a new instance of the screen |
| `goBack()` | Go to the previous screen |
| `replace('ScreenName')` | Replace the current screen |
| `reset()` | Reset the navigation state |

### Types of Navigators in React Navigation

- **Stack Navigator** → Standard push/pop screen transitions
- **Tab Navigator** → Bottom or top tab navigation
- **Drawer Navigator** → Side menu navigation
- **Material Navigator** → Material Design–style transitions






---

## 21. What is Flexbox and its role in React Native layout?

Flexbox (Flexible Box Layout) is a layout system used in React Native to design responsive and adaptive user interfaces. It helps in aligning, distributing, and sizing components within a container — even when their size is dynamic or unknown.

React Native uses Flexbox as its primary layout system, just like CSS, but with a few property name differences and some defaults optimized for mobile.

### Key Properties of Flexbox

| Property | Description |
|----------|-------------|
| `flexDirection` | Defines the main axis — row (horizontal) or column (vertical, default) |
| `justifyContent` | Aligns children along the main axis (flex-start, center, space-between, etc.) |
| `alignItems` | Aligns children along the cross axis (flex-start, center, stretch, etc.) |
| `flex` | Defines how much space an item should take relative to others |
| `alignSelf` | Overrides alignItems for individual items |
| `flexWrap` | Allows items to wrap to the next line if space is insufficient |

### Example:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}><Text>Box 1</Text></View>
      <View style={styles.box2}><Text>Box 2</Text></View>
      <View style={styles.box3}><Text>Box 3</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Layout items horizontally
    justifyContent: 'space-around', // Distribute space evenly
    alignItems: 'center', // Align items vertically in center
  },
  box1: { backgroundColor: 'skyblue', padding: 20 },
  box2: { backgroundColor: 'orange', padding: 20 },
  box3: { backgroundColor: 'lightgreen', padding: 20 },
});

export default FlexExample;
```

### Why Flexbox is important in React Native:
- **Responsive layouts**: Adjusts automatically to various screen sizes and orientations
- **Simplified design**: Reduces the need for manual positioning or fixed dimensions
- **Cross-platform consistency**: Works the same on Android, iOS, and web

---

## 22. What are 'keys' in React Native and why are they important in lists?

Keys are unique identifiers assigned to elements in a list. They help React Native track which items have changed, been added, or removed, allowing it to efficiently re-render only the necessary components.

Without keys, React may re-render the entire list unnecessarily, leading to performance issues or incorrect UI updates.

### Example:

```js
{data.map(item => <Text key={item.id}>{item.name}</Text>)}
```

---

## 23. How can you make a network request in React Native?

In React Native, network requests are used to communicate with backend services
to fetch or send data. React Native supports multiple ways to make network calls.

The most commonly used approaches are:
- **Fetch API** (built-in)
- **Axios** (third-party library)

Both support **Promises** and **async/await** syntax.

---

## 1. Using Fetch API (Built-in)

The **Fetch API** is available by default in React Native and does not require
any external dependency.

### GET Request (Fetch)
```js
const fetchUsers = async () => {
  try {
    const response = await fetch('https://api.example.com/users');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

### POST Request (Fetch)
```js
const createUser = async () => {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Abhijit',
        role: 'Developer',
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

## 2. Using Axios (Third-Party Library)

Axios is a popular HTTP client that simplifies request and response handling.

### Install Axios
```bash
npm install axios
```

### GET Request (Axios)
```js
import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://api.example.com/users');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

### POST Request (Axios)
```js
import axios from 'axios';

const createUser = async () => {
  try {
    const response = await axios.post('https://api.example.com/users', {
      name: 'Abhijit',
      role: 'Developer',
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

## 3. Fetch vs Axios (Detailed Comparison)

| Feature | Fetch API | Axios |
|---------|-----------|-------|
| Built-in | Yes | No (library) |
| JSON Parsing | Manual (response.json()) | Automatic |
| HTTP Error Handling | Manual | Automatic |
| Request Interceptors | No | Yes |
| Response Interceptors | No | Yes |
| Request Cancellation | Hard | Easy |
| Timeout Support | No | Yes |
| Browser / RN Support | Yes | Yes |

## 4. Error Handling Difference

### Fetch Error Handling
```js
fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Request failed');
  }
});
```

### Axios Error Handling
```js
axios.get(url).catch(error => {
  console.error(error.response.status);
});
```

Axios automatically rejects the promise for non-2xx responses.

## 5. Which One Is Better?

### Use Fetch API When:
- You want zero dependencies
- Simple GET/POST requests
- Lightweight apps

### Use Axios When:
- Large-scale applications
- Need interceptors (auth tokens)
- Centralized error handling
- Request cancellation and timeouts
- Cleaner and less boilerplate code

---

## 24. Describe the purpose of 'AsyncStorage' in React Native.

AsyncStorage provides persistent, asynchronous, key-value storage on the device. It's typically used for storing user preferences, auth tokens, or small bits of app data locally.

**Note:** AsyncStorage has been moved to a community package:

```bash
npm install @react-native-async-storage/async-storage
```

### Example:

```js
await AsyncStorage.setItem('userToken', token);
const value = await AsyncStorage.getItem('userToken');
```

---

## 25. How can you integrate Redux with a React Native app?

### Redux Toolkit Integration in a React Native App

Redux Toolkit (RTK) is the **official, recommended way** to use Redux.
It reduces boilerplate, enforces best practices, and makes Redux easier to use
and maintain in React Native applications.

---

## Core Concepts Used in Redux Toolkit

- `configureStore` → creates the Redux store
- `createSlice` → generates reducer + actions together
- `Provider` → makes the store available to the app
- `useSelector` → reads state from the store
- `useDispatch` → dispatches actions

---

## Step-by-Step Redux Toolkit Integration

### 1. Install Required Packages

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Create a Slice

A slice contains:
- Initial state
- Reducers
- Auto-generated actions

**counterSlice.js**

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### 3. Create the Store

**store.js**

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

### 4. Wrap the App with Provider

**App.js**

```js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CounterScreen from './CounterScreen';

export default function App() {
  return (
    <Provider store={store}>
      <CounterScreen />
    </Provider>
  );
}
```

### 5. Use Redux Toolkit State in a Component

**CounterScreen.js**

```js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from './counterSlice';

const CounterScreen = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Count: {count}</Text>

      <Button
        title="Increment"
        onPress={() => dispatch(increment())}
      />

      <Button
        title="Decrement"
        onPress={() => dispatch(decrement())}
      />

      <Button
        title="Add 5"
        onPress={() => dispatch(incrementByAmount(5))}
      />
    </View>
  );
};

export default CounterScreen;
```

## Data Flow with Redux Toolkit

- UI dispatches an action
- Slice reducer handles the action
- State is updated immutably using Immer
- Store notifies subscribers
- UI re-renders using `useSelector`

## Why Redux Toolkit is Better Than Classic Redux

| Aspect | Classic Redux | Redux Toolkit |
|--------|----------------|---------------|
| Boilerplate | High | Minimal |
| Reducer logic | Manual immutability | Automatic (Immer) |
| Action creation | Separate files | Auto-generated |
| Store setup | Verbose | Simple |
| Best practices | Optional | Enforced |

## When to Use Redux Toolkit

### Use Redux Toolkit When:
- App has shared global state
- Multiple screens depend on the same data
- State logic is complex

### Avoid Redux Toolkit When:
- State is local to one component
- App is very small



---

## 26. How do you optimize performance in a React Native application?

Performance optimization involves:
- Using React.memo / PureComponent to prevent unnecessary re-renders
- Using FlatList instead of ScrollView for large lists
- Optimizing images with caching
- Avoiding anonymous functions and inline styles inside render
- Profiling with Flipper or React DevTools
- Reducing JS thread work and using native modules for heavy tasks

---

## 27. Explain the concept of 'HOC' (Higher-Order Component) in React Native.

A Higher-Order Component (HOC) is a function that takes a component and returns an enhanced component with additional functionality. It's used to reuse logic such as authentication checks, data fetching, or logging.

### Example:

```js
function withLogger(WrappedComponent) {
  return (props) => {
    console.log('Rendered:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}
```

---

## 28. How can you integrate third-party libraries in a React Native app?

You can integrate libraries using npm or yarn:

```bash
npm install library-name
```

Then import and use them in your components. For libraries with native code, link them automatically with:

```bash
npx pod-install
```

**Note:** For older RN versions, `react-native link` was used.

---

## 29. What are 'Touchable' components in React Native and how do they work?

Touchable components provide press and gesture interaction for UI elements. They detect user touches and provide visual feedback.

**Common types include:**
- **TouchableOpacity** – Reduces opacity on press
- **TouchableHighlight** – Highlights on press
- **TouchableWithoutFeedback** – No visual feedback
- **Pressable** – Modern and more flexible alternative

### Example:

```js
<TouchableOpacity onPress={() => alert('Pressed!')}>
  <Text>Click Me</Text>
</TouchableOpacity>
```

---

## 30. How do you handle form validation in React Native?

You can validate forms by:
1. Managing input values in state
2. Checking them on submission
3. Showing error messages

You can also use libraries like **Formik**, **Yup**, or **react-hook-form** for robust validation.

### Example (basic):

```js
if (!email.includes('@')) {
  setError('Enter a valid email address');
}
```

---

## 31. Explain the architecture of a React Native app.

A React Native app follows a **component-based architecture**, consisting of:

- **UI Components** – Reusable building blocks
- **State & Props** – Data flow management
- **Business Logic** – Using Context API or Redux
- **Navigation** – Handled by React Navigation
- **Bridge** – Connects JavaScript with native Android/iOS modules

### Architecture Flow:

```
JS Code → Bridge → Native Platform → UI
```

---

## 32. What is the role of 'navigator' in React Navigation?

A navigator is a component that defines the navigation structure of your app. It manages screen transitions, the navigation stack, and navigation history.

**Types of navigators:**
- **StackNavigator** – Push/pop navigation
- **TabNavigator** – Bottom or top tab navigation
- **DrawerNavigator** – Side menu navigation

### Example:

```js
const Stack = createNativeStackNavigator();
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>
```

---

## 33. How do you handle platform-specific code in React Native?

You can handle platform-specific behavior in two ways:

### Method 1: Using the Platform API

```js
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: Platform.OS === 'ios' ? 'blue' : 'green',
  },
});
```

### Method 2: Platform-specific files

Create separate files for each platform:
- `Component.ios.js`
- `Component.android.js`

---

