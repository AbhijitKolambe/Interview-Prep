# Angular Interview Guide - V2

## Table of Contents

### Part 1: Basics & Fundamentals
1. [What is Angular?](#what-is-angular)
2. [What is the difference between Angular and AngularJS?](#angular-vs-angularjs)
3. [How does an Angular application load and start?](#app-loading)
4. [What is the role of index.html?](#index-html)
5. [What is main.ts?](#main-ts)
6. [What is bootstrapping in Angular?](#bootstrapping)
7. [What is the root component?](#root-component)
8. [What is a component in Angular?](#component)
9. [What is selector and template?](#selector-template)
10. [How does Angular render components?](#render-components)
11. [Can we bootstrap another component?](#bootstrap-other)

### Part 2: NgModule
1. [What is NgModule in Angular?](#ngmodule)
2. [What is app.module.ts?](#app-module)
3. [What is the purpose of declarations?](#declarations)
4. [What are imports in NgModule?](#imports)
5. [What are providers in NgModule?](#providers)
6. [What is the bootstrap array?](#bootstrap-array)
7. [How does NgModule organize an application?](#ngmodule-organize)
8. [How do feature modules improve scalability?](#feature-modules)
9. [How does NgModule support lazy loading?](#lazy-loading-module)

### Part 3: Angular CLI & Build Tools
1. [What is Angular CLI?](#angular-cli)
2. [What is the difference between ng build and ng serve?](#build-vs-serve)
3. [What happens internally when you run ng build?](#ng-build-internal)
4. [Where are build configurations defined?](#build-config)
5. [How does Angular generate bundles?](#bundles)
6. [What is the role of Angular compiler?](#angular-compiler)

### Part 4: Component Communication
1. [How do components communicate?](#component-communication)
2. [How do parent and child communicate?](#parent-child)
3. [How do non-related components communicate?](#non-related)
4. [How can services be used for communication?](#services-communication)
5. [How do RxJS observables help?](#rxjs-observables)

### Part 5: Data Binding
1. [What is data binding?](#data-binding)
2. [What are the types of data binding?](#binding-types)
3. [What is interpolation?](#interpolation)
4. [What is property binding?](#property-binding)
5. [What is event binding?](#event-binding)
6. [What is two-way data binding?](#two-way-binding)

### Part 6: Directives
1. [What are directives?](#directives)
2. [What are the types of directives?](#directive-types)
3. [What are structural directives?](#structural-directives)
4. [What are attribute directives?](#attribute-directives)
5. [What is a component directive?](#component-directive)
6. [What is *ngFor?](#ngFor)
7. [What is *ngIf?](#ngIf)
8. [What is ngSwitch?](#ngSwitch)
9. [What is trackBy?](#trackBy)
10. [How does trackBy improve performance?](#trackBy-performance)

### Part 7: Pipes
1. [What are pipes?](#pipes)
2. [What is a custom pipe?](#custom-pipe)
3. [What is the transform() method?](#transform-method)
4. [Can pipes be chained?](#pipe-chaining)

### Part 8: Lifecycle Hooks
1. [What are lifecycle hooks?](#lifecycle-hooks)
2. [What is the role of constructor?](#constructor)
3. [What is ngOnInit?](#ngOnInit)
4. [What is ngOnChanges?](#ngOnChanges)
5. [What is ngDoCheck?](#ngDoCheck)
6. [What is ngOnDestroy?](#ngOnDestroy)
7. [Difference between constructor and ngOnInit](#constructor-vs-ngOnInit)

### Part 9: Change Detection
1. [What is change detection?](#change-detection)
2. [What are change detection strategies?](#detection-strategies)
3. [What is the default strategy?](#default-strategy)
4. [What is OnPush change detection?](#onpush)
5. [When should you use OnPush?](#use-onpush)
6. [Difference between Default and OnPush](#default-vs-onpush)
7. [How does Angular update the DOM?](#dom-update)

### Part 10: Dependency Injection
1. [What is dependency injection?](#dependency-injection)
2. [How does Angular DI work?](#di-work)
3. [What are the benefits of DI?](#di-benefits)
4. [How does DI improve testability?](#di-testability)
5. [What is an injector?](#injector)

### Part 11: Authentication & Authorization
1. [What is authentication?](#authentication)
2. [What is authorization?](#authorization)
3. [Difference between auth and authz](#auth-vs-authz)
4. [How is authentication implemented?](#auth-implementation)
5. [How do route guards work?](#route-guards)
6. [What is CanActivate?](#canactivate)
7. [What is CanLoad?](#canload)
8. [How do you restrict routes?](#restrict-routes)
9. [How do you implement role-based authorization?](#role-based)

### Part 12: JWT Authentication
1. [What is JWT authentication?](#jwt)
2. [How does JWT work in Angular?](#jwt-angular)
3. [Where do you store JWT tokens?](#jwt-storage)
4. [localStorage vs cookies](#storage-comparison)
5. [How do you attach JWT to requests?](#attach-jwt)
6. [How do you redirect unauthenticated users?](#redirect-unauth)

### Part 13: HttpClient & Interceptors
1. [What is HttpClient?](#httpclient)
2. [What is an HTTP interceptor?](#interceptor)
3. [Why use interceptors?](#why-interceptor)
4. [How can interceptors modify requests?](#modify-request)
5. [How can interceptors modify responses?](#modify-response)
6. [How are interceptors used for error handling?](#error-handling)

### Part 14: RxJS & Observables
1. [What is RxJS?](#rxjs)
2. [What is an Observable?](#observable)
3. [Observable vs Promise](#observable-vs-promise)
4. [Why does Angular use Observables?](#why-observable)
5. [What is a subscription?](#subscription)
6. [Why doesn't Observable work without subscribe?](#no-subscribe)
7. [What are common RxJS operators?](#rxjs-operators)

### Part 15: Performance Optimization
1. [What is lazy loading?](#lazy-loading)
2. [How does lazy loading improve performance?](#lazy-benefit)
3. [What is tree shaking?](#tree-shaking)
4. [How does tree shaking work?](#tree-shaking-work)
5. [What are smart and dumb components?](#smart-dumb)
6. [Difference between smart and dumb](#smart-dumb-diff)
7. [How does separation improve performance?](#separation-performance)
8. [How do you handle large datasets?](#large-datasets)
9. [What is pagination?](#pagination)
10. [Why is pagination important?](#pagination-importance)
11. [Backend vs frontend pagination](#pagination-types)
12. [Alternatives to pagination](#pagination-alternatives)

### Part 16: CORS
1. [What is CORS?](#cors)
2. [Why do CORS errors occur?](#cors-errors)
3. [Is CORS related to HTTP vs HTTPS?](#cors-http)
4. [How does the browser enforce CORS?](#cors-enforcement)
5. [How can CORS issues be fixed?](#cors-fix)

### Part 17: Forms
1. [What are the types of forms?](#form-types)
2. [Template-driven vs Reactive forms](#form-comparison)
3. [What is FormControl?](#formcontrol)
4. [What is FormGroup?](#formgroup)
5. [How do validators work?](#validators)
6. [How do you show validation errors?](#validation-errors)

### Part 18: Modern Angular (Standalone & Signals)
1. [What are standalone components?](#standalone)
2. [Why were standalone components introduced?](#why-standalone)
3. [What are Angular Signals?](#signals)
4. [How do signals improve performance?](#signals-performance)
5. [Is zone.js mandatory?](#zone-js)
6. [What is a wireframe?](#wireframe)
7. [What is Figma?](#figma)
8. [Why are UI/UX basics useful?](#ui-ux)

### Part 19: Angular Decorators
1. [What are decorators in Angular?](#decorators-intro)
2. [What are class decorators?](#class-decorators)
3. [What are property decorators?](#property-decorators)
4. [What are method decorators?](#method-decorators)
5. [What are parameter decorators?](#parameter-decorators)

---

## Part 1: Basics & Fundamentals

### What is Angular? 

Angular is a TypeScript-based front-end framework developed by Google for building single-page applications (SPAs).
It provides a structured approach using components, services, dependency injection, routing, and reactive programming to build scalable and maintainable web applications.

---

### What is the difference between Angular and AngularJS? 

| Feature | AngularJS | Angular |
|---------|-----------|---------|
| Language | JavaScript | TypeScript |
| Architecture | MVC | Component-based |
| Data Binding | Two-way by default | More controlled |
| Performance | Slower | Faster with Ivy |
| Mobile Support | No focus | Full support |

**Note:** AngularJS (v1.x) is deprecated, while Angular (v2+) is actively maintained.

---

### How does an Angular application load and start? 

Angular application loading follows these steps:

1. Browser loads `index.html`
2. `main.ts` executes
3. Angular bootstraps the root module or root component
4. Root component is rendered
5. Child components load based on routing and templates

This process initializes the entire Angular application.

---

### What is the role of index.html in Angular? 

`index.html` is the entry point of the Angular application.
It contains the root component selector (e.g., `<app-root></app-root>`) where Angular injects and renders the application.

It also loads compiled JavaScript and CSS files.

---

### What is main.ts and why is it important? 

`main.ts` is the starting file of Angular execution.
It bootstraps the Angular application using:
- `bootstrapApplication()` (standalone)
- `bootstrapModule()` (module-based)

Without `main.ts`, Angular cannot start the app.

---

### What is bootstrapping in Angular? 

Bootstrapping is the process of starting an Angular application by initializing the root component or root module.

During bootstrapping:
- Angular creates the root component
- Attaches it to the DOM
- Starts change detection

---

### What is the root component and how is it loaded? 

The root component (usually `AppComponent`) is the top-level component of an Angular application.

It is loaded during bootstrapping and attached to the selector present in `index.html`, such as `<app-root>`.
All other components are children of the root component.

---

### What is a component in Angular? 

A component is the basic building block of Angular UI.
It controls a part of the screen using:

- HTML template
- CSS styles
- TypeScript logic

Each component is defined using the `@Component` decorator.

---

### What is selector and template in Angular? 

**Selector:**
- Defines the custom HTML tag used to render a component
- Example: `<app-header>`

**Template:**
- Contains the HTML structure of the component
- Defines how the UI looks

Angular uses the selector to place the template in the DOM.

---

### How does Angular render components into the DOM? 

Angular renders components using its rendering engine (Ivy).

Steps:
1. Finds the component selector in the DOM
2. Creates component instance
3. Processes template and bindings
4. Inserts rendered content into the DOM
5. Tracks changes using change detection

---

### Can we bootstrap a component other than the default root component? 

Yes, Angular allows bootstrapping any component as the root component.

However:
- Only one root component can be bootstrapped at a time
- The component's selector must exist in `index.html`

This is useful for micro-frontend or multi-entry applications.

**Interview Tip:** If asked to explain application startup, mention: `index.html → main.ts → bootstrap → root component → child components`

---

## Part 2: NgModule

### What is NgModule in Angular? 

NgModule is a decorator used to group related components, directives, pipes, and services into a logical unit.
It helps Angular understand how different parts of the application fit together and enables features like dependency injection, compilation, and lazy loading.

---

### What is app.module.ts? 

`app.module.ts` is the root module of a traditional Angular application.
It is the first module loaded when the application starts and defines:

- Root component
- Global dependencies
- Application-wide services

It acts as the entry point module for the Angular app.

---

### What is the purpose of declarations in NgModule? 

The `declarations` array is used to declare components, directives, and pipes that belong to the module.

Key points:
- Only declarables go here (components, directives, pipes)
- A declarable can belong to only one module
- Declared items are usable within that module

---

### What are imports in NgModule? 

The `imports` array is used to import other Angular modules whose exported components, directives, or pipes are required.

Examples:
- `BrowserModule`
- `CommonModule`
- `FormsModule`
- Feature modules

This enables code reuse and modular architecture.

---

### What are providers in NgModule? 

The `providers` array is used to register services with Angular's dependency injection system.

Services provided here:
- Are available to the entire module
- Create a singleton instance (by default)

**Note:** In modern Angular, services are commonly provided using `@Injectable({ providedIn: 'root' })` instead.

---

### What is the bootstrap array in NgModule? 

The `bootstrap` array defines which component should be loaded first when the application starts.

Usually:
```typescript
bootstrap: [AppComponent]
```

Only the root module uses the bootstrap array.

---

### How does NgModule help organize an Angular application? 

NgModule helps organize an Angular application by:

- Grouping related functionality
- Separating features into modules
- Improving readability and maintainability
- Supporting lazy loading
- Making the app scalable for large projects

**Grouping Related Functionality**

NgModule allows you to group related components, directives, and pipes that belong to the same feature or domain.

Example: User Feature Module
```typescript
// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule {}
```

All user-related UI logic is grouped together, making the code easy to understand and manage.

**Separating Features into Modules**

Large applications often contain multiple features such as Auth, Dashboard, Products, Orders, etc.
NgModule enables feature-based architecture instead of one huge file.

Feature-based Folder Structure:
```
src/app/
 ├── auth/
 │   ├── auth.module.ts
 │   ├── login.component.ts
 │   └── register.component.ts
 ├── dashboard/
 │   ├── dashboard.module.ts
 │   └── dashboard.component.ts
 └── app.module.ts
```

This separation:
- Reduces coupling
- Improves team collaboration
- Makes debugging easier

**Improving Readability & Maintainability**

NgModule clearly defines what belongs to a module and what it depends on.

Key Sections of NgModule:
```typescript
@NgModule({
  declarations: [], // components, directives, pipes
  imports: [],      // other modules
  providers: [],    // services
  exports: []       // public API of the module
})
```

Example: SharedModule
```typescript
@NgModule({
  declarations: [ButtonComponent, DateFormatPipe],
  imports: [CommonModule],
  exports: [ButtonComponent, DateFormatPipe]
})
export class SharedModule {}
```

Any module that imports SharedModule can reuse these features without duplication.

**Supporting Lazy Loading**

NgModule enables lazy loading, meaning feature modules are loaded only when needed.

Lazy Loading Using Router:
```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  }
];

// admin-routing.module.ts
const routes: Routes = [
  { path: '', component: AdminDashboardComponent }
];
```

Benefits:
- Smaller initial bundle
- Faster app startup
- Better runtime performance

**Making the Application Scalable**

NgModule helps scale applications by:
- Isolating features
- Allowing independent development
- Managing dependencies cleanly

Dependency Injection Scope Example:
```typescript
@NgModule({
  providers: [AdminService]
})
export class AdminModule {}
```

AdminService is scoped to AdminModule, not global, which prevents unnecessary memory usage.

**Root Module vs Feature Module**

Root Module (AppModule):
```typescript
@NgModule({
  imports: [BrowserModule, UserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Feature Module (UserModule):
```typescript
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule]
})
export class UserModule {}
```

This modular structure keeps the codebase clean and manageable.

---

### How do feature modules improve scalability? 

Feature modules improve scalability by:

- Splitting the application into independent features
- Reducing the size of the root module
- Allowing teams to work independently
- Enabling lazy loading for better performance

Each feature module handles a specific business domain.

---

### How does NgModule support lazy loading? 

NgModule supports lazy loading by allowing feature modules to load only when required using Angular Router.

Benefits:
- Faster initial load time
- Reduced bundle size
- Better application performance

Lazy-loaded modules are loaded on demand, not at startup.

**Interview Tip:** If asked "Is NgModule mandatory?", say:

NgModule is required in module-based architecture, but standalone components (Angular 14+) allow building apps without NgModule.

---

## Part 3: Angular CLI & Build Tools

### What is Angular CLI? 

Angular CLI (Command Line Interface) is a developer tool that helps create, build, test, and maintain Angular applications efficiently.
It automates common tasks like:

- Project scaffolding
- Component/service generation
- Development server setup
- Production builds
- Testing and linting

Angular CLI enforces best practices and standard project structure.

---

### What is the difference between ng build and ng serve? 

| Feature | ng build | ng serve |
|---------|----------|----------|
| Purpose | Creates production-ready build | Runs the app in development mode |
| Output | Outputs files to dist/ folder | Serves app from memory |
| Usage | Used for deployment | Used for local development |
| Live Reload | No live reload | Supports live reload |
| Optimization | Optimized (with --prod) | Not fully optimized |

`ng serve` internally uses `ng build` but does not write files to disk.

---

### What happens internally when you run ng build? 

When you run `ng build`, Angular performs the following steps internally:

1. Reads configuration from `angular.json`
2. Compiles TypeScript into JavaScript
3. Processes HTML templates and CSS
4. Runs Angular compiler (AOT/JIT)
5. Bundles files using Webpack
6. Optimizes code (tree-shaking, minification)
7. Outputs final files into `dist/` folder

For production builds, extra optimizations are applied.

---

### Where are Angular build and serve configurations defined? 

Angular build and serve configurations are defined in:

- **angular.json** → Main configuration file
  - Build options
  - Serve options
  - File replacements
  - Optimization flags

- **tsconfig.json** → TypeScript settings
- **package.json** → Scripts and dependencies

Different environments (dev, prod) are configured here.

---

### How does Angular generate bundles? 

Angular uses Webpack (internally via Angular CLI) to generate bundles.

Process:
1. Analyzes application dependencies
2. Splits code into chunks
3. Creates separate bundles for:
   - Main app
   - Vendor libraries
   - Lazy-loaded modules
4. Applies tree-shaking to remove unused code

This improves performance and load time.

---

### What is the role of Angular compiler? 

The Angular compiler converts:

- Angular templates (HTML)
- Decorators
- Metadata

into optimized JavaScript code that the browser can execute.

It supports:
- **JIT (Just-In-Time)** → Compiles at runtime (development)
- **AOT (Ahead-Of-Time)** → Compiles at build time (production)

AOT improves:
- Faster rendering
- Better performance
- Early error detection

---

## Part 4: Component Communication

### How do components communicate in Angular? 

Angular components communicate using multiple techniques depending on their relationship:

- **Parent → Child:** `@Input()`
- **Child → Parent:** `@Output()` with `EventEmitter`
- **Non-related components:** Shared services
- **Complex async communication:** RxJS Observables / Subjects

Choosing the right method improves maintainability and performance.

---

### How do parent and child components communicate? 

**Parent → Child: Using @Input()**

The parent component "owns" the data and passes it down to the child via property binding.

Child Component (child.component.ts):
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Message from parent: {{ childMessage }}</p>`
})
export class ChildComponent {
  @Input() childMessage: string = ''; // Receives data
}
```

Parent Component (parent.component.html):
```html
<app-child [childMessage]="parentData"></app-child>
```

**Child → Parent: Using @Output()**

The child component triggers an event that the parent listens for, often sending data back up.

Child Component (child.component.ts):
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button (click)="sendMessage()">Send to Parent</button>`
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from the Child!');
  }
}
```

Parent Component (parent.component.ts & .html):

TypeScript:
```typescript
// Logic
receiveMessage($event: string) {
  console.log($event); // "Hello from the Child!"
}
```

HTML:
```html
<app-child (messageEvent)="receiveMessage($event)"></app-child>
```

**Summary Table**

| Direction | Mechanism | Decorator |
|-----------|-----------|-----------|
| Parent → Child | Property Binding | `@Input()` |
| Child → Parent | Event Binding | `@Output()` & `EventEmitter` |

This is the most common and recommended way for tightly coupled components.

---

### How do non-related components communicate? 

Non-related components communicate using a shared service.

Steps:
1. Create a shared service
2. Use RxJS `Subject` or `BehaviorSubject`
3. Inject the service into both components
4. Emit data from one component
5. Subscribe in the other component

This avoids tight coupling and supports scalability.

---

### How can services be used for component communication? 

Services act as a central data store or event bus.

Advantages:
- Data sharing across components
- State persistence
- Loose coupling
- Reusability

Services use dependency injection to provide shared state across the app.

---

### How do RxJS observables help in component communication? 

RxJS Observables provide asynchronous data streams for component communication.

Benefits:
- Handle async data safely
- Support real-time updates
- Multiple subscribers
- Better memory management

Commonly used:
- `Subject`
- `BehaviorSubject`
- `ReplaySubject`

Observables are ideal for event-driven communication.

---

## Part 5: Data Binding

### What is data binding in Angular? 

Data binding is the mechanism that connects the component's TypeScript logic with the HTML template.

It ensures synchronization between:
- **UI (View)**
- **Component data (Model)**

Angular supports one-way and two-way data binding.

---

### What are the types of data binding? 

Angular supports four types of data binding:

1. **Interpolation** - One-way from component to view
2. **Property Binding** - One-way binding to properties
3. **Event Binding** - One-way from view to component
4. **Two-Way Data Binding** - Both directions simultaneously

---

### What is interpolation? 

Interpolation is used to display component data in the template using `{{ }}`.

Example:
```html
<h1>{{ title }}</h1>
```

It supports one-way binding from component to view.

---

### What is property binding? 

Property binding binds a DOM property to a component variable using `[ ]`.

Example:
```html
<img [src]="imageUrl">
```

It updates the UI whenever the bound property changes.

---

### What is event binding? 

Event binding listens to DOM events and triggers component methods using `( )`.

Example:
```html
<button (click)="saveData()">Save</button>
```

It allows data flow from view to component.

---

### What is two-way data binding? 

Two-way data binding synchronizes data both ways between component and template.

Syntax:
```html
<input [(ngModel)]="username">
```

Changes in UI update the component and vice versa.

**Note:** Requires `FormsModule`.

---

## Part 6: Directives

### What are directives in Angular? 

Directives are special instructions in Angular that modify the structure, behavior, or appearance of DOM elements.
They allow developers to extend HTML with custom functionality.

Angular uses directives to:
- Manipulate DOM elements
- Add dynamic behavior
- Control rendering logic

---

### What are the types of directives? 

Angular has three types of directives:

1. **Component Directives**
2. **Structural Directives**
3. **Attribute Directives**

Each type serves a different purpose in UI rendering.

---

### What are structural directives? 

Structural directives change the structure of the DOM by adding or removing elements.

Key characteristics:
- Prefixed with `*`
- Work on templates
- Modify layout dynamically

Examples:
- `*ngIf`
- `*ngFor`
- `*ngSwitch`

---

### What are attribute directives? 

Attribute directives change the appearance or behavior of an existing DOM element without altering the structure.

Examples:
- `ngClass`
- `ngStyle`
- Custom attribute directives

They work by modifying element properties or styles.

---

### What is a component directive? 

A component directive is a directive with a template.
In Angular, every component is a directive, but not every directive is a component.

Components:
- Control a portion of UI
- Have HTML, CSS, and logic
- Are defined using `@Component`

---

### What is *ngFor? 

`*ngFor` is a structural directive used to loop through a list and render elements dynamically.

Example:
```html
<li *ngFor="let item of items">{{ item }}</li>
```

It is commonly used for rendering lists and tables.

---

### What is *ngIf? 

`*ngIf` is a structural directive used to conditionally add or remove elements from the DOM.

Example:
```html
<div *ngIf="isLoggedIn">Welcome User</div>
```

When the condition is false, the element is removed from the DOM, not just hidden.

---

### What is ngSwitch? 

`ngSwitch` is a structural directive used to display content based on multiple conditions.

Example:
```html
<div [ngSwitch]="role">
  <p *ngSwitchCase="'admin'">Admin</p>
  <p *ngSwitchCase="'user'">User</p>
  <p *ngSwitchDefault>Guest</p>
</div>
```

It works like a switch-case statement.

---

### What is trackBy and why is it used? 

`trackBy` is a function used with `*ngFor` to uniquely identify list items.

By default, Angular tracks items by object reference.
`trackBy` allows tracking using a unique identifier like `id`.

---

### How does trackBy improve performance? 

`trackBy` improves performance by:

- Preventing unnecessary DOM re-creation
- Updating only changed items
- Reducing rendering cost
- Improving performance for large lists

This is especially useful in frequently updating lists.

---

## Part 7: Pipes

### What are pipes in Angular? 

Pipes in Angular are used to transform data in templates before displaying it to the user.
They take input data, apply a transformation, and return a formatted output without changing the original value.

Angular provides built-in pipes like `date`, `uppercase`, `currency`, and `async`.

---

### What is a custom pipe? 

A custom pipe is a user-defined pipe created when built-in pipes do not meet application requirements.

Custom pipes allow developers to:
- Apply reusable data transformations
- Keep templates clean
- Encapsulate formatting logic

They are created using the `@Pipe` decorator.

---

### What is the purpose of the transform() method? 

The `transform()` method is the core method of a pipe.
It receives input data and optional parameters, performs the transformation, and returns the transformed value.

Angular automatically calls `transform()` whenever:
- Input data changes
- Pipe parameters change

---

### Can multiple pipes be chained together? 

Yes, Angular allows chaining multiple pipes together in a template.

Example:
```html
{{ username | uppercase | slice:0:5 }}
```

Here:
- `uppercase` transforms the text
- `slice` further modifies the result

Pipe chaining improves readability and reusability of transformations.

---

## Part 8: Lifecycle Hooks

### What are lifecycle hooks in Angular? 

Lifecycle hooks are special methods provided by Angular that allow developers to tap into different stages of a component's lifecycle—from creation to destruction.

They help manage:
- Initialization logic
- Change detection
- Cleanup tasks
- Performance optimizations

Angular calls these hooks automatically at specific moments.

---

### What is the role of constructor in Angular? 

The constructor is a TypeScript class feature, not an Angular lifecycle hook.

Its primary role is:
- Dependency injection
- Simple property initialization

It should not contain business logic or API calls, as the component is not fully initialized at this stage.

---

### What is ngOnInit? 

`ngOnInit` is a lifecycle hook that runs once after Angular initializes all input properties.

It is commonly used for:
- API calls
- Component initialization logic
- Subscribing to observables

It is the recommended place for initialization code.

---

### What is ngOnChanges? 

`ngOnChanges` is triggered whenever an `@Input()` property changes.

It receives a `SimpleChanges` object that contains:
- Previous value
- Current value
- Change status

It is useful for reacting to input-driven changes.

---

### What is ngDoCheck? 

`ngDoCheck` is a lifecycle hook that allows developers to implement custom change detection logic.

Key points:
- Called during every change detection cycle
- Used when default Angular change detection is not sufficient
- Should be used carefully due to performance impact

---

### What is ngOnDestroy? 

`ngOnDestroy` is called just before a component is destroyed.

It is used to:
- Unsubscribe from observables
- Clear timers or intervals
- Remove event listeners
- Prevent memory leaks

This hook is critical for application stability.

---

### Difference between constructor and ngOnInit 

| Feature | Constructor | ngOnInit |
|---------|-------------|----------|
| Type | TypeScript feature | Angular lifecycle hook |
| Execution | Runs first | Runs after constructor |
| Use Case | Dependency Injection | Initialization logic |
| Readiness | Component not ready | Component fully initialized |
| API Calls | Avoid API calls | Best place for API calls |

---

## Part 9: Change Detection

### What is change detection in Angular? 

Change detection is the mechanism Angular uses to detect changes in application data and update the DOM accordingly.

Whenever application state changes (user input, API response, timer, event), Angular checks:
- Component properties
- Template bindings

If changes are found, Angular updates only the affected parts of the UI.

---

### What are change detection strategies? 

Angular provides two change detection strategies:

1. **Default**
2. **OnPush**

These strategies control when and how Angular checks components for changes.

---

### What is the default change detection strategy? 

The Default strategy checks all components in the component tree whenever a change occurs.

Triggers include:
- User events
- HTTP responses
- Timers
- Async operations

Angular starts from the root component and checks every child component.

**Note:** This approach is simple but can be less performant for large applications.

---

### What is OnPush change detection? 

OnPush is an optimized change detection strategy where Angular checks a component only when specific conditions are met.

A component with OnPush is checked when:
- An `@Input()` reference changes
- An event occurs inside the component
- An observable emits a new value
- Change detection is triggered manually

This reduces unnecessary checks and improves performance.

---

### When should you use OnPush? 

Use OnPush when:
- Components receive data via `@Input()`
- Data is immutable
- Using observables or async pipe
- Application has performance issues
- Large lists or complex UI structures

OnPush is ideal for high-performance and scalable applications.

---

### Difference between Default and OnPush 

| Feature | Default Strategy | OnPush Strategy |
|---------|-----------------|-----------------|
| Scope | Checks all components | Checks only when inputs change |
| Frequency | Frequent change detection | Reduced change detection |
| Complexity | Easier to use | Requires immutability |
| Performance | Lower performance | Higher performance |
| Best For | Small apps | Large apps |

---

### How does Angular update the DOM when data changes? 

Angular updates the DOM using the following process:

1. Change detection runs
2. Angular compares old and new values
3. Determines what has changed
4. Updates only affected DOM nodes
5. Re-renders the necessary views

Angular does not re-render the entire DOM, only the parts that changed.

---

## Part 10: Dependency Injection

### What is dependency injection? 

Dependency Injection (DI) is a design pattern in which an object receives its dependencies from an external source rather than creating them itself.

In Angular, DI allows components and services to request dependencies, and Angular automatically provides and manages them.

**Note:** This promotes loose coupling, reusability, and maintainability.

---

### How does Angular dependency injection work? 

Angular DI works using a hierarchical injector system.

Flow:
1. A component or service requests a dependency
2. Angular checks the injector tree
3. If found, Angular provides the instance
4. If not found, Angular creates one (if provider exists)
5. The same instance is reused if it's a singleton

Providers define how and where a dependency is created.

---

### What are the benefits of dependency injection? 

Key benefits of DI include:

- Loose coupling between components and services
- Better code reusability
- Easier maintenance
- Improved testability
- Centralized dependency management
- Better scalability for large applications

DI helps follow SOLID principles, especially the Dependency Inversion Principle.

---

### How does DI improve testability? 

DI improves testability by allowing mock or fake dependencies to be injected instead of real ones.

Benefits for testing:
- Components can be tested in isolation
- External dependencies (API, services) can be mocked
- Unit tests become faster and more reliable

This makes unit testing simpler and cleaner.

---

### What is an injector in Angular? 

An injector is a core Angular service responsible for creating and managing dependencies.

Key points:
- Maintains a registry of providers
- Creates dependency instances
- Handles dependency lifecycles
- Supports hierarchical structure (root → module → component)

Each Angular application has a root injector, and child injectors are created as needed.

**Interview Tip:**

If asked "Where should services be provided?", answer:

Prefer `@Injectable({ providedIn: 'root' })` to create a singleton service shared across the app.

---

## Part 11: Authentication & Authorization

### What is authentication? 

Authentication is the process of verifying the identity of a user.

It answers the question: **"Who are you?"**

Examples:
- Login using username & password
- OTP verification
- Token-based login (JWT)

Authentication ensures the user is valid and logged in.

---

### What is authorization? 

Authorization determines what actions or resources an authenticated user is allowed to access.

It answers the question: **"What are you allowed to do?"**

Examples:
- Admin access
- Read-only user
- Restricted pages

---

### Difference between authentication and authorization 

| Feature | Authentication | Authorization |
|---------|---|---|
| Purpose | Verifies user identity | Verifies user permissions |
| When | Happens first | Happens after authentication |
| Example | Login process | Access control |
| Uses | Credentials | Roles/permissions |

---

### How is authentication implemented in Angular? 

Authentication in Angular is typically implemented using:

1. Login form
2. API call to backend
3. Backend returns a token (usually JWT)
4. Token is stored (localStorage/sessionStorage)
5. Token is attached to HTTP requests using HTTP Interceptor
6. Auth state is managed via a service

Angular handles the frontend authentication flow, while the backend validates the user.

---

### How do route guards work? 

Route guards are Angular interfaces used to control navigation between routes.

They run before a route is activated or loaded and return:
- `true` → allow navigation
- `false` → block navigation
- `UrlTree` → redirect user

Guards help protect routes from unauthorized access.

---

### What is CanActivate? 

`CanActivate` is a route guard that determines whether a route can be activated.

It is commonly used to:
- Check login status
- Validate authentication token
- Restrict access to protected routes

If `CanActivate` returns false, navigation is blocked.

---

### What is CanLoad? 

`CanLoad` is a route guard that determines whether a lazy-loaded module can be loaded.

Key use case:
- Prevent loading modules for unauthorized users
- Improve security and performance

Unlike `CanActivate`, `CanLoad` blocks the download of the module itself.

---

### How do you restrict routes for unauthorized users? 

Routes are restricted using route guards.

Steps:
1. Create an AuthGuard
2. Check authentication status
3. Return false or redirect to login
4. Apply guard to routes using `canActivate` or `canLoad`

This ensures only authorized users can access protected pages.

---

### How do you implement role-based authorization? 

Role-based authorization is implemented by:

1. Storing user roles in JWT or auth service
2. Creating a guard that checks user role
3. Defining allowed roles in route configuration
4. Allowing or denying access based on role match

This allows fine-grained access control such as Admin, User, Manager roles.

---

## Part 12: JWT Authentication

### What is JWT authentication? 

JWT (JSON Web Token) authentication is a token-based authentication mechanism where the server issues a signed token after successful login.

The token contains:
- User identity
- Roles/permissions
- Expiry information

JWT is stateless, meaning the server does not store session data.

---

### How does JWT-based authentication work in Angular? 

JWT authentication in Angular follows this flow:

1. User submits login credentials
2. Backend validates credentials
3. Backend returns a JWT
4. Angular stores the JWT
5. JWT is attached to HTTP requests
6. Backend validates JWT on each request
7. User gets access to protected resources

Angular handles the client-side flow, while the backend validates the token.

---

### Where do you store JWT tokens? 

JWT tokens can be stored in:

- `localStorage`
- `sessionStorage`
- HTTP-only cookies

The choice depends on security and application requirements.

---

### localStorage vs cookies for token storage 

| Feature | localStorage | Cookies |
|---------|---|---|
| Implementation | Easy to implement | More secure with HttpOnly |
| Security | Vulnerable to XSS | Protected from XSS |
| Token Handling | Manual token handling | Automatic with requests |
| Common Use | SPAs | High-security apps |

**Best practice:** Use HttpOnly cookies for sensitive applications.

---

### How do you attach JWT tokens to HTTP requests? 

JWT tokens are attached using an HTTP Interceptor.

Process:
1. Interceptor reads the token from storage
2. Adds it to request headers
3. Sends the modified request

Header format:
```
Authorization: Bearer <token>
```

This ensures every secured API request includes authentication.

---

### How do you redirect unauthenticated users? 

Unauthenticated users are redirected using Route Guards.

Steps:
1. Guard checks if JWT exists and is valid
2. If invalid or missing:
   - Redirect user to login page
3. If valid:
   - Allow route access

This protects routes from unauthorized access.

---

## Part 13: HttpClient & Interceptors

### What is HttpClient? 

`HttpClient` is an Angular service used to communicate with backend APIs over HTTP.

It provides methods like:
- `get()`
- `post()`
- `put()`
- `delete()`
- `patch()`

Key features:
- Returns RxJS Observables
- Automatically handles JSON
- Supports headers, params, and error handling
- Integrates well with interceptors

---

### What is an HTTP interceptor? 

An HTTP interceptor is a special Angular service that allows you to intercept and modify HTTP requests and responses globally.

It sits between the application and the backend and is implemented using the `HttpInterceptor` interface.

---

### Why do we use HTTP interceptors? 

HTTP interceptors are used to handle cross-cutting concerns in one central place, such as:

- Attaching authentication tokens
- Logging requests and responses
- Handling global errors
- Modifying headers
- Showing/hiding loaders

They help avoid duplicate code across services.

---

### How can interceptors modify requests? 

Interceptors can modify outgoing requests by cloning the request and adding changes.

Common modifications:
- Add Authorization headers
- Add custom headers
- Modify request URLs
- Add query parameters

**Note:** Requests are immutable, so cloning is required.

---

### How can interceptors modify responses? 

Interceptors can process incoming responses by:

- Transforming response data
- Logging responses
- Handling specific status codes
- Extracting useful information

They can also pass the response forward after modification using RxJS operators like `map()`.

---

### How are interceptors used for error handling? 

Interceptors handle errors using RxJS `catchError()`.

They can:
- Catch HTTP errors globally
- Handle 401, 403, 500 errors
- Redirect to login on unauthorized access
- Show user-friendly error messages
- Retry failed requests if needed

This provides centralized and consistent error handling.

---

## Part 14: RxJS & Observables

### What is RxJS? 

RxJS (Reactive Extensions for JavaScript) is a library for reactive programming that works with asynchronous data streams.

It provides:
- Observables
- Operators (map, filter, switchMap, etc.)
- Subjects
- Utilities for handling async events

Angular uses RxJS extensively for HTTP calls, events, routing, and state management.

---

### What is an Observable? 

An Observable is a data stream that emits values over time.

Key characteristics:
- Can emit multiple values
- Can be synchronous or asynchronous
- Can be cancelled (unsubscribed)
- Supports operators for data transformation

Observables are lazy, meaning they don't execute until subscribed.

---

### Observable vs Promise 

| Feature | Observable | Promise |
|---------|---|---|
| Values | Multiple values | Single value |
| Execution | Lazy (executes on subscribe) | Eager (executes immediately) |
| Cancellation | Can be cancelled | Cannot be cancelled |
| Operators | Supports operators | No operators |
| Best For | Streams | One-time async |

**Note:** Angular prefers Observables over Promises.

---

### Why does Angular use Observables? 

Angular uses Observables because they:

- Handle multiple async values
- Support cancellation
- Work well with event streams
- Enable powerful data transformations
- Improve performance and scalability

Examples in Angular:
- `HttpClient`
- Reactive Forms
- Router events

---

### What is a subscription? 

A subscription is the execution of an Observable.

When you subscribe:
- The Observable starts emitting values
- You receive data, errors, or completion signals

Example:
```typescript
observable.subscribe(data => {
  console.log(data);
});
```

---

### Why does an Observable not work without subscribe()? 

Observables are lazy by design.

Without `subscribe()`:
- The Observable does not execute
- No API call is made
- No data is emitted

**Note:** `subscribe()` tells Angular: "Start listening to this data stream."

---

### What are common RxJS operators? 

RxJS operators are used to transform, filter, and control data streams.

Commonly used operators:
- `map()` – transform data
- `filter()` – filter values
- `tap()` – side effects (logging)
- `switchMap()` – cancel previous request
- `mergeMap()` – parallel requests
- `concatMap()` – sequential requests
- `catchError()` – error handling
- `debounceTime()` – delay emissions
- `forkJoin()` – combine multiple observables

Operators help write clean and readable reactive code.

---

## Part 15: Performance Optimization

### What is lazy loading? 

Lazy loading is a technique where application modules are loaded only when they are required, instead of loading everything at application startup.

In Angular, lazy loading is commonly used with feature modules and routing to split the app into smaller chunks.

---

### How does lazy loading improve performance? 

Lazy loading improves performance by:

- Reducing initial bundle size
- Faster first page load
- Loading features on demand
- Saving bandwidth and memory

Only the required code is downloaded when the user navigates to a specific route.

---

### What is tree shaking? 

Tree shaking is a build optimization technique that removes unused code from the final JavaScript bundle.

If a function, class, or module is never used, it will not be included in the production build.

---

### How does tree shaking work in Angular? 

Angular uses ES modules + build tools (Webpack) to analyze imports and exports.

Process:
1. Angular compiler analyzes code usage
2. Identifies unused exports
3. Removes dead code during production build
4. Generates a smaller, optimized bundle

Tree shaking works best with:
- ES2015 modules
- Pure functions
- Proper imports

---

### What are smart and dumb components? 

**Smart Components (Container Components):**
- Handle business logic
- Fetch data from services
- Manage state
- Pass data to child components

**Dumb Components (Presentational Components):**
- Focus only on UI
- Receive data via `@Input()`
- Emit events via `@Output()`
- No business logic

---

### Difference between smart and dumb components 

| Feature | Smart Component | Dumb Component |
|---------|---|---|
| Logic | Contains logic | No business logic |
| Services | Connects to services | UI only |
| State | Manages state | Stateless |
| Reusability | Less reusable | Highly reusable |
| Complexity | More complex | Simple & clean |

---

### How does separation improve performance? 

Separating smart and dumb components improves performance by:

- Reducing unnecessary change detection
- Making components easier to optimize with OnPush
- Improving reusability
- Simplifying testing
- Keeping UI rendering lightweight

This separation leads to clean architecture and scalable performance.

---

### How do you handle large datasets in Angular? 

Large datasets in Angular should be handled using performance-optimized techniques instead of loading everything at once.

Common approaches:
- Pagination
- Backend filtering & sorting
- Virtual scrolling
- Lazy loading data
- Change detection optimization (OnPush)
- Using `trackBy` in `*ngFor`

These techniques reduce memory usage and rendering cost.

---

### What is pagination? 

Pagination is the technique of dividing a large dataset into smaller chunks (pages) and loading/displaying one page at a time.

Example:
- Page 1 → Records 1–20
- Page 2 → Records 21–40

Pagination improves usability and performance.

---

### Why is pagination important? 

Pagination is important because it:

- Reduces initial load time
- Prevents UI freezing
- Improves user experience
- Reduces memory consumption
- Avoids rendering large DOM trees

Without pagination, rendering thousands of records can severely impact performance.

---

### Backend vs frontend pagination 

| Feature | Backend Pagination | Frontend Pagination |
|---------|---|---|
| Data Fetching | Fetched page-wise from server | Full data fetched once |
| Best For | Large datasets | Small datasets |
| Initial Load | Faster initial load | Heavy initial load |
| Scalability | More scalable | Limited scalability |
| Requirements | Requires API support | Simple to implement |

**Best practice:** Use backend pagination for large datasets.

---

### Alternatives to pagination (virtual scroll, lazy load) 

**Virtual Scrolling:**
- Renders only visible items
- Ideal for very large lists
- Commonly used in Angular CDK

**Lazy Loading Data:**
- Loads data only when needed
- Used in infinite scroll or route-based loading

**Infinite Scroll:**
- Loads data as user scrolls
- Common in social media apps

These approaches further optimize rendering and memory usage.

---

## Part 16: CORS

### What is CORS? 

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls how a web application running on one origin can request resources from another origin.

An origin is defined by:
- Protocol (http/https)
- Domain
- Port

If any of these differ, it's considered a cross-origin request.

---

### Why do CORS errors occur? 

CORS errors occur when:

- A browser blocks a cross-origin request
- The server does not send required CORS headers
- The server does not allow the requesting origin

In simple terms:
The browser made the request, but the server did not explicitly allow it.
This is a browser-side security restriction, not a backend error.

---

### Is CORS related to HTTP vs HTTPS? 

Yes, protocol differences matter.

`http://example.com` and `https://example.com` are considered different origins.

However:
- CORS is not caused by HTTP vs HTTPS
- It is caused by origin mismatch
- Even two HTTPS URLs can cause CORS errors if domain or port differs

---

### How does the browser enforce CORS? 

The browser enforces CORS using HTTP headers.

Process:
1. Browser sends a request
2. For certain requests, browser sends a preflight OPTIONS request
3. Server responds with CORS headers like:
   - `Access-Control-Allow-Origin`
   - `Access-Control-Allow-Methods`
   - `Access-Control-Allow-Headers`
4. Browser checks these headers
5. If allowed → request proceeds
6. If not allowed → browser blocks the response

**Note:** The request reaches the server, but the browser blocks access to the response.

---

### How can CORS issues be fixed? 

CORS issues must be fixed on the backend, not the frontend.

Common solutions:
- Add correct `Access-Control-Allow-Origin` header
- Allow required HTTP methods (GET, POST, etc.)
- Allow required headers (Authorization, Content-Type)
- Configure server or API gateway properly
- Use proxy configuration during development
- Enable CORS middleware (Express, Spring, etc.)

**Note:** Disabling CORS in browser is not a solution.

---

## Part 17: Forms

### What are the types of forms in Angular? 

Angular provides two types of forms:

1. **Template-Driven Forms**
2. **Reactive Forms (Model-Driven Forms)**

Both are used to handle user input, validation, and form submission, but they differ in structure and control.

---

### Template-driven vs Reactive forms 

| Feature | Template-Driven Forms | Reactive Forms |
|---------|---|---|
| Logic Location | In template | In component |
| Two-way Binding | Uses ngModel | Uses FormControl, FormGroup |
| Complexity | Simple to use | More powerful & scalable |
| Data Flow | Two-way binding | One-way data flow |
| Testability | Less testable | Highly testable |
| Best For | Small forms | Complex forms |

**Best practice:** Use Reactive Forms for enterprise applications.

---

### What is FormControl? 

`FormControl` represents a single input field in a reactive form.

It tracks:
- Value
- Validation status
- Touched/dirty state

Example:
```typescript
name = new FormControl('', Validators.required);
```

---

### What is FormGroup? 

`FormGroup` is a collection of `FormControl`s that represents an entire form.

It allows:
- Grouping related fields
- Managing form-level validation
- Accessing form values as an object

Example:
```typescript
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});
```

---

### How do validators work? 

Validators are functions that check form values and return errors if validation fails.

Types:
- **Built-in validators:** required, minLength, email
- **Custom validators:** User-defined validation logic

Validators are applied to `FormControl` or `FormGroup` and update the form's valid/invalid status automatically.

---

### How do you show validation errors? 

Validation errors are shown by checking:
- `invalid`
- `touched`
- `dirty`

Example:
```html
<div *ngIf="name.invalid && name.touched">
  Name is required
</div>
```

This ensures errors are displayed only after user interaction, improving UX.

---

## Part 18: Modern Angular (Standalone & Signals)

### What are standalone components? 

Standalone components are Angular components that do not require `NgModule`.
They directly declare their own dependencies (components, directives, pipes) using the `imports` property.

This allows Angular applications to be built without modules, making the architecture simpler and more modular.

---

### Why were standalone components introduced? 

Standalone components were introduced to:

- Reduce boilerplate code (NgModule)
- Simplify application structure
- Improve developer experience
- Enable easier lazy loading
- Align Angular with modern frameworks

They make Angular more lightweight and easier to learn.

---

### What are Angular Signals? 

Angular Signals are a reactive state management primitive introduced to manage state more efficiently.

A signal:
- Holds a value
- Automatically tracks dependencies
- Updates the UI when the value changes

Signals provide fine-grained reactivity compared to traditional change detection.

---

### How do signals improve performance? 

Signals improve performance by:

- Updating only the components that depend on changed data
- Avoiding full change detection cycles
- Reducing unnecessary DOM updates
- Making state updates more predictable

This results in faster rendering and better scalability.

---

### Is zone.js mandatory? 

No, `zone.js` is not mandatory in modern Angular.

Angular can work:
- With `zone.js` (default change detection)
- Without `zone.js` using signals and manual change detection

Zone-less Angular provides better performance and control, especially in large applications.

---

### What is a wireframe? 

A wireframe is a basic visual layout of an application or screen.

It focuses on:
- Structure
- Layout
- Content placement

Wireframes do not include colors or detailed design, only functionality and flow.

---

### What is Figma? 

Figma is a cloud-based UI/UX design tool used to create:

- Wireframes
- UI designs
- Prototypes

It allows real-time collaboration between designers and developers.

---

### Why are UI/UX basics useful for Angular developers? 

UI/UX basics help Angular developers by:

- Understanding design intent
- Translating designs accurately into components
- Improving user experience
- Reducing back-and-forth with designers
- Building cleaner and more reusable UI components

This leads to better products and faster development.

---

## Part 19: Angular Decorators

### What are decorators in Angular? 

In Angular, decorators are special functions that add metadata to classes, properties, methods, or parameters. This metadata tells Angular how to treat a class or member at runtime (component, service, input, injectable, etc.).

Decorators come from TypeScript and are heavily used by Angular to power dependency injection, templates, and change detection.

---

### What are class decorators? 

Class decorators are used on classes to define what role the class plays in Angular.

**@Component**

Marks a class as an Angular component and defines its UI.

```typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {}
```

Used for: UI + logic
Key metadata: selector, template, styles, changeDetection

**@Directive**

Creates a custom directive to manipulate DOM behavior.

```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {}
```

Used for: DOM behavior (attribute/structural directives)

**@Pipe**

Creates a custom pipe for data transformation.

```typescript
@Pipe({ name: 'capitalize' })
export class CapitalizePipe {
  transform(value: string) {
    return value.toUpperCase();
  }
}
```

Used for: Formatting data in templates

**@Injectable**

Marks a class as a service that can be injected.

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {}
```

Why important: Enables Dependency Injection (DI)
`providedIn: 'root'` creates a singleton service that is tree-shakable.

**@NgModule**

Defines a module (less used after standalone components).

```typescript
@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: []
})
export class AppModule {}
```

---

### What are property decorators? 

Property decorators are used on class properties.

**@Input**

Receives data from a parent component.

```typescript
@Input() userName!: string;
```

**@Output**

Sends data/events to a parent component.

```typescript
@Output() save = new EventEmitter<string>();
```

**@ViewChild / @ViewChildren**

Access child component or DOM element.

```typescript
@ViewChild('inputRef') input!: ElementRef;
```

**@ContentChild / @ContentChildren**

Access projected content using `<ng-content>`.

---

### What are method decorators? 

Method decorators are used on methods.

**@HostListener**

Listens to DOM or host events.

```typescript
@HostListener('click')
handleClick() {
  console.log('Clicked');
}
```

**@HostBinding**

Binds a property to the host element.

```typescript
@HostBinding('class.active') isActive = true;
```

---

### What are parameter decorators? 

Parameter decorators are used inside constructor parameters (DI-related).

**@Inject**

Manually specifies a dependency token.

```typescript
constructor(@Inject('API_URL') private apiUrl: string) {}
```

**@Optional**

Prevents error if dependency is missing.

```typescript
constructor(@Optional() private logger?: LoggerService) {}
```

**@Self / @SkipSelf / @Host**

Control where Angular looks for a dependency in the injector tree.

---

## End of Guide

Good luck with your Angular interview!
