## 1. What is React Native and how does it differ from React?

React Native is a framework developed by Meta for building mobile 
applications using JavaScript and React. It allows developers to create cross-platform 
apps for both iOS and Android using a single codebase.

While React is mainly used for building web applications with HTML and the DOM, 
React Native uses native components like `<View>` and `<Text>` instead of web elements, 
which are directly rendered using the platform’s native APIs. This approach gives 
React Native apps a native look, feel, and performance similar to apps built in 
Swift or Kotlin.

---

## 2. Explain the concept of JSX in React Native.

JSX (JavaScript XML) is a syntax extension in React Native that allows developers to 
write UI components using an HTML-like syntax directly within JavaScript. 
It makes the code more readable and intuitive by visually representing the component structure.

Under the hood, JSX is transpiled into JavaScript function calls (like `React.createElement`) which 
tell React Native how to construct and render native components such as `<View>` or `<Text>`
instead of traditional HTML elements.


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
