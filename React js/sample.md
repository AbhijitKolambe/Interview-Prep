1) Common Performance Techniques (Web + Mobile)
✅ Reduce Unnecessary Rendering

Avoid re-rendering the whole screen/component

Split UI into small reusable components

Update only required state (don’t update big objects)

✅ Optimize API Calls

Use pagination / infinite scroll for large data

Debounce search API (call after typing stops)

Cache responses (local storage / memory cache)

✅ Use Lazy Loading

Load screens/components only when needed
Example: route-based lazy loading

✅ Optimize Images

Use correct image size (don’t load 4K in mobile)

Use WebP / compressed images

Use CDN for faster loading

Lazy load images

✅ Avoid Heavy Computation on UI Thread

Don’t do large loops, sorting, filtering directly in UI render

Move heavy logic to backend or background thread

✅ Use Proper Build Mode

Production build only

Remove console logs

Enable minification + tree shaking

✅ 2) React (Web) Performance Techniques
✅ Memoization
1. React.memo()

Prevents re-render if props are same.

export default React.memo(MyComponent)

2. useMemo()

Cache heavy calculations.

const filteredData = useMemo(() => heavyFilter(data), [data])

3. useCallback()

Stops function recreation every render.

const onClick = useCallback(() => doSomething(), [])

✅ Virtualization for Large Lists

Use:

react-window

react-virtualized

Because rendering 1000+ items kills performance.

✅ Code Splitting
const Page = React.lazy(() => import("./Page"))

✅ Avoid Inline Functions in JSX (in big lists)

Bad:

onPress={() => handleClick(item)}


Better:

const handleItemClick = useCallback((item) => {}, [])

✅ Reduce Bundle Size

Remove unused libraries

Import only required modules
Example:
✅ import debounce from "lodash/debounce"
❌ import _ from "lodash"

✅ 3) Angular Performance Techniques
✅ Use OnPush Change Detection

Biggest performance boost in Angular.

changeDetection: ChangeDetectionStrategy.OnPush

✅ Use trackBy in *ngFor

Avoid re-rendering full list.

<div *ngFor="let item of list; trackBy: trackById"></div>

trackById(index:number, item:any){ return item.id; }

✅ Lazy Load Modules (Routing)

Load module only when route opens.

✅ Avoid Calling Functions in HTML Template

Bad:

{{ getTotal() }}


This runs multiple times and slows UI.

Better:
Calculate in TS once and bind variable.

✅ Use Async Pipe Instead of Manual Subscribe
<div *ngIf="data$ | async as data"></div>

✅ Optimize RxJS

Use debounceTime, distinctUntilChanged

Cancel old API calls using switchMap

✅ 4) React Native Performance Techniques
✅ FlatList Optimization (Most Important)

Use these:

keyExtractor

initialNumToRender

windowSize

removeClippedSubviews

getItemLayout (if fixed height)

Example:

<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  windowSize={5}
  removeClippedSubviews={true}
/>

✅ Avoid Using ScrollView for Large Lists

❌ ScrollView loads everything
✅ FlatList loads only visible items

✅ Reduce Re-renders

Use React.memo

Use useCallback

Avoid passing new objects inline

Bad:

style={{margin:10}}


Better:

const styles = StyleSheet.create({ box:{margin:10} })

✅ Optimize Images

Use:

react-native-fast-image

proper image resize modes

smaller image sizes

✅ Avoid Heavy Work on JS Thread

Big loops freeze UI

Use background workers / native modules if needed

✅ Enable Hermes Engine

Hermes improves startup + memory usage.

✅ Navigation Optimization

Avoid re-mounting screens

Use lazy loading in navigation stack

✅ 5) Network + Storage Optimization
✅ Caching Strategies

Web:

Service Worker caching (PWA)

HTTP cache headers
Mobile:

AsyncStorage / MMKV

Offline storage + sync

✅ Reduce Payload Size

Use gzip/brotli

Send only required fields from backend

Use GraphQL selection properly (if using GraphQL)

✅ 6) UI/UX Performance Tricks (Feels Faster)
✅ Skeleton Loading / Shimmer

User feels app is fast even if API is slow.

✅ Optimistic UI Updates

Update UI immediately, sync API in background.

✅ Preload Next Screen Data

Example:

user opens list → preload detail data for first 5 items

✅ 7) Best Quick Checklist (Interview Answer)
For Web (React/Angular)

✅ Lazy load modules/components
✅ Reduce bundle size + tree shake
✅ Memoize heavy logic
✅ Virtualize long lists
✅ Optimize images + CDN
✅ Debounce input API calls

For Mobile (React Native)

✅ FlatList optimization
✅ Avoid ScrollView for large lists
✅ Memoization + stable props
✅ Reduce JS thread load
✅ Optimize images
✅ Enable Hermes