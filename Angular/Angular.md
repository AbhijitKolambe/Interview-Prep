# Angular Interview Guide

## What is Angular?

Angular is a TypeScript-based front-end framework developed by Google used to build single-page web applications. It follows a component-based architecture, provides two-way data binding, dependency injection, and built-in routing, which makes applications scalable, maintainable, and easy to test. It is commonly used for enterprise-level applications.

## What are standalone components?

Standalone components in Angular are components that do not require an NgModule. They can directly declare their own dependencies (like other components, directives, and pipes) using the imports property, making the code simpler, more modular, and easier to lazy load. They were introduced in Angular 14 to reduce boilerplate and improve performance.

### Example

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Hello Standalone Component</h2>`
})
export class HelloComponent {}
```

## Difference between module-based and standalone architecture

| Feature | Module-based Architecture | Standalone Architecture |
|---------|---------------------------|------------------------|
| Introduction | Traditional approach (Angular ≤13) | Introduced in Angular 14 |
| NgModule Required | Yes (@NgModule) | No |
| Boilerplate Code | More (modules, declarations, imports) | Less and cleaner |
| Dependency Management | Managed inside NgModule | Managed inside component via imports |
| Lazy Loading | Through modules | Directly via standalone components |
| Reusability | Module-centric | Component-centric |
| Learning Curve | Slightly complex | Easier for beginners |
| Performance | Good | Slightly better (less overhead) |
| Best Use Case | Large legacy / enterprise apps | Modern, scalable, new apps |

### Interview Summary (Short)

Module-based architecture groups components inside NgModules, while standalone architecture removes NgModules and lets components manage their own dependencies, reducing boilerplate and improving maintainability.

## What is app.config.ts?

`app.config.ts` is a configuration file used in Angular standalone architecture to define application-level providers and settings without using AppModule. It is introduced with standalone APIs (Angular 15+) and is used to configure things like routing, HTTP, and global services during app bootstrap.

### Example

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```


## How does lazy loading work in Angular?

Lazy loading in Angular loads modules or standalone components only when they are needed, instead of loading the entire application at startup. This improves initial load time and performance, especially for large applications. It is implemented using the Angular Router, where routes are configured to load code dynamically when a user navigates to that route.

### Example (Standalone Component)

```typescript
{
  path: 'profile',
  loadComponent: () =>
    import('./profile/profile.component').then(c => c.ProfileComponent)
}
```


## How lazy loading works with standalone components?

Lazy loading with standalone components in Angular works by loading the component only when its route is accessed, without using NgModules. The Angular Router dynamically imports the component file at runtime, which reduces the initial bundle size and improves application performance.

In standalone architecture, lazy loading is done using `loadComponent`, which loads the component on demand without NgModules.

### Example

```typescript
{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard.component')
      .then(c => c.DashboardComponent)
}
```



## What is dependency injection?

Dependency Injection (DI) is a design pattern used in Angular where a class does not create its own dependencies, but instead receives them from an external source (the injector). This makes the code loosely coupled, easier to test, and more maintainable.

In Angular, services or dependencies are typically registered with the injector using @Injectable() or provider configurations. When a component or another service needs that dependency, Angular automatically injects the required instance through the constructor.

Dependency Injection allows Angular to manage and supply dependencies automatically instead of components creating them manually, leading to cleaner and more testable code.

DI helps in:

- Reusing services across the application
- Improving unit testing by allowing mock dependencies
- Separating business logic from UI logic

Example:

```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  getData() {
    return 'Data from service';
  }
}

@Component({
  selector: 'app-demo',
  template: `{{ data }}`
})
export class DemoComponent {
  data: string;

  constructor(private apiService: ApiService) {
    this.data = this.apiService.getData();
  }
}
```


## What does @Injectable({ providedIn: 'root' }) mean?
@Injectable({ providedIn: 'root' }) tells Angular to register the service with the root injector, making it available across the entire application as a singleton.

providedIn: 'root' makes a service globally available as a singleton throughout the Angular application.

This means:

- Angular automatically creates one instance of the service
- The same instance is shared by all components
- No need to add the service in providers of a module or component

Example:

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  getUser() {
    return 'User data';
  }
}
```


Why it's used:

- Reduces boilerplate (no manual provider registration)
- Ensures a single shared instance
- Supports tree-shaking (service removed if not used)


## What are services in Angular?

Services in Angular are classes used to handle business logic and shared data that should not live inside components. They help keep components clean, reusable, and focused on the UI.

Services are commonly used for:

- API / HTTP calls
- Data sharing between components
- Business logic
- Utility functions

They are created using @Injectable() and injected into components using Dependency Injection.

Example:

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  getMessage() {
    return 'Hello from Service';
  }
}

@Component({
  selector: 'app-test',
  template: `{{ message }}`
})
export class TestComponent {
  message = '';

  constructor(private dataService: DataService) {
    this.message = this.dataService.getMessage();
  }
}
```


## Why use services?
Services are used in Angular to separate business logic from UI logic. They help keep components clean, reusable, and easy to maintain by handling tasks like API calls, data sharing, and common utilities in one central place.

Why they are important:

- Avoids code duplication
- Enables data sharing between components
- Improves testability (easy to mock services)
- Follows separation of concerns





## What is Change Detection in Angular?

Change detection is the mechanism Angular uses to keep the UI (view) in sync with application data (model).

Whenever application data changes, Angular:

- Re-evaluates component expressions
- Compares previous values with new values
- Updates the DOM only where changes are detected

## What triggers change detection?

Angular runs change detection when:

- An event occurs (click, input, scroll)
- An HTTP response arrives
- A timer (setTimeout, setInterval) runs
- An observable emits a value
- A component input (@Input) changes

Angular uses Zone.js to detect these async events automatically.

### Example

```typescript
@Component({
  selector: 'app-counter',
  template: `<p>{{ count }}</p>`
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
```

When count changes, Angular detects it and updates the UI.

## Default Change Detection Strategy

### What is Default Strategy?

By default, Angular uses the Default (CheckAlways) change detection strategy.

```typescript
changeDetection: ChangeDetectionStrategy.Default
```

### How it works

- Angular checks every component
- Runs on every change detection cycle
- Even if the component's data has not changed

### Important Behavior

- Parent component change → all child components are checked
- Angular walks the entire component tree

### Pros

- Simple
- Safe
- No need to worry about immutability

### Cons

- Can cause performance issues
- Unnecessary re-checks in large applications

### Real-World Impact

In a dashboard with:

- Charts
- Tables
- Lists
- Nested components

Even a single click can trigger checks across hundreds of components.

## What is OnPush Change Detection?

OnPush is an optimized change detection strategy that tells Angular: "Only check this component when its inputs change or I explicitly ask."

### Example

```typescript
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ user.name }}</p>`
})
export class UserComponent {
  @Input() user!: User;
}
```

### When does OnPush run change detection?

Angular checks the component only when:

- `@Input()` reference changes
- An event happens inside the component
- An observable emits (via async pipe)
- `ChangeDetectorRef.markForCheck()` is called manually

### Key Concept: Reference Change

```typescript
// Won't trigger change detection
this.user.name = 'John';

// Will trigger change detection
this.user = { ...this.user, name: 'John' };
```

OnPush relies on immutability.

## Default vs OnPush (Clear Comparison)

| Feature | Default | OnPush |
|---------|---------|--------|
| Checks components | Always | Conditionally |
| Performance | Slower for large apps | Much faster |
| Needs immutability | No | Yes |
| Manual control | No | Yes |
| Suitable for | Small/simple apps | Large/complex apps |
## When Should You Use OnPush?

### Use OnPush When:

- You are building large-scale applications
- Components receive data via `@Input`
- You use immutable data patterns
- Data comes from Observables
- Components are presentational (UI-only)
- Performance is critical (lists, tables, dashboards)

### Avoid OnPush When:

- Data is frequently mutated
- You rely on global mutable state
- You are unfamiliar with immutability
- Small or simple applications

## Real-World Example: Product List

- 1000 product cards
- Each card receives product data as input

### Default Strategy
- Any click triggers change detection for all 1000 cards

### OnPush Strategy
- Only the updated product card is checked
- Huge performance improvement

## Manually Triggering Change Detection (Advanced)

```typescript
constructor(private cdr: ChangeDetectorRef) {}

updateData() {
  this.data = newData;
  this.cdr.markForCheck();
}
```

Used when:

- Data changes outside Angular
- WebSockets
- Third-party libraries



## What are Angular Signals?

Angular Signals are a new reactive primitive introduced in Angular to manage state and track changes synchronously and explicitly.

A signal is a container for a value that Angular can automatically track.
When the value changes, Angular knows exactly which parts of the UI depend on it and updates only those parts.

### Basic Example

```typescript
import { signal } from '@angular/core';

count = signal(0);

increment() {
  count.set(count() + 1);
}
```

Template:
```html
<p>{{ count() }}</p>
```

- Calling `count()` reads the value
- `set()` updates it and notifies Angular

## Why Were Signals Introduced?

Signals were introduced to solve performance and complexity issues with traditional Angular change detection.

### Problems Before Signals

- Change detection runs too broadly
- Angular had to check entire component trees
- Heavy reliance on Zone.js
- Developers needed workarounds like:
  - OnPush
  - trackBy
  - async pipe
  - manual ChangeDetectorRef

### Goals of Signals

- Fine-grained reactivity
- Predictable updates
- Less boilerplate
- Better performance
- Make Zone.js optional
- Compete with modern reactive frameworks

Signals allow Angular to know what changed and who depends on it — exactly.

## Difference Between Signals and Observables

| Feature | Signals | Observables |
|---------|---------|-------------|
| Nature | State container | Stream of events |
| Sync / Async | Synchronous | Asynchronous |
| Current value | Always available | Not always |
| Subscription | Automatic | Manual / async pipe |
| Boilerplate | Very low | High |
| Memory management | Automatic | Must unsubscribe |
| Use case | UI state | Events, HTTP, streams |
### Example Comparison

**Signal**
```typescript
count = signal(0);
count.set(1);
console.log(count());
```

**Observable**
```typescript
count$ = new BehaviorSubject(0);
count$.next(1);
count$.subscribe(v => console.log(v));
```

### When to Use What?

- **Signals** → Component state, UI logic
- **Observables** → HTTP calls, WebSockets, async streams

They complement, not replace each other.

## Can Angular Work Without Zone.js?

Yes, Angular can work without Zone.js.

Angular traditionally used Zone.js to detect async operations like:

- Click events
- HTTP calls
- Timers

With signals, Angular no longer needs to guess when data changes.

### Zone-less Angular

- You manually control reactivity
- Signals notify Angular directly
- No global monkey-patching

### Benefits of Removing Zone.js

- Faster execution
- Less overhead
- More predictable updates
- Better performance on large apps

This is a major architectural shift for Angular.

## How Do Signals Improve Performance?

### Fine-Grained Change Detection

Angular updates only the exact bindings that depend on a signal.

```typescript
total = signal(0);
```

Only templates reading `total()` are re-rendered.

- No full component tree checks
- No unnecessary DOM updates

### No Global Change Detection Cycles

With signals:

- No full application re-check
- No cascading checks
- No guessing
- Angular knows precisely what changed

### Eliminates Need for OnPush in Many Cases

- Signals already behave like OnPush by default
- No need for immutability tricks
- No manual `markForCheck()`

### Automatic Dependency Tracking

Angular tracks dependencies at runtime:

```typescript
fullName = computed(() => firstName() + ' ' + lastName());
```

Only recalculates when:

- `firstName` OR
- `lastName` changes

### Less Memory & Cleaner Code

- No subscriptions
- No unsubscriptions
- No RxJS boilerplate
- Less bug-prone

### Signals vs Traditional Change Detection (Summary)

**Before Signals**
- Zone.js detects async
- Angular checks everything
- Performance tuning required

**With Signals**
- Explicit updates
- Fine-grained tracking
- Automatic optimization




What is @ViewChild?

@ViewChild is an Angular decorator used to get a reference to a DOM element, component, or directive from a component’s template.

It allows you to directly access and interact with child elements or components after Angular renders the view.

Example

```typescript
@ViewChild('inputBox') inputRef!: ElementRef;
```

## How does ViewChild work?

Angular scans the component’s template

Finds the matching element/component/directive

Assigns its reference to the decorated property

Reference becomes available after view initialization

Lifecycle

Access in ngAfterViewInit()

@ViewChild('myInput') myInput!: ElementRef;

ngAfterViewInit() {
  this.myInput.nativeElement.focus();
}

Template
<input #myInput />

## What do you get from @ViewChild?

Depending on what you query, @ViewChild can return:

| Query Type | What You Get |
|-----------|-------------|
| DOM element | ElementRef |
| Component | Component instance |
| Directive | Directive instance |
| TemplateRef | Embedded template |
| ViewContainerRef | Container to create views |

### Example – Child Component Access

```typescript
@ViewChild(ChildComponent) child!: ChildComponent;

this.child.someMethod();
```

## Difference between @ViewChild and ngModel

| Feature | @ViewChild | ngModel |
|---------|-----------|--------|
| Purpose | Access DOM/components | Two-way data binding |
| Used For | Imperative DOM access | Form input handling |
| Binding Type | One-way reference | Two-way binding |
| Works With | Any element/component | Form elements only |
| Lifecycle | After view init | During change detection |
| Forms Module | Not required | Required |

### ngModel Example

```html
<input [(ngModel)]="username" />
```

```typescript
username = '';
```

### @ViewChild Example

```html
<input #box />
```

```typescript
@ViewChild('box') box!: ElementRef;
```

## Interview One-Liner Answers (Quick Recall)

- **@ViewChild**: Used to access child DOM elements, components, or directives in Angular.
- **When available**: After `ngAfterViewInit`.
- **ngModel**: Used for two-way data binding in forms.
- **Key Difference**: @ViewChild accesses the view directly, ngModel binds data.

## When to Use What?

### Use @ViewChild when:

- Focusing input
- Calling child component methods
- Measuring DOM elements

### Use ngModel when:

- Handling form input
- Binding user input to variables




## What are Directives?

Directives are Angular classes that change the behavior or appearance of elements in the DOM.

They tell Angular how an element should look or behave.

Components are also directives, but with a template.

### Example

```html
<p *ngIf="isLoggedIn">Welcome</p>
```

## Types of Directives

Angular has three main types of directives:

| Type | Purpose |
|------|----------|
| Component Directives | Create UI with template |
| Structural Directives | Change DOM structure |
| Attribute Directives | Change appearance/behavior |
## What are Structural Directives?

Structural directives change the DOM layout by adding, removing, or modifying elements.

They usually start with `*`.

### Common Structural Directives

- `*ngIf`
- `*ngFor`
- `*ngSwitch`

### Example

```html
<div *ngIf="isAdmin">Admin Panel</div>
```

Internally use `TemplateRef` and `ViewContainerRef`

## What are Attribute Directives?

Attribute directives change the appearance or behavior of an existing element without changing the DOM structure.

They are used like normal attributes.

### Common Attribute Directives

- `ngClass`
- `ngStyle`
- `ngModel`

### Example

```html
<p [ngClass]="{ active: isActive }">Hello</p>
```

## What is a Custom Directive?

A custom directive is a user-defined directive created to apply reusable behavior or styling across multiple components.

### Example – Highlight Directive

```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### Usage

```html
<p appHighlight>Highlighted Text</p>
```

## When Should You Create a Custom Directive?

Create a custom directive when:

- Same DOM logic is repeated
- You want reusable UI behavior
- You need to manipulate DOM safely
- You want clean and readable templates

### Real-World Use Cases

- Auto focus input
- Permission-based visibility
- Tooltip behavior
- Input formatting (uppercase, number-only)



## What is a Pipe?

A pipe in Angular is used to transform data in the template before displaying it to the user.

### Example

```html
{{ username | uppercase }}
{{ today | date:'dd/MM/yyyy' }}
```

## What is a Custom Pipe?

A custom pipe is a user-defined pipe created when built-in pipes don’t meet your requirements.

### Example

```typescript
@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
```

**Usage**
```html
{{ description | shorten:20 }}
```

## What is the transform() method?

`transform()` is the mandatory method in a pipe that receives input data and returns transformed output.

```typescript
transform(value: any, ...args: any[]): any
```

Angular calls this method automatically during change detection.

## Can you use multiple pipes together?

Yes, pipes can be chained.

### Example

```html
{{ user.name | uppercase | slice:0:5 }}
```

Execution is left to right.

## Difference between Built-in and Custom Pipes

| Feature | Built-in Pipes | Custom Pipes |
|---------|---|---|
| Provided by Angular | Yes | No |
| Developer created | No | Yes |
| Common usage | Dates, strings, numbers | App-specific logic |
| Reusability | Limited | High |
## RxJS (Angular + JavaScript)

## What is RxJS?

RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables to handle async data streams.

Angular uses RxJS heavily for:

- HTTP calls
- Events
- State management

## Why Angular uses RxJS?

Angular uses RxJS because it:

- Handles async operations efficiently
- Supports cancellation
- Allows stream composition
- Improves performance and scalability

## What is an Observable?

An Observable is a lazy data stream that can emit multiple values over time.

### Example

```typescript
this.http.get('/api/users').subscribe(data => {
  console.log(data);
});
```

## Difference between Observable and Promise

| Feature | Observable | Promise |
|---------|-----------|--------|
| Emits values | Multiple | Single |
| Cancelable | Yes | No |
| Lazy | Yes | No |
| Operators | Rich | Limited |
## What is pipe() in RxJS?

`pipe()` is used to combine multiple RxJS operators.

### Example

```typescript
this.http.get(url).pipe(
  map(res => res.data),
  filter(data => data.length > 0)
);
```

## RxJS Operators

## What is map operator?

Transforms emitted values.

```typescript
map(value => value * 2)
```

## What is filter operator?

Filters values based on a condition.

```typescript
filter(value => value > 10)
```

## What is switchMap?

- Cancels previous observable
- Switches to the latest one
- Best for API calls & search

```typescript
switchMap(() => this.http.get(url))
```

## What is mergeMap?

- Runs multiple observables in parallel
- Does not cancel previous ones

## What is concatMap?

- Executes observables one after another
- Maintains order

## What is forkJoin?

Executes multiple observables in parallel and emits once all complete.

```typescript
forkJoin([api1$, api2$]).subscribe()
```

## Subjects

## What is a Subject?

A Subject is both:

- An Observable
- An Observer
- Used for multicasting values

## What is a BehaviorSubject?

A BehaviorSubject:

- Requires an initial value
- Always emits the latest value to new subscribers

```typescript
const user$ = new BehaviorSubject(null);
```

## Difference between Subject and BehaviorSubject

| Feature | Subject | BehaviorSubject |
|---------|---------|----------|
| Initial value | No | Yes |
| Last value replay | No | Yes |
| State handling | Poor | Good |

## When should you use Subject?

### Use Subject when:

- Event communication
- Broadcasting values
- No need to store last state

### Use BehaviorSubject when:

- App state management
- User/session data

## Authentication & Authorization (Angular)

## What is Authentication?

Authentication verifies who the user is.

Example: Login using email & password

## What is Authorization?

Authorization determines what the user can access.

Example: Admin vs User permissions

## What are Interceptors?

HTTP Interceptors intercept requests/responses to:

- Attach tokens
- Handle errors
- Log requests

### Example

```typescript
intercept(req, next) {
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer token')
  });
  return next.handle(authReq);
}
```

## What is JWT?

JWT (JSON Web Token) is a stateless token used for secure authentication.

### Structure

```
Header.Payload.Signature
```

### Stored in:

- LocalStorage
- SessionStorage
- HttpOnly cookies

## What are Route Guards?

Route Guards control navigation access in Angular.

### Common Guards:

- `CanActivate`
- `CanDeactivate`
- `CanLoad`
- `CanActivateChild`

## Difference between CanActivate and CanDeactivate

| Feature | CanActivate | CanDeactivate |
|---------|-----------|---------------|
| Purpose | Enter route | Leave route |
| Used for | Auth check | Unsaved changes |
| Example | Login guard | Form warning |
