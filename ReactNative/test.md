# 26. How do you optimize performance in a React Native application?

Performance optimization in a React Native application focuses on reducing unnecessary work on the **JavaScript thread**, minimizing **re-renders**, efficiently handling **lists and images**, and leveraging **native capabilities** wherever possible. Since React Native bridges JavaScript and native code, poor optimization can easily lead to UI lag, dropped frames, and slow user interactions.

---

## 1. Prevent Unnecessary Re-renders

Unnecessary re-renders are one of the most common causes of performance issues in React Native. Every re-render triggers JavaScript execution and UI reconciliation.

### a) Using `React.memo`
`React.memo` memoizes functional components and prevents re-rendering if props have not changed.

```javascript
const MyComponent = React.memo(({ title }) => {
  return <Text>{title}</Text>;
});
```

**How it helps internally:**
*   React performs a shallow comparison of props.
*   If props are unchanged, render phase is skipped.
*   Reduces JS execution and reconciliation cost.

### b) Using PureComponent (Class Components)
`PureComponent` automatically implements `shouldComponentUpdate`.

```javascript
class MyComponent extends React.PureComponent {
  render() {
    return <Text>{this.props.title}</Text>;
  }
}
```

**Under the hood:**
*   Uses shallow comparison for props and state.
*   Prevents unnecessary render cycles.

### c) `useCallback` and `useMemo`
Avoid creating new references on every render.

```javascript
const onPress = useCallback(() => {
  handlePress();
}, []);

const computedValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

**Why it matters:**
*   New function/object references trigger child re-renders.
*   Stable references reduce reconciliation work.

---

## 2. Use FlatList Instead of ScrollView for Large Lists

### Problem with ScrollView
`ScrollView` renders all items at once, which:
*   Consumes more memory.
*   Blocks the JS thread.
*   Causes slow initial render.

### Solution: FlatList
```javascript
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews
/>
```

**Under the Hood:**
*   Virtualized rendering.
*   Items rendered only when visible.
*   Offscreen views are recycled.
*   Drastically reduces memory and JS load.

---

## 3. Optimize Images with Caching and Proper Sizing

Images are one of the biggest performance bottlenecks.

**Best Practices:**
*   Avoid very large images.
*   Do not use base64 images.
*   Resize images on the server.
*   Use image caching libraries.

```javascript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  resizeMode={FastImage.resizeMode.cover}
/>
```

**Under the Hood:**
*   Native image caching.
*   Reduced network requests.
*   Faster decode and render time.

---

## 4. Avoid Anonymous Functions and Inline Styles

### Bad Practice
```javascript
<Button onPress={() => handleClick()} />
<View style={{ padding: 10 }} />
```

### Optimized Approach
```javascript
const onPressHandler = useCallback(handleClick, []);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
```

**Why This Matters:**
*   Inline functions create new references every render.
*   Inline styles bypass style caching.
*   Causes unnecessary reconciliation and re-renders.

---

## 5. Reduce JavaScript Thread Work

The JavaScript thread is responsible for:
*   Business logic.
*   Rendering calculations.
*   Handling gestures (if JS-driven).

If the JS thread is blocked, the UI becomes unresponsive.

**Avoid Heavy JS Operations:**
*   Large loops.
*   JSON parsing of huge payloads.
*   Image processing.
*   Encryption/decryption.

**Solutions:**
*   Move logic to native modules.
*   Use background threads.
*   Use `InteractionManager`.

```javascript
InteractionManager.runAfterInteractions(() => {
  heavyTask();
});
```

---

## 6. Use Native Modules for Heavy Tasks

For CPU-intensive work, native modules or JSI should be used.

**Best for:**
*   Image manipulation.
*   Video processing.
*   Cryptography.
*   Sensors.
*   Large data processing.

**Benefits:**
*   Runs outside JS thread.
*   No frame drops.
*   Direct access to native APIs.

---

## 7. Optimize Animations (Critical for UI Smoothness)

### JS-driven Animations
*   Blocked when JS thread is busy.
*   Cause frame drops.

### Native-driven Animations
*   Use `useNativeDriver: true`.
*   Prefer `react-native-reanimated`.

```javascript
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
```

**Under the Hood:**
*   Animation runs on UI thread.
*   No per-frame bridge calls.
*   Smooth even during JS load.

---

## 8. Enable Hermes Engine

Hermes is a lightweight JavaScript engine optimized for React Native.

**Benefits:**
*   Faster app startup.
*   Reduced memory usage.
*   Better garbage collection.
*   Faster JS execution.

---

## 9. Profile and Measure Performance

Optimization should always be data-driven.

**Tools:**
*   React Native Performance Monitor.
*   React DevTools Profiler.
*   Flipper Performance Plugin.

**What to Look For:**
*   JS FPS drops.
*   Frequent re-renders.
*   Long JS tasks (>16ms).
*   Memory spikes.

---



















---

## 27. React Hooks (Interview Wise)

### 1. `useState`
**Purpose:** Manage local component state.
*   Allows functional components to have state.
*   State updates trigger a re-render.
*   Updates are asynchronous.

**Interview Line:**
> "`useState` is used to store and update component-level state."

```javascript
const [count, setCount] = useState(0);
```

### 2. `useEffect`
**Purpose:** Handle side effects in functional components.
*   Runs after the render.
*   Used for API calls, subscriptions, and timers.
*   The dependency array controls execution.

**Interview Line:**
> "`useEffect` replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`."

```javascript
useEffect(() => {
  fetchData();
}, []);
```

### 3. `useContext`
**Purpose:** Access global data without prop drilling.
*   Works with the React Context API.
*   Ideal for themes, authentication, and language settings.

**Interview Line:**
> "`useContext` helps share data globally without passing props manually."

```javascript
const theme = useContext(ThemeContext);
```

### 4. `useReducer`
**Purpose:** Manage complex state logic and predictable state updates.
*   Similar to the Redux pattern.
*   Better than `useState` for complex state logic or when the next state depends on the previous one.

**Interview Line:**
> "`useReducer` is preferred when state transitions are complex."

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### 5. `useCallback`
**Purpose:** Memoize functions.
*   Prevents unnecessary re-creation of functions on every render.
*   Improves performance when passing callbacks to optimized child components (`React.memo`).

**Interview Line:**
> "`useCallback` prevents unnecessary re-renders caused by function recreation."

```javascript
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### 6. `useMemo`
**Purpose:** Memoize computed values.
*   Prevents expensive calculations on every render.
*   Returns a memoized value.

**Interview Line:**
> "`useMemo` optimizes performance by caching calculated values."

```javascript
const total = useMemo(() => calculateTotal(data), [data]);
```

### 7. `useRef`
**Purpose:** Persist values without re-rendering.
*   Access DOM elements directly.
*   Store mutable values that don't trigger a re-render when updated.

**Interview Line:**
> "`useRef` stores mutable values that don’t trigger re-render."

```javascript
const inputRef = useRef(null);
```

### 8. `useImperativeHandle`
**Purpose:** Expose custom methods to a parent component via a ref.
*   Used with `forwardRef`.
*   Controls exactly what the parent can access from the child.

**Interview Line:**
> "`useImperativeHandle` customizes ref methods exposed to parent components."

```javascript
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));
```

### 9. `useLayoutEffect`
**Purpose:** Synchronous effect after DOM mutations.
*   Runs synchronously immediately after React handles all DOM mutations.
*   Runs before the browser paints.
*   Used for layout measurements (e.g., getting scroll position or element size).

**Interview Line:**
> "`useLayoutEffect` is used when DOM measurements must be done before the paint."

### 10. `useDebugValue`
**Purpose:** Label custom hooks in React DevTools.
*   Only for debugging purposes.
*   Has no production impact.

**Interview Line:**
> "`useDebugValue` improves debugging of custom hooks."

---

## 28. React Native – Commonly Used Hooks (Interview Wise)

### 1. `useWindowDimensions`
**Purpose:** Get real-time screen width & height.
*   Updates automatically on orientation change.

**Interview Line:**
> "`useWindowDimensions` helps build responsive UI."

```javascript
const { width, height } = useWindowDimensions();
```

### 2. `useColorScheme`
**Purpose:** Detect system theme (light/dark).

**Interview Line:**
> "`useColorScheme` is used for dark and light theme handling."

```javascript
const scheme = useColorScheme();
```

### 3. `useFocusEffect` (React Navigation)
**Purpose:** Run a side effect when the screen comes into focus.
*   Similar to `useEffect` but specifically for navigation focus.

**Interview Line:**
> "`useFocusEffect` runs side effects when a screen becomes active."

### 4. `useIsFocused` (React Navigation)
**Purpose:** Return a boolean indicating if the screen is focused.

**Interview Line:**
> "`useIsFocused` helps trigger logic based on screen visibility."

```javascript
const isFocused = useIsFocused();
```

### 5. `useSafeAreaInsets`
**Purpose:** Handle notches, status bars, and safe areas strings.

**Interview Line:**
> "`useSafeAreaInsets` ensures UI doesn’t overlap system areas."

```javascript
const insets = useSafeAreaInsets();
```

---

## 29. React Native Lifecycle (Functional Components)

In functional components, lifecycle methods are handled using React Hooks, mainly `useEffect` and `useLayoutEffect`.

### 1. Mounting Phase (Component is created)
**Hook:** `useEffect(() => {}, [])`
*   **Behavior:** Runs once when the component mounts.
*   **Equivalent to:** `componentDidMount`

**Interview Use Cases:**
*   API calls
*   Initial data fetch
*   Subscriptions
*   Analytics tracking

**Interview Line:**
> "To handle `componentDidMount` in functional components, we use `useEffect` with an empty dependency array."

```javascript
useEffect(() => {
  console.log("Component Mounted");
  // API calls
  // Event listeners
}, []);
```

### 2. Updating Phase (State / Props change)
**Hook:** `useEffect(() => {}, [dependency])`
*   **Behavior:** Runs when the specified dependency changes.
*   **Equivalent to:** `componentDidUpdate`

**Interview Use Cases:**
*   Run logic when props change
*   Sync state with props
*   Conditional API calls

**Interview Line:**
> "For `componentDidUpdate` behavior, we use `useEffect` with dependencies."

```javascript
useEffect(() => {
  console.log("State or prop updated");
}, [count]);
```

### 3. Unmounting Phase (Component removed)
**Hook:** Cleanup function inside `useEffect`
*   **Behavior:** Runs before the component unmounts.
*   **Equivalent to:** `componentWillUnmount`

**Interview Use Cases:**
*   Clear timers
*   Remove event listeners
*   Cancel API calls

**Interview Line:**
> "Cleanup functions inside `useEffect` work like `componentWillUnmount`."

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(timer);
    console.log("Component Unmounted");
  };
}, []);
```

### 4. Layout Phase (Before UI Paint)
**Hook:** `useLayoutEffect()`
*   **Behavior:** Runs synchronously after DOM/layout updates but before the browser paints.
*   **Equivalent to:** `componentDidMount` + `componentDidUpdate` (blocking paint).

**Interview Use Cases:**
*   Measure layout
*   Animations requiring layout info
*   Precise UI positioning

**Interview Line:**
> "`useLayoutEffect` runs before the screen is painted, useful for layout calculations."

```javascript
useLayoutEffect(() => {
  console.log("Layout calculated");
}, []);
```

### 5. Focus Lifecycle (React Navigation)
**Hook:** `useFocusEffect()`
*   **Behavior:** Runs when the screen comes into focus.
*   **Equivalent to:** Screen-level mount/unmount.

**Interview Line:**
> "`useFocusEffect` is used for screen lifecycle handling in React Navigation."

```javascript
useFocusEffect(
  React.useCallback(() => {
    console.log("Screen Focused");

    return () => {
      console.log("Screen Unfocused");
    };
  }, [])
);
```

### Summary: Lifecycle Mapping

| Class Lifecycle | Functional Hook |
| :--- | :--- |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |
| `componentDidMount` + Update (before paint) | `useLayoutEffect()` |
