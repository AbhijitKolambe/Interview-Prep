# 26. How do you optimize performance in a React Native application?

Performance optimization in a React Native application focuses on reducing unnecessary work on the **JavaScript thread**, minimizing **re-renders**, efficiently handling **lists and images**, and leveraging **native capabilities** wherever possible. Since React Native bridges JavaScript and native code, poor optimization can easily lead to UI lag, dropped frames, and slow user interactions.

---

## 1. Prevent Unnecessary Re-renders

Unnecessary re-renders are one of the most common causes of performance issues in React Native. Every re-render triggers JavaScript execution and UI reconciliation.

### a) Using `React.memo`
`React.memo` memoizes functional components and prevents re-rendering if props have not changed.

```js
const MyComponent = React.memo(({ title }) => {
  return <Text>{title}</Text>;
});
How it helps internally:

React performs a shallow comparison of props

If props are unchanged, render phase is skipped

Reduces JS execution and reconciliation cost

b) Using PureComponent (Class Components)
PureComponent automatically implements shouldComponentUpdate.

js
Copy code
class MyComponent extends React.PureComponent {
  render() {
    return <Text>{this.props.title}</Text>;
  }
}
Under the hood:

Uses shallow comparison for props and state

Prevents unnecessary render cycles

c) useCallback and useMemo
Avoid creating new references on every render.

js
Copy code
const onPress = useCallback(() => {
  handlePress();
}, []);

const computedValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
Why it matters:

New function/object references trigger child re-renders

Stable references reduce reconciliation work

2. Use FlatList Instead of ScrollView for Large Lists
❌ Problem with ScrollView
ScrollView renders all items at once, which:

Consumes more memory

Blocks the JS thread

Causes slow initial render

✅ Solution: FlatList
js
Copy code
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews
/>
Under the Hood:
Virtualized rendering

Items rendered only when visible

Offscreen views are recycled

Drastically reduces memory and JS load

3. Optimize Images with Caching and Proper Sizing
Images are one of the biggest performance bottlenecks.

Best Practices
Avoid very large images

Do not use base64 images

Resize images on the server

Use image caching libraries

js
Copy code
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  resizeMode={FastImage.resizeMode.cover}
/>
Under the Hood:
Native image caching

Reduced network requests

Faster decode and render time

4. Avoid Anonymous Functions and Inline Styles
❌ Bad Practice
js
Copy code
<Button onPress={() => handleClick()} />
<View style={{ padding: 10 }} />
✅ Optimized Approach
js
Copy code
const onPressHandler = useCallback(handleClick, []);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
Why This Matters:
Inline functions create new references every render

Inline styles bypass style caching

Causes unnecessary reconciliation and re-renders

5. Reduce JavaScript Thread Work
The JavaScript thread is responsible for:

Business logic

Rendering calculations

Handling gestures (if JS-driven)

If the JS thread is blocked, the UI becomes unresponsive.

Avoid Heavy JS Operations
Large loops

JSON parsing of huge payloads

Image processing

Encryption/decryption

Solutions
Move logic to native modules

Use background threads

Use InteractionManager

js
Copy code
InteractionManager.runAfterInteractions(() => {
  heavyTask();
});
6. Use Native Modules for Heavy Tasks
For CPU-intensive work, native modules or JSI should be used.

Best for:
Image manipulation

Video processing

Cryptography

Sensors

Large data processing

Benefits:
Runs outside JS thread

No frame drops

Direct access to native APIs

7. Optimize Animations (Critical for UI Smoothness)
❌ JS-driven Animations
Blocked when JS thread is busy because recat native animated work on js thread as react native recatmated work on ui thread so tat is smooth.

Cause frame drops

✅ Native-driven Animations
Use useNativeDriver: true

Prefer react-native-reanimated

js
Copy code
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
Under the Hood:
Animation runs on UI thread

No per-frame bridge calls

Smooth even during JS load

8. Enable Hermes Engine
Hermes is a lightweight JavaScript engine optimized for React Native.

Benefits:
Faster app startup

Reduced memory usage

Better garbage collection

Faster JS execution

9. Profile and Measure Performance
Optimization should always be data-driven.

Tools:
React Native Performance Monitor

React DevTools Profiler

Flipper Performance Plugin

What to Look For:
JS FPS drops

Frequent re-renders

Long JS tasks (>16ms)

Memory spikes