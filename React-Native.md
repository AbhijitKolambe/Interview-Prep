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
33. [Navigator in React Navigation](#32-what-is-the-role-of-navigator-in-react-navigation)
34. [Platform-specific Code](#33-how-do-you-handle-platform-specific-code-in-react-native)

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
```

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



## 18. How would you debug a React Native application?

React Native provides tools like the in-app developer menu, logging using `console.log`,
and integration with debugging tools like React DevTools or Flipper.  
You can also use Chrome Developer Tools for debugging by running your
app in debug mode and accessing it from a web browser.

Native Debugging:  
Use Android Studio or Xcode for native code issues.  
→ Helps trace crashes or native module problems.

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

You can make network requests using:
- **Fetch API** (built-in)
- **Axios** or other third-party libraries

These allow you to fetch data from APIs asynchronously using Promises or async/await syntax.

### Example:

```js
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
};
```

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

Redux is integrated by:
1. Creating a store to hold global state
2. Wrapping your app in a `<Provider>` from react-redux
3. Defining reducers and actions to manage state changes
4. Connecting components using useSelector and useDispatch

### Example:

```js
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
```

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
