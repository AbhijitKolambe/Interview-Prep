# React Native Interview Guide - Complete Questions & Answers

## Table of Contents
1. [React Native vs React](#1-what-is-react-native-and-how-does-it-differ-from-react)
2. [JSX in React Native](#2-explain-the-concept-of-jsx-in-react-native)
3. [React.createElement](#3-what-is-reactcreateelement)
4. [Render Phase](#4-what-is-the-render-phase-in-react)
5. [Commit Phase](#5-what-is-the-commit-phase-in-react)
6. [Render vs Commit Phases](#6-how-do-render-and-commit-phases-work-together)
7. [Importance of Understanding Phases](#7-why-is-understanding-render-vs-commit-phase-important)
8. [Real-World Optimization](#8-real-world-impact-optimizing-render-logic-in-react-native)
9. [Render Method](#9-what-is-the-significance-of-the-render-method-in-react-native-components)
10. [Creating Components](#10-how-do-you-create-a-component-in-react-native)
11. [Styling Components](#11-how-do-you-style-a-react-native-component)
12. [Props Basics](#12-what-are-props-in-react-native)
13. [Purpose of Props](#13-purpose-of-props)
14. [Props Example](#14-example-passing-props)
15. [Props Characteristics](#15-props-characteristics)
16. [Props Read-Only](#16-are-props-really-read-only-common-confusion)
17. [Why Props Are Immutable](#17-why-modifying-props-is-wrong-even-if-it-works)
18. [State vs Props](#18-what-is-state-in-react-native-and-how-it-differs-from-props)
19. [Debugging React Native](#19-how-would-you-debug-a-react-native-application)
20. [StyleSheet](#20-what-is-stylesheet-in-react-native-and-why-is-it-used)
21. [Navigation](#21-how-do-you-handle-navigation-between-screens-in-react-native)
22. [Flexbox](#22-what-is-flexbox-and-its-role-in-react-native-layout)
23. [Keys in Lists](#23-what-are-keys-in-react-native-and-why-are-they-important-in-lists)
24. [Network Requests](#24-how-can-you-make-a-network-request-in-react-native)
25. [AsyncStorage](#25-describe-the-purpose-of-asyncstorage-in-react-native)
26. [Redux Integration](#26-how-can-you-integrate-redux-with-a-react-native-app)
27. [Performance Optimization](#27-how-do-you-optimize-performance-in-a-react-native-application)
28. [HOC Pattern](#28-explain-the-concept-of-hoc-higher-order-component-in-react-native)
29. [Third-party Libraries](#29-how-can-you-integrate-third-party-libraries-in-a-react-native-app)
30. [Touchable Components](#30-what-are-touchable-components-in-react-native-and-how-do-they-work)
31. [Form Validation](#31-how-do-you-handle-form-validation-in-react-native)
32. [App Architecture](#32-explain-the-architecture-of-a-react-native-app)
33. [Platform-specific Code](#33-how-do-you-handle-platform-specific-code-in-react-native)
34. [Essential React Hooks](#34-essential-react-hooks-usecallback-usememo-usecontext-useref)
35. [Compound Component Pattern](#35-compound-component-pattern)
36. [Props That Cause Re-renders](#36-props-that-cause-re-renders-in-react--react-native)
37. [Pure vs Impure Components](#37-pure-vs-impure-components)
38. [Context API Detailed Guide](#38-context-api-detailed-guide)
39. [package.json vs package-lock.json](#39-understanding-packagejson-and-package-lockjson)
40. [Advanced Performance Optimization](#40-advanced-performance-optimization-techniques)
41. [React Hooks Interview Guide](#41-react-hooks-interview-guide)
42. [Common React Native Hooks](#42-common-react-native-hooks)
43. [React Native Lifecycle (Functional)](#43-react-native-lifecycle-functional-components)

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

`React.createElement()` is the core function that React uses to create a React element — the building block of React’s virtual DOM.
Whenever you write JSX, it’s transpiled (converted) into `React.createElement()` calls.

So, this JSX:

```js
const element = <Text>Hello World</Text>;
```

…is actually compiled into:

```js
const element = React.createElement(Text, null, "Hello World");
```

### Function Signature
```js
React.createElement(
  type,         // The type of element (string like 'div' or a React component)
  props,        // An object containing properties and attributes
  ...children   // Any nested elements or text nodes
)
```

**Example:**
```js
const button = React.createElement(
  "Button",
  { title: "Click me", onPress: () => alert("Pressed!") },
  null
);
```

This creates a React element object, not an actual UI component yet.

### What Does It Return?

`React.createElement()` returns a plain JavaScript object describing what should appear in the UI — it’s called a React Element.

```js
{
  type: 'Text',
  props: {
    children: 'Hello World'
  }
}
```

This object is then used by React’s reconciliation process (the Virtual DOM or Fabric Renderer in React Native) to decide:
- What to render initially
- What needs updating when state or props change

### How It Works in React Native
- On web (React DOM): elements like `<div>` are turned into actual DOM nodes.
- On mobile (React Native): elements like `<View>` or `<Text>` are turned into native UI components via the React Native bridge or Fabric renderer.

So React Native takes the same React element structure but maps it to platform-native widgets instead of HTML tags.

---

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

### Avoid DOM / API Access in Render Phase (React Native)

In React Native, the **render phase must be pure**.
You should **NOT perform side effects** such as API calls, native module access, ref usage, or state updates inside render.

#### 1. Native API Call in Render (Wrong vs Correct)
**Wrong:**
```js
const Screen = () => {
  const width = Dimensions.get('window').width; // native API in render
  return <Text>{width}</Text>;
};
```
**Correct:**
```js
import { useEffect, useState } from 'react';
const Screen = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => { setWidth(Dimensions.get('window').width); }, []);
  return <Text>{width}</Text>;
};
```

*(See previous sections for more examples on Ref access, State updates, and Side effects inside render)*

---

## 8. Real-World Impact: Optimizing Render Logic in React Native

In React Native, the JavaScript thread handles both your business logic and the instructions sent to the UI. If you perform heavy computations directly inside the component body, you block the thread, causing dropped frames, laggy animations, and unresponsive buttons.

**Problem (Blocking UI):**
```js
const expensiveCalculation = (n) => {
  let total = 0;
  for (let i = 0; i < 100000000; i++) total += i;
  return n + total;
};

// Inside component
const heavyResult = expensiveCalculation(5); // Runs on EVERY render!
```

**Solution (Optimized):**
```js
import React, { useState, useMemo } from 'react';

const optimizedResult = useMemo(() => {
  return expensiveCalculation(baseNumber);
}, [baseNumber]); // Only runs when baseNumber changes
```

---

## 9. What is the significance of the `render` method in React Native components?

The `render` method in a React Native component is responsible for **describing what the UI should look like**.

It returns a **JSX representation** of the component based on the current **state and props**.

**Key Points:**
- Defines the UI output of a component
- Automatically re-invoked when state or props change
- Should be **pure** (no side effects)
- Does not directly manipulate the DOM or native UI

---

## 10. How do you create a component in React Native?

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

---

## 11. How do you style a React Native component?

React Native uses **JavaScript objects** instead of traditional CSS. The recommended approach is using the **`StyleSheet` API**.

### Using the `StyleSheet` API (Recommended)
```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StyledBox = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello!</Text>
  </View>
);

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
```

---

## 12. What are Props in React Native?

**Props** (short for *properties*) are **read-only inputs** passed from a **parent component to a child component**. They allow components to receive data and configuration from outside, making them **dynamic, reusable, and predictable**.

Props enforce **one-way data flow**: **Parent ➝ Child**

---

### Purpose of Props

- Customize child components
- Share data between components
- Improve component reusability
- Keep components pure and predictable

---

###  Example: Passing Props

```js
import React from 'react';
import { View, Text } from 'react-native';

const Greeting = ({ name }) => (
  <View>
    <Text>Hello, {name}!</Text>
  </View>
);

// Parent
const App = () => (
  <>
    <Greeting name="Abhijit" />
    <Greeting name="Test" />
  </>
);
```

---

### Props Characteristics

| Property | Description |
|--------|-------------|
| **Read-only** | Props are immutable in child components |
| **Passed from parent** | Defined and controlled by the parent |
| **Dynamic** | Can change when parent re-renders |
| **Any data type** | Strings, numbers, arrays, objects, functions |

---

##3 16. Are Props Really Read-Only? (Common Confusion)

You can reassign a prop variable inside a component, and it may appear to work locally, but **this is wrong**.

```js
const Greeting = ({ name }) => {
  name = 'test'; // BAD! Only changes local variable
  return <Text>Hello, {name}!</Text>;
};
```

---

### Why Modifying Props Is Wrong (Even If It Works)

React treats props as **immutable data from the parent**.
- Reassigning props only changes the local variable.
- React does not track this change.
- No re-render is triggered.
- Change is not persistent.

> **Key Rule:** Props should be treated as **read-only inputs**. If data needs to change, use **state** instead.

---

## 18. What is 'state' in React Native and how it differs from 'props'?

**Definition:**
In React Native, state is an object that holds mutable, local data that influences how a component renders. Unlike props, which are received from a parent, state is owned and controlled by the component itself.

When the state changes, React Native automatically re-renders the component to reflect the updated data in the UI.

---

## 19. How would you debug a React Native application?

React Native provides multiple debugging tools:

### 1. In-App Developer Menu
- **Android:** `Ctrl + M` / `Cmd + M`
- **iOS:** `Cmd + D`
- Features: Reload, Toggle Inspector, Performance Monitor.

### 2. React Developer Tools
- `npx react-devtools`
- Inspect component hierarchy, props, and state.

### 3. Flipper (Recommended)
- All-in-one tool: Logs, Network, Layout, Crash Reporter.

### 4. Console Logs & API Debugging
- `console.log()`
- `react-native-network-logger`
- **Axios Interceptors** to log requests/responses.

---

## 20. What is StyleSheet in React Native and why is it used?

`StyleSheet` is a React Native module used to define and manage component styles.
It is preferred over inline styles because:
- **Performance**: Styles are preprocessed and referenced by ID.
- **Validation**: Warns about invalid properties.
- **Maintainability**: Keeps styles organized.

---

## 21. How do you handle navigation between screens in React Native?

Navigation is handled using **React Navigation**.

**Setup:**
```bash
npm install @react-navigation/native @react-navigation/native-stack
```

**Usage:**
```js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 22. What is Flexbox and its role in React Native layout?

Flexbox is the primary layout system in React Native. It allows responsive design across different screen sizes.

**Key Properties:**
- `flexDirection`: `column` (default) or `row`.
- `justifyContent`: Aligns children along the main axis.
- `alignItems`: Aligns children along the cross axis.
- `flex`: Defines how much space an item takes.

---

## 23. What are 'keys' in React Native and why are they important in lists?

Keys are unique identifiers for list items. They help React optimize re-renders by identifying which items have changed, added, or removed.

```js
{data.map(item => <Text key={item.id}>{item.name}</Text>)}
```

---

## 24. How can you make a network request in React Native?

### 1. Using Fetch API (Built-in)
```js
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
};
```

### 2. Using Axios (Library)
```js
import axios from 'axios';
const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  console.log(response.data);
};
```

**Comparison:**
- **Fetch**: Native, lightweight, requires manual error handling.
- **Axios**: Auto JSON parsing, interceptors, timeout support.

---

## 25. Describe the purpose of 'AsyncStorage' in React Native.

`AsyncStorage` provides persistent, asynchronous, key-value storage on the device.
It is used for storing simple data like:
- User tokens
- App preferences
- Theme settings

**Install:** `npm install @react-native-async-storage/async-storage`

**Usage:**
```js
await AsyncStorage.setItem('token', 'abc-123');
const token = await AsyncStorage.getItem('token');
```

---

## 26. How can you integrate Redux with a React Native app?

**Redux Toolkit (RTK)** is the recommended way.

1. **Create Slice (`createSlice`)**: Define state and reducers.
2. **Configure Store (`configureStore`)**: Add reducers to store.
3. **Provider (`<Provider>`)**: Wrap app with store.
4. **Hooks**: Use `useSelector` to read state and `useDispatch` to update it.

---

## 27. How do you optimize performance in a React Native application?

- Use `React.memo` to prevent unnecessary re-renders.
- Use `useCallback` and `useMemo` for functions and calculations.
- Use `FlatList` instead of `ScrollView` for lists.
- Optimize images (cache, resize).
- Avoid anonymous functions in `render`.
- Move heavy computations off the JS thread.

---

## 28. Explain the concept of 'HOC' (Higher-Order Component) in React Native.

A Higher-Order Component (HOC) is a function that takes a component and returns an enhanced component.

**Example (Logger HOC):**
```js
function withLogger(WrappedComponent) {
  return (props) => {
    console.log('Rendered:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}
```

---

## 29. How can you integrate third-party libraries in a React Native app?

1. Install via npm/yarn: `npm install <library>`.
2. For native dependencies (iOS), run `npx pod-install`.
3. Import and use in JS.

---

## 30. What are 'Touchable' components in React Native and how do they work?

Touchable components handle user presses.

- **TouchableOpacity**: Dims opacity on press.
- **TouchableHighlight**: Highlights background on press.
- **Pressable**: Newer, more customizable API.
- **TouchableWithoutFeedback**: Detects press without visual change.

---

## 31. How do you handle form validation in React Native?

- **Manual**: Check state values on submit (`if (!email.includes('@')) ...`).
- **Libraries**: Use **Formik** + **Yup** or **React Hook Form**.

---

## 32. Explain the architecture of a React Native app.

- **JS Thread**: Runs React/JS logic.
- **Native Thread**: Renders UI (Android/iOS).
- **Bridge / JSI**: Communicates between JS and Native threads.
- **Shadow Thread**: Calculates layout using Yoga (Flexbox engine).

---

## 33. How do you handle platform-specific code in React Native?

### 1. Platform module
```js
import { Platform } from 'react-native';
const color = Platform.OS === 'ios' ? 'blue' : 'green';
```

### 2. Platform-specific extensions
- `Button.android.js`
- `Button.ios.js`
React Native automatically picks the correct file.

---

## 34. Essential React Hooks: useCallback, useMemo, useContext, useRef

### 1. useCallback – Memoize Callback Functions
**What it does:** Returns a stable function reference between renders unless dependencies change.

```js
const memoizedFn = useCallback(() => {
  doSomething();
}, [dependencies]);
```

**Why it exists:** Prevents child components from re-rendering just because a function was recreated.

### 2. useMemo – Memoize Expensive Computations
**What it does:** Memoizes the *result* of a function.

```js
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);
```

**Why it exists:** Prevents expensive calculations from running on every render.

### 3. useContext – Access Context Values
**What it does:** Subscribes to a Context without prop drilling.

```js
const theme = useContext(ThemeContext);
```

### 4. useRef – Create Persistent References
**What it does:** Creates a mutable object `{ current: ... }` that persists across renders *without* triggering a re-render.

**Use cases:**
- Accessing methods on a child (e.g., TextInput focus).
- Storing values that shouldn't trigger UI updates.

---

## 35. Compound Component Pattern

A **Compound Component** is a pattern where multiple components work together to share state and logic implicitly (usually via Context), while giving the consumer full control over the UI structure.

**Example API:**
```jsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger id="a">Tab A</Tabs.Trigger>
    <Tabs.Trigger id="b">Tab B</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content id="a">Content A</Tabs.Content>
  <Tabs.Content id="b">Content B</Tabs.Content>
</Tabs>
```

**Benefits:**
- Avoids prop drilling.
- Flexible layout (user decides where children go).
- Expressive API.

---

## 36. Props That Cause Re-renders in React / React Native

In React, a component re-renders whenever its props change by **reference**, not just by value.

### 1. Function Props (Most Common)
`() => {}` is always a new reference.
**Fix:** Use `useCallback`.

### 2. Object/Array Props
`{}` or `[]` is always a new reference.
**Fix:** Use `useMemo`.

### 3. Inline JSX
`<Child header={<Header />} />` creates a new React Element object every time.
**Fix:** Memoize the component or pass the component type.

---

## 37. Pure vs Impure Components

### Pure Component
A component that re-renders **only** when its props or state change (by shallow comparison).
- **Class:** `React.PureComponent`
- **Functional:** `React.memo(Component)`

**Characteristics:**
- Predictable.
- Optimized performance.
- Works best with immutable data.

### Impure Component
A default component that re-renders whenever its parent re-renders, regardless of whether its data actually changed.

---

## 38. Context API Detailed Guide

**Context API** allows you to share global data (like User Auth, Theme, Language) without passing props through every level of the tree.

### 1. Create Context (`AppContext.js`)
```js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
```

### 2. Wrap App (`App.js`)
```js
const App = () => (
  <AppProvider>
    <HomeScreen />
  </AppProvider>
);
```

### 3. Consume Context (`HomeScreen.js`)
```js
import { useContext } from 'react';
import { AppContext } from './AppContext';

const HomeScreen = () => {
  const { theme } = useContext(AppContext);
  return <Text>Current Theme: {theme}</Text>;
};
```

**When to use:** Global state (Auth, Theme).
**When NOT to use:** High-frequency updates (Animations) — use Redux or Zustand instead.

---

## 39. Understanding package.json and package-lock.json

### `package.json`
The manifest file that defines the project, scripts, and dependencies.
- **`dependencies`**: Required for the app to run.
- **`devDependencies`**: Required only for development (e.g., eslint, typescript).
- **Version Ranges**: Uses semantic versioning (e.g., `^18.2.0` allows minor updates).

### `package-lock.json`
An automatically generated file that locks the **exact versions** of every dependency installed.
- **Purpose**: Ensures that every developer and CI/CD pipeline installs exactly the same versions.
- **Committing**: YES, this file should always be committed to Git.

### Semantic Versioning (`MAJOR.MINOR.PATCH`)
- **^ (Caret)**: Allows Minor + Patch updates (e.g., `^1.2.0` → `1.3.0`).
- **~ (Tilde)**: Allows only Patch updates (e.g., `~1.2.0` → `1.2.1`).
- **Exact**: Only installs that specific version.

---

## 40. Advanced Performance Optimization Techniques

Performance optimization in a React Native application focuses on reducing unnecessary work on the **JavaScript thread**, minimizing **re-renders**, efficiently handling **lists and images**, and leveraging **native capabilities** wherever possible.

---

### 1. Prevent Unnecessary Re-renders

Unnecessary re-renders are one of the most common causes of performance issues.

#### a) Using `React.memo`
Memoizes functional components to prevent re-rendering if props haven't changed.

```javascript
const MyComponent = React.memo(({ title }) => {
  return <Text>{title}</Text>;
});
```

#### b) Using PureComponent (Class Components)
Automatically implements `shouldComponentUpdate` with a shallow prop/state comparison.

#### c) `useCallback` and `useMemo`
Prevents unstable references from triggering child re-renders.

```javascript
const onPress = useCallback(() => handlePress(), []);
const computed = useMemo(() => heavyCalc(data), [data]);
```

---

### 2. Use FlatList Instead of ScrollView

**Problem:** `ScrollView` renders all children at once.
**Solution:** `FlatList` renders only visible items (virtualization).

```javascript
<FlatList
  data={data}
  renderItem={renderItem}
  initialNumToRender={10}
  removeClippedSubviews={true}
/>
```

---

### 3. Optimize Images

- **Resize on Server:** Don't download 4K images for a thumbnail.
- **Caching:** Use `react-native-fast-image`.
- **Formats:** Use WebP where possible.

---

### 4. Reduce JavaScript Thread Work

The JS thread handles logic, API calls, and UI orchestration. If it's blocked, frames drop.

- Avoid huge loops or complex calculations in `render`.
- Move heavy logic to **Native Modules** (C++/Java/Obj-C) or use **JSI**.
- Use `InteractionManager.runAfterInteractions()` for long tasks.

---

### 5. Optimize Animations

**Always use native driver** for smooth 60fps animations.

```javascript
Animated.timing(value, {
  toValue: 1,
  useNativeDriver: true, // Key optimization
}).start();
```

Or better yet, use **React Native Reanimated** which runs UI logic on the UI thread completely directly.

---

## 41. React Hooks Interview Guide

### 1. `useState`
**Purpose:** Manage local state.
**Interview Line:** "Used to store and update component-level state asynchronously."

### 2. `useEffect`
**Purpose:** Side effects (API, subscriptions).
**Interview Line:** "Replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`."

### 3. `useContext`
**Purpose:** Global state without prop drilling.
**Interview Line:** "Helps share data globally (like theme/auth) without passing manual props."

### 4. `useReducer`
**Purpose:** Complex state logic.
**Interview Line:** "Preferred over `useState` when state transitions are complex or depend on previous state (Redux-like)."

### 5. `useCallback`
**Purpose:** Memoize functions.
**Interview Line:** "Prevents functions from being recreated on every render, optimizing child re-renders."

### 6. `useMemo`
**Purpose:** Memoize values.
**Interview Line:** "Caches the result of an expensive calculation."

### 7. `useRef`
**Purpose:** Persistent values / DOM access.
**Interview Line:** "Stores mutable values that do not trigger a re-render when changed."

### 8. `useImperativeHandle`
**Purpose:** Expose parent-controlled methods.
**Interview Line:** "Customizes the instance value exposed to parent components when using refs."

### 9. `useLayoutEffect`
**Purpose:** Synchronous layout measurements.
**Interview Line:** "Runs synchronously before the browser paints; useful for measuring layout size/position prevents flickering."

---

## 42. Common React Native Hooks

### 1. `useWindowDimensions`
**Purpose:** Responsive UI.
**Usage:** `const { width, height } = useWindowDimensions();`
**Note:** Automatically updates on rotation.

### 2. `useColorScheme`
**Purpose:** Dark Mode support.
**Usage:** `const scheme = useColorScheme(); // 'light' | 'dark'`

### 3. `useFocusEffect` (React Navigation)
**Purpose:** Run effect when screen focuses.
**Usage:** Good for refreshing data when returning to a screen.

### 4. `useIsFocused` (React Navigation)
**Purpose:** Boolean check for screen focus.
**Usage:** `const isFocused = useIsFocused();`

### 5. `useSafeAreaInsets`
**Purpose:** Handle notches/home indicators.
**Usage:** `const insets = useSafeAreaInsets();`

---

## 43. React Native Lifecycle (Functional Components)

In functional components, we don't have `componentDidMount` etc., but we replicate the behavior with Hooks.

### 1. Mounting (`componentDidMount`)
Run once on mount.
```javascript
useEffect(() => {
  console.log("Mounted");
  // API Call here
}, []); // Empty dependency array
```

### 2. Updating (`componentDidUpdate`)
Run when specific prop/state changes.
```javascript
useEffect(() => {
  console.log("Count changed");
}, [count]); // Dependency array
```

### 3. Unmounting (`componentWillUnmount`)
Cleanup function.
```javascript
useEffect(() => {
  return () => {
    console.log("Unmounted / Cleanup");
    // Clear intervals, listeners
  };
}, []);
```

### 4. Pre-Paint Layout (`componentDidMount` blocking)
Synchronous layout calculation.
```javascript
useLayoutEffect(() => {
  // Measure UI here
}, []);
```

### Lifecycle Mapping Summary

| Class Method | Functional Equivalent |
| :--- | :--- |
| `componentDidMount` | `useEffect(..., [])` |
| `componentDidUpdate` | `useEffect(..., [deps])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |
