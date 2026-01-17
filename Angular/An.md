## 1. What is Angular?
Angular is a TypeScript-based front-end framework developed by Google used to build single-page web applications. It follows a component-based architecture, provides two-way data binding, dependency injection, and built-in routing, which makes applications scalable, maintainable, and easy to test. It is commonly used for enterprise-level applications.

## 2. What is package.json in Angular?
`package.json` is a configuration file in Angular that contains details about the project like dependencies, scripts, and project information.
It is used by npm to install and manage packages.

### What package.json contains?

#### 1. Project Info
- `name` → project name
- `version` → app version
- `description` → optional description

**Example:**
```json
"name": "my-app",
"version": "1.0.0"
```

#### 2. Dependencies (Required libraries)
These are packages needed to run the Angular app.

**Example:**
```json
"dependencies": {
  "@angular/core": "^17.0.0",
  "rxjs": "~7.8.0",
  "zone.js": "~0.14.0"
}
```

#### 3. DevDependencies (Development tools)
These are packages needed only for development and build.

**Example:**
```json
"devDependencies": {
  "@angular/cli": "^17.0.0",
  "typescript": "~5.2.0"
}
```

#### 4. Scripts (Commands)
Scripts are used to run Angular commands easily.

**Example:**
```json
"scripts": {
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test"
}
```

You run them like:
```bash
npm start
npm run build
```

## 3. What is package-lock.json?
It is an auto-generated file created by npm that stores exact installed versions of dependencies.

### Why is package-lock.json important?
It ensures same versions on all systems, avoids mismatch issues, and makes install faster.

### Can we delete package-lock.json?
Yes, but not recommended. If deleted, npm will recreate it during `npm install`, but versions may change.

## 4. What is index.html in Angular?
`index.html` is the main entry file of an Angular application. It is the first file loaded by the browser when the app starts.

### What does it contain?

#### Root component selector
Angular loads the complete application inside:
```html
<app-root></app-root>
```

#### Base URL
It contains:
```html
<base href="/">
```
This helps Angular routing work properly.

**Example:**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularDemo</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### Why is index.html used?
Angular is a Single Page Application (SPA), so `index.html` acts as the single container page and Angular dynamically renders all components inside `<app-root>`.

## 5. What is AppModule?
In Angular, `AppModule` (`app.module.ts`) is the root module of your application.
It tells Angular what components exist, what other modules to use, and which component to start first.

### What AppModule contains (main parts)

#### 1. Imports
Here you import other Angular modules that your app needs.

**Example:**
- `BrowserModule` (required for browser app)
- `FormsModule` / `ReactiveFormsModule`
- `HttpClientModule`
- `AppRoutingModule`

```typescript
imports: [BrowserModule, AppRoutingModule]
```

#### 2. Declarations
Here you register your own components, directives, pipes.

**Example:**
- `AppComponent`
- `HeaderComponent`
- `CustomPipe`

```typescript
declarations: [AppComponent, HeaderComponent]
```

#### 3. Providers
Here you add services (Dependency Injection).

**Example:**
- `AuthService`
- `UserService`

```typescript
providers: [AuthService]
```

> **Note:** In modern Angular, many services use `providedIn: 'root'` so providers may be empty.

#### 4. Bootstrap
This tells Angular which component is the starting point of the app.

**Mostly:**
```typescript
bootstrap: [AppComponent]
```

### Full Example app.module.ts
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## 6. What is app-routing.module.ts in Angular?
`app-routing.module.ts` is a separate routing module used to manage all routes (navigation paths) in your Angular app.

It connects URL path → Component

**Example:**
- `/login` → `LoginComponent`
- `/home` → `HomeComponent`

### Basic Example of app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' } // wildcard route (page not found)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### What it contains?

#### 1. Routes array
List of all routes:
```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent }
];
```

#### 2. RouterModule.forRoot(routes)
Registers routes in the main app module:
```typescript
imports: [RouterModule.forRoot(routes)]
```

#### 3. exports: [RouterModule]
So routing features can be used in whole app:
```typescript
exports: [RouterModule]
```

## 7. Lazy Loading in Angular

### What is Lazy Loading?
Lazy loading means loading a module only when user visits that route.
So app becomes fast, because initial bundle size becomes smaller.

### Why use Lazy Loading?
- Faster initial loading
- Better performance
- Loads feature modules only when needed
- Good for large apps (Admin, Dashboard, etc.)

### Lazy Loading Example

**Step 1: Create a feature module**
```bash
ng generate module admin --route admin --module app.module
```

**Or manual:**

**Step 2: admin-routing.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
```

**Step 3: app-routing.module.ts (Lazy Load)**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

Now `AdminModule` loads only when user opens `/admin`.

## 8. Route Guard in Angular

### What is Route Guard?
Route guard is used to protect routes.
It checks conditions like:
- user logged in or not
- role based access (Admin/User)
- token validation

### Why use Route Guard?
- Prevent unauthorized access
- Secure routes like dashboard, admin page

### Route Guard Example

**Step 1: Create Guard**
```bash
ng generate guard auth
```

**Step 2: auth.guard.ts**
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

**Step 3: Apply Guard in Routing**
```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
```

Now only logged-in users can open `/dashboard`.

### Lazy Loading + Guard Together (Best Interview Answer)
```typescript
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

## 9. app.component.ts in Angular
`app.component.ts` is the root component of an Angular application.
It is the first component that loads when the app starts.

### What app.component.ts contains

#### 1. Component Decorator (@Component)
It defines metadata like:
- selector
- template / templateUrl
- styleUrls

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

#### 2. Class Logic
This class contains:
- variables (data)
- functions (methods)
- lifecycle hooks like ngOnInit()

```typescript
export class AppComponent {
  title = 'My Angular App';

  sayHello() {
    console.log("Hello Angular");
  }
}
```

### Full Example: app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';

  greetUser() {
    alert('Welcome to Angular!');
  }
}
```

### Interview One Line
AppComponent is the root component of Angular, loaded first and bootstrapped in AppModule.

### Bonus (Important)
In index.html Angular loads this:
```html
<app-root></app-root>
```
Inside that, Angular renders `app.component.html`.

## 10. Angular Lifecycle Methods (Hooks)
Lifecycle hooks are special methods that Angular calls automatically at different stages of a component’s life (create → update → destroy).

### 1. ngOnChanges()
Called when `@Input()` data changes from parent component.
**Use for:** reacting to input changes

```typescript
ngOnChanges(changes: SimpleChanges) {
  console.log("Input changed", changes);
}
```

### 2. ngOnInit()
Called once after component is initialized.
**Use for:**
- API call
- initial data load
- default setup

```typescript
ngOnInit() {
  console.log("Component Initialized");
}
```

### 3. ngDoCheck()
Called during every change detection cycle.
**Use for:** custom change detection (rare)

```typescript
ngDoCheck() {
  console.log("Checking changes...");
}
```

### 4. ngAfterContentInit()
Called once after content projection (`<ng-content>`) is initialized.

```typescript
ngAfterContentInit() {
  console.log("Projected content initialized");
}
```

### 5. ngAfterContentChecked()
Called after every check of projected content.

```typescript
ngAfterContentChecked() {
  console.log("Projected content checked");
}
```

### 6. ngAfterViewInit()
Called once after component’s view & child views are initialized.
**Use for:**
- ViewChild access
- DOM operations

```typescript
ngAfterViewInit() {
  console.log("View initialized");
}
```

### 7. ngAfterViewChecked()
Called after every check of component view.

```typescript
ngAfterViewChecked() {
  console.log("View checked");
}
```

### 8. ngOnDestroy()
Called when component is destroyed / removed.
**Use for:**
- unsubscribe observables
- clear timers
- cleanup memory

```typescript
ngOnDestroy() {
  console.log("Component destroyed");
}
```

## 11. What is Module in Angular?
In Angular, a Module is a container that groups related things like:
- Components
- Directives
- Pipes
- Services
- Other modules

Angular module helps to organize the application into small reusable parts.

### Why we use Modules in Angular?
- To divide app into features (Example: Admin, User, Dashboard)
- For code reusability
- For better structure & maintainability
- To manage dependency injection
- For lazy loading feature modules

### Types of Modules in Angular
1. **Root Module**
   - Main module of app
   - Example: `AppModule`

2. **Feature Module**
   - For specific feature
   - Example: `AdminModule`, `UserModule`

3. **Shared Module**
   - Common components/pipes used in many modules
   - Example: `SharedModule`

4. **Core Module**
   - Singleton services (auth, logging) used once
   - Example: `CoreModule`

### Example of Angular Module
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## 12. What is Service in Angular?
In Angular, a Service is a TypeScript class used to write business logic and reusable code that can be shared across multiple components.

### Services are mainly used for:
- API calls
- Data sharing between components
- Common logic (validation, calculations)
- Authentication / Authorization

### Why we use Services?
- Keeps component clean (only UI logic)
- Reusability (use same logic in many components)
- Better maintainability
- Supports Dependency Injection (DI)
- Used for calling backend APIs

### Example of Angular Service

**1. Create service**
```bash
ng generate service user
```

**2. user.service.ts**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return ['A', 'B', 'C'];
  }
}
```

**3. Use service in component**
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  template: `<h2>{{ users }}</h2>`
})
export class HomeComponent implements OnInit {

  users: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```

## 13. Angular AppComponent Flow (Execution Order)

When you run Angular app using:
```bash
ng serve
```
Angular follows this flow:

### Step-by-Step Flow (How App Starts)

#### 1. main.ts runs first
This is the entry point of Angular app. It bootstraps the root module.
```typescript
platformBrowserDynamic().bootstrapModule(AppModule);
```
**Means:** Angular starts with `AppModule`.

#### 2. AppModule (app.module.ts) loads
`AppModule` is the root module.
It contains:
- declarations (components)
- imports (BrowserModule, Routing)
- bootstrap (AppComponent)

**Example:**
```typescript
bootstrap: [AppComponent]
```
**Means:** `AppComponent` will load first.

#### 3. index.html loads `<app-root>`
Angular app runs inside:
```html
<app-root></app-root>
```
This `<app-root>` matches selector of `AppComponent`:
```typescript
selector: 'app-root'
```
So Angular renders `AppComponent` here.

#### 4. AppComponent Lifecycle Flow
When `AppComponent` is created, Angular calls lifecycle in this order:

**1. Constructor() (Called First)**
Constructor is called first when component object is created.
**Used for:** Dependency Injection (inject service), basic initialization (not API call).

```typescript
constructor(private apiService: ApiService) {
  console.log("Constructor called");
}
```

> **Interview Point:** Don’t call API inside constructor. Call API inside `ngOnInit()`.

**2. ngOnChanges() (Only if @Input exists)**
Runs when parent passes data using `@Input()`.

**Example:**
```typescript
@Input() name: string;
```
If input changes, Angular calls:
```typescript
ngOnChanges() {
  console.log("Input changed");
}
```

**3. ngOnInit() (Called After Constructor)**
Called once after component initialization.
**Best place for:** API calls, initial data load, subscriptions.

```typescript
ngOnInit() {
  console.log("ngOnInit called");
  this.loadData();
}
```

**4. ngDoCheck() (Runs many times)**
Runs on every change detection. Used rarely.

**5. ngAfterViewInit() (After HTML loaded)**
Called once when view + child components are ready.
**Used for:** ViewChild, DOM access.

```typescript
ngAfterViewInit() {
  console.log("View loaded");
}
```

**6. ngOnDestroy() (When component removed)**
Called when component is destroyed.
**Used for:** unsubscribe, clear intervals/timers.

```typescript
ngOnDestroy() {
  console.log("Component destroyed");
}
```

### Final Execution Order (Interview Must)
**For AppComponent:**
1. `constructor()`
2. `ngOnChanges()` (if @Input)
3. `ngOnInit()`
4. `ngDoCheck()`
5. `ngAfterContentInit()`
6. `ngAfterContentChecked()`
7. `ngAfterViewInit()`
8. `ngAfterViewChecked()`
9. `ngOnDestroy()`





## 14. Latest Angular Version (as of Jan 2026)

The latest stable Angular version is Angular 21, released in November 2025.

### Quick Version Timeline (Major Releases)

| Version | Approx Release | Major Focus |
| :--- | :--- | :--- |
| Angular 13 | Nov 2021 | Ivy only, modern bundling & CLI upgrades |
| Angular 14 | Jun 2022 | Standalone components, typed forms |
| Angular 15 | Nov 2022 | Stable standalone APIs, directive composition |
| Angular 16 | May 2023 | Signals (reactivity), better SSR/Hydration |
| Angular 17 | Nov 2023 | New template control flow syntax, improved build tools |
| Angular 18 | May 2024 | Zoneless experimental change detection, SSR improvements |
| Angular 19 | Nov 2024 | Standalone by default, new resource APIs, HMR improved |
| Angular 20 | May 2025 | Continued zoneless & signals integration |
| Angular 21 | Nov 2025 | Signals forms, zoneless default, ARIA accessibility |

### Detailed Differences (Angular 13 → Angular 21)

#### Angular 13 (What You’re On Now)
*   **Complete Ivy adoption**: View Engine removed → faster build & smaller bundles.
*   **No IE11 support**: modern browser features only.
*   **Persistent build cache**: by default → faster CLI builds.
*   **Updated TypeScript 4.4 and RxJS 7.4 support**.
*   **Angular Package Format (APF) updated**: no legacy metadata.

> **Takeaway (for interview):** Angular 13 focused on performance, modern standards, and build system improvements.

#### Angular 14
*   **Standalone components introduced**: components, directives, and pipes can work without NgModules.
*   **Typed reactive forms**: stricter type safety in forms.

> **Interview point:** Angular 14 began simplifying architecture and making forms type-safe.

#### Angular 15
*   **Stable standalone APIs** (fully supported).
*   **Better directive composition** and cleaner modular patterns.

> **Interview:** You can build Angular apps without NgModules more confidently with Angular 15.

#### Angular 16
*   **Introduced Signals**: a reactive primitive (alternative to heavy RxJS).
*   **SSR hydration & improved CLI tooling**: with esbuild/Vite support.

> **Interview:** Signals bring modern reactivity similar to Solid/Vue, making change detection faster.

#### Angular 17
*   **New control-flow syntax**: in templates (e.g., `@if`, `@for`) for cleaner logic.
*   **Enhanced build performance** and developer experience.

> **Interview:** Angular’s template language became more expressive and easier to read.

#### Angular 18
*   **Experimental zoneless change detection** (no zone.js).
*   **Better SSR** (server-side rendering) and debugging support.

> **Interview:** Zoneless means Angular can stop wrapping every async event for better performance.

#### Angular 19
*   **Standalone default**: standalone components are default, encouraging modular apps.
*   **New `resource()` API**: to handle data more naturally.
*   **Hot Module Replacement (HMR)**: improvements.

> **Interview:** Angular continues to shift away from legacy NgModules and embraces modularity by default.

#### Angular 20
*   **Further improvements** around zoneless architecture and Signals.

> **Interview:** Angular keeps optimizing reactivity and performance.

#### Angular 21 (Latest Stable)
*   **Experimental Signal Forms**: reactive forms based on Signals (simpler & cleaner).
*   **Zoneless by default** for new projects → better change detection.
*   **Angular ARIA**: accessibility-focused package.
*   **Vitest integration by default**: replacing Karma for faster tests.
*   **New AI-friendly CLI tooling (MCP Server)**: integrates LLMs for smarter code assistance.

> **Interview:** Angular 21 moves toward modern reactivity (Signals), zoneless apps, accessibility first, and better developer tooling.

## 15. What is Standalone Component in Angular?

A Standalone Component is an Angular component that does not need to be declared inside any `NgModule` (`AppModule`, `FeatureModule` etc).

Instead, the component becomes self-contained and it directly manages its own dependencies like:
*   other components
*   directives (`ngIf`, `ngFor`)
*   pipes (`date`, `async`)
*   Angular Material modules
*   services (via providers)

### Why Standalone Component introduced?

Earlier (Angular 13 and before), every component had to be:
1.  Created
2.  Declared in module
3.  Dependencies imported in module
4.  Exported if needed

That created too much module boilerplate. So Angular introduced standalone to:
*   Reduce code
*   Make app simpler
*   Make lazy loading easier
*   Improve performance & build optimization
*   Make Angular more modern like React/Vue style

### Angular 13 vs Standalone (Difference)

**Angular 13 (Module Based):**
You must declare component in module:

```typescript
// app.module.ts
@NgModule({
  declarations: [HomeComponent],
  imports: [BrowserModule, CommonModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**Standalone Component (No Module Needed):**

```typescript
// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Home Works!</h2>
    <p *ngIf="isLoggedIn">Welcome</p>
  `
})
export class HomeComponent {
  isLoggedIn = true;
}
```

> Here `standalone: true` makes it standalone. `imports: [CommonModule]` is required for `*ngIf`, `*ngFor`.

### How Standalone Component Works?

Standalone component directly imports dependencies inside itself.

**Example: Using ngIf and ngFor**

```typescript
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>User List</h3>
    <ul>
      <li *ngFor="let user of users">{{user}}</li>
    </ul>
  `
})
export class UsersComponent {
  users = ['A', 'B', 'C'];
}
```

### Standalone Component Routing (Lazy Loading)

This is a very important interview topic.

**Old way (Module lazy loading):**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

**New Standalone lazy loading:**
```typescript
{
  path: 'admin',
  loadComponent: () =>
    import('./admin/admin.component').then(c => c.AdminComponent)
}
```

*   Much easier
*   Faster load
*   No module needed

### Bootstrapping App without AppModule

In new Angular versions you can start app without `AppModule`.

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);
```

### How to use Services in Standalone?

You can provide services in:

1.  **Root level (recommended):**
    ```typescript
    @Injectable({ providedIn: 'root' })
    export class UserService {}
    ```

2.  **Component level:**
    ```typescript
    @Component({
      standalone: true,
      providers: [UserService]
    })
    export class HomeComponent {}
    ```

### Standalone Component + Angular Material Example

```typescript
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [MatButtonModule],
  template: `<button mat-raised-button>Click</button>`
})
export class BtnComponent {}
```

### Key Benefits (Interview Points)
*   No NgModules required
*   Less boilerplate code
*   Better lazy loading
*   Easy to maintain large apps
*   Faster compilation & tree shaking
*   Dependencies are clear inside component itself
*   More modern architecture

## 16. What is a Signal in Angular?

A Signal is a special reactive variable that stores a value and notifies Angular automatically when the value changes. So UI updates happen automatically without manual change detection.

**Example:**
```typescript
import { signal } from '@angular/core';

count = signal(0);

increment() {
  this.count.set(this.count() + 1);
}
```

**In HTML:**
```html
<h1>{{ count() }}</h1>
<button (click)="increment()">+</button>
```

> **Important:** In template, signal value is accessed like a function: `count()`

### Why Angular Introduced Signals?

Earlier Angular had mainly:
*   `@Input()` + `@Output()`
*   RxJS Observables
*   Zone.js based change detection

**Problems:**
*   Too much RxJS for simple state
*   Hard to manage subscriptions
*   Performance issues in large apps

**Signals solve:**
*   Easy state handling
*   No subscriptions needed
*   Better performance
*   Works great with OnPush

### Types of Signals in Angular

**1) Writable Signal**

You can update it directly using `.set()` or `.update()`

```typescript
name = signal('Abhijit');

changeName() {
  this.name.set('Rahul');
}

// .update()
count.update(v => v + 1);
```

**2) Computed Signal**

Computed signal depends on other signals. It auto recalculates when dependency changes.

```typescript
import { computed, signal } from '@angular/core';

price = signal(100);
qty = signal(2);

total = computed(() => this.price() * this.qty());
```

**Template:**
```html
<p>Total: {{ total() }}</p>
```

> `computed` is read-only (you cannot set it).

**3) Effect**

Effect runs automatically whenever dependent signals change. Used for side effects like API call, logging, localStorage.

```typescript
import { effect, signal } from '@angular/core';

count = signal(0);

constructor() {
  effect(() => {
    console.log("Count changed:", this.count());
  });
}
```

> `effect()` should not be used for UI display directly. It’s for side operations.

## 17. What is @ViewChild in Angular?

`@ViewChild` is a decorator used to get a reference of an element / directive / component that is present inside the same component’s template (HTML).

It helps when you want to:
*   Access DOM element (input, div, etc.)
*   Call methods of a child component
*   Read template reference variable value
*   Access Angular directives like NgForm, MatPaginator, etc.

**Example: Access an input element using @ViewChild**

**HTML**
```html
<input #myInput type="text" />
<button (click)="focusInput()">Focus</button>
```

**TS**
```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  @ViewChild('myInput') myInput!: ElementRef;

  focusInput() {
    this.myInput.nativeElement.focus();
  }
}
```

**When @ViewChild value is available?**
In `ngAfterViewInit()` lifecycle hook (because view is initialized then).

```typescript
ngAfterViewInit() {
  console.log(this.myInput);
}
```

## 18. What is @ViewChildren in Angular?

`@ViewChildren` is used when you have multiple elements/components with same selector or template reference variable and you want all references as a list. It returns a `QueryList`.

**Example: Multiple inputs**

**HTML**
```html
<input #box type="text" value="One">
<input #box type="text" value="Two">
<input #box type="text" value="Three">

<button (click)="printAll()">Print</button>
```

**TS**
```typescript
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  @ViewChildren('box') boxes!: QueryList<ElementRef>;

  printAll() {
    this.boxes.forEach((b) => console.log(b.nativeElement.value));
  }
}
```

## 19. How to take reference using Template Variable in Angular?

Template reference variable is created using `#`.

**Example:**
```html
<input #username type="text">
<button (click)="print(username.value)">Print</button>
```

**TS:**
```typescript
print(val: string) {
  console.log(val);
}
```

So template variable is used to:
*   Get input value
*   Pass element reference to function
*   Connect with `@ViewChild` / `@ViewChildren`

## 20. What is a Decorator in Angular?

Decorator is a special TypeScript feature (metadata) used to tell Angular:
*   What a class is
*   What a property does
*   What a method does
*   How Angular should treat it

Angular uses decorators heavily.

**Common Angular Decorators:**
*   `@Component()`: Used to create a component
*   `@NgModule()`: Used to define a module
*   `@Injectable()`: Used to define service class for dependency injection
*   `@Input()`: Receive data from parent to child
*   `@Output()`: Send data from child to parent
*   `@ViewChild()` / `@ViewChildren()`: Get template reference
*   `@HostListener()`: Listen events like window scroll


## 21. What are Angular Directives?

Angular Directives are used to change the behavior or appearance of DOM elements in Angular.

Angular directives are mainly 3 types:

### 1) Component Directives (Component)

A Component is also a directive with its own:
*   HTML template
*   CSS
*   TS logic

**Example:**
```typescript
@Component({
  selector: 'app-header',
  template: `<h1>Header</h1>`
})
export class HeaderComponent {}
```

**Usage:**
```html
<app-header></app-header>
```

### 2) Structural Directives

Structural directives change the DOM structure.
Means they can add/remove elements from UI.

They are written using `*`

**Common Structural Directives**

**a) *ngIf**
Used to show/hide element based on condition

```html
<p *ngIf="isLoggedIn">Welcome</p>
```

**b) *ngFor**
Used to loop data

```html
<li *ngFor="let item of items">{{ item }}</li>
```

**c) *ngSwitch**
Used for multiple conditions

```html
<div [ngSwitch]="role">
  <p *ngSwitchCase="'admin'">Admin</p>
  <p *ngSwitchCase="'user'">User</p>
  <p *ngSwitchDefault>Guest</p>
</div>
```

> **Important point:** Structural directives work internally using `<ng-template>`.

### 3) Attribute Directives

Attribute directives change the style/behavior of an existing element.
They do NOT remove/add elements, only modify them.

**Common Attribute Directives**

**a) ngClass**
Add/remove CSS classes dynamically

```html
<p [ngClass]="{'active': isActive, 'inactive': !isActive}">
  Hello
</p>
```

**b) ngStyle**
Apply inline styles dynamically

```html
<p [ngStyle]="{'color': colorName, 'font-size.px': fontSize}">
  Styled Text
</p>
```

**c) ngModel (Forms)**
Two-way data binding

```html
<input [(ngModel)]="name">
<p>{{ name }}</p>
```

### Custom Directive in Angular (Interview Important)

**Example: Create a directive to highlight text**

**Command:**
```bash
ng generate directive highlight
```

**highlight.directive.ts**
```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

**Usage:**
```html
<p appHighlight>Hover me</p>
```

### Difference: Structural vs Attribute Directives (Interview)

| Structural Directives | Attribute Directives |
| :--- | :--- |
| Change DOM structure | Change element behavior/style |
| Add/remove elements | Do not remove/add element |
| Use `*` symbol | No `*` symbol |
| Examples: `*ngIf`, `*ngFor` | Examples: `ngClass`, `ngStyle` |


## 22. Parent to Child and Child to Parent data handling on click (2-way communication)

You said you have only 2 components: Parent and Child. So how to send data on click?

### Case A: Parent to Child using @Input()

**Parent HTML:**
```html
<app-child [userName]="name"></app-child>
<button (click)="changeName()">Change Name</button>
```

**Parent TS:**
```typescript
name = 'Abhijit';

changeName() {
  this.name = 'New Name';
}
```

**Child TS:**
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<h2>{{ userName }}</h2>`
})
export class ChildComponent {
  @Input() userName!: string;
}
```

### Case B: Child to Parent using @Output() and EventEmitter

**Child HTML:**
```html
<button (click)="sendData()">Send Data</button>
```

**Child TS:**
```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendData() {
    this.messageEvent.emit('Hello Parent, data from Child');
  }
}
```

**Parent HTML:**
```html
<app-child (messageEvent)="receiveData($event)"></app-child>
<p>{{ childMsg }}</p>
```

**Parent TS:**
```typescript
childMsg = '';

receiveData(msg: string) {
  this.childMsg = msg;
}
```

## 23. Angular Subject: Where to subscribe and emit

This is common interview question.

**You subscribe where you need value:**
In component that wants to receive updates (example: Parent or Child).

**You emit where event happens:**
On click, API response, input change etc.

## 24. Difference between Subject and BehaviorSubject

### Subject
*   It is both Observable + Observer.
*   You can `next()` to emit values.
*   Subscribers will receive values **only after subscription**.
*   It does **not** store old value.

**Example:**
```typescript
import { Subject } from 'rxjs';

const sub = new Subject<number>();

sub.subscribe(val => console.log('A:', val));

sub.next(1);
sub.next(2);

sub.subscribe(val => console.log('B:', val));

sub.next(3);
```

**Output:**
```
A: 1
A: 2
A: 3
B: 3
```
> Because B subscribed late, it missed 1 and 2.

### BehaviorSubject
*   It always requires an **initial value**.
*   It **stores latest value**.
*   New subscriber immediately gets **last emitted value**.

**Example:**
```typescript
import { BehaviorSubject } from 'rxjs';

const bs = new BehaviorSubject<number>(0);

bs.subscribe(val => console.log('A:', val));

bs.next(1);

bs.subscribe(val => console.log('B:', val));

bs.next(2);
```

**Output:**
```
A: 0
A: 1
B: 1
A: 2
B: 2
```

**Main Difference in one line:**
*   **Subject:** no initial value, no last value memory.
*   **BehaviorSubject:** has initial value, remembers latest value.

## 25. What is ReplaySubject?

`ReplaySubject` stores previous values and replays them to new subscribers. You can control how many values to store using buffer size.

**Example:**
```typescript
import { ReplaySubject } from 'rxjs';

const rs = new ReplaySubject<number>(2); // store last 2 values

rs.next(10);
rs.next(20);
rs.next(30);

rs.subscribe(val => console.log('New Subscriber:', val));
```

**Output:**
```
New Subscriber: 20
New Subscriber: 30
```

**So ReplaySubject is useful when:**
*   You want new subscribers to get past data also.
*   You want caching kind of behavior.

## 26. Parent-Child communication using Subject (service based)

Best approach when:
*   Components are not direct parent-child.
*   You want shared communication.

**Step 1: Create service**
```typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<string>();
  data$ = this.dataSubject.asObservable();

  sendData(msg: string) {
    this.dataSubject.next(msg);
  }
}
```

**Step 2: Emit from Child on click**
```typescript
import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-child',
  template: `<button (click)="send()">Send</button>`
})
export class ChildComponent {
  constructor(private dataService: DataService) {}

  send() {
    this.dataService.sendData('Hello from child using Subject');
  }
}
```

**Step 3: Subscribe in Parent**
```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-parent',
  template: `<p>{{ msg }}</p>`
})
export class ParentComponent implements OnInit {
  msg = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.data$.subscribe((res) => {
      this.msg = res;
    });
  }
}
```

## 27. Show Even/Odd on Button Click in Angular

**Requirement:**
*   On click show even numbers
*   On click show odd numbers

**Example Code:**

**HTML**
```html
<button (click)="showEven()">Show Even</button>
<button (click)="showOdd()">Show Odd</button>

<p>Result: {{ result.join(', ') }}</p>
```

**TS**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-even-odd',
  templateUrl: './even-odd.component.html'
})
export class EvenOddComponent {
  numbers = [1,2,3,4,5,6,7,8,9,10];
  result: number[] = [];

  showEven() {
    this.result = this.numbers.filter(n => n % 2 === 0);
  }

  showOdd() {
    this.result = this.numbers.filter(n => n % 2 !== 0);
  }
}
```

**Output:**
*   Show Even → 2, 4, 6, 8, 10
*   Show Odd → 1, 3, 5, 7, 9























## 28. Data must be loaded before the page opens. How will you achieve this?

If data must be loaded before the page opens, I will use Angular Route Resolver (Resolve Guard).
Resolver ensures API call completes before route activates, so the component loads with ready data and avoids blank UI.

### Best Approach: Route Resolver

**Step 1: Create Resolver**
```typescript
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService) {}

  resolve(): Observable<any> {
    return this.userService.getUsers();
  }
}
```

**Step 2: Use Resolver in Routing**
```typescript
{
  path: 'users',
  component: UsersComponent,
  resolve: { usersData: UserResolver }
}
```

**Step 3: Access Data in Component**
```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.users = this.route.snapshot.data['usersData'];
}
```

**Interview Line (Simple)**

I use Angular Resolver so route loads only after required API data is ready, ensuring better UX and no empty page flicker.

## 29. How does an Error Interceptor work internally?

**Answer:**

An Error Interceptor is an Angular HttpInterceptor that sits between the component/service and the HttpClient request pipeline.

**Internally what happens:**

1. Component calls http.get()
2. Request passes through all interceptors (request phase)
3. Then request goes to server
4. Response comes back through interceptors again (response phase)
5. Error interceptor catches errors using RxJS catchError()

**Example:**
```typescript
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // global handling
        if (error.status === 401) {
          // logout / redirect
        }
        return throwError(() => error);
      })
    );
  }
}
```

**Interview line:**

Error interceptor centralizes error handling for all API calls instead of repeating logic in every service.

## 30. An API call fails randomly. How will you handle retries and errors?

**Answer:**

If the API fails randomly due to network issue / timeout / 5xx, I use RxJS retry strategy with a limit + delay.

**Best practice:**

- Retry only for retryable errors:
  - 0 (network)
  - 500, 502, 503, 504

- Don't retry for:
  - 400 validation errors
  - 401 unauthorized (token issue)

**Example:**
```typescript
import { HttpClient } from '@angular/common/http';
import { retry, catchError, throwError, timer } from 'rxjs';

getData() {
  return this.http.get('/api/data').pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        // retry only for server/network errors
        if ([0, 500, 502, 503, 504].includes(error.status)) {
          return timer(retryCount * 1000); // 1s, 2s, 3s
        }
        return throwError(() => error);
      }
    }),
    catchError(err => {
      // show toast / fallback UI / log to monitoring
      return throwError(() => err);
    })
  );
}
```

**Interview line:**

I retry limited times with backoff for network/5xx, and for final failure I show proper message + log it.

## 31. You need to attach an authorization token to every API request. How will you do it?

**Answer:**

I use an Auth Interceptor to automatically attach the token in request headers.
This avoids adding headers manually in every API call.

**Example:**
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
```

**Register Interceptor:**
```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
```

**Interview line:**

Interceptors are best for token injection because its centralized and consistent across all APIs.



## 32. Why we need to cancel previous API calls?

In search/autocomplete scenarios, user types fast like:

a → an → ang → angu → angular

If we call API for every keystroke:

Multiple HTTP calls run in parallel

Old response may come late

UI may show wrong/outdated data

Extra load on backend

Possible memory leaks if subscriptions not handled properly

So we must cancel old request and keep only latest one.

* Best Solution: switchMap() (Auto-cancel old request)
* Example (Interview Standard Code)
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(value => this.http.get(`/api/search?q=${value}`))
).subscribe(result => {
  console.log(result);
});

### What switchMap() does internally?

When a new value comes, switchMap():
* unsubscribes from previous Observable
* cancels the previous HTTP request
* subscribes only to the latest one

So only latest request response will be used.

## 33. How do you handle CORS errors in an Angular application?

**Answer:**

CORS is not an Angular issue, it is a browser security restriction.
So it must be fixed on the backend server, not from frontend.

**What I do:**

**Fix on backend:**

- Allow origin: Access-Control-Allow-Origin
- Allow methods: GET, POST, PUT...
- Allow headers: Authorization, Content-Type
- Handle preflight OPTIONS

**For local development:**

Use Angular proxy config:

**proxy.conf.json**
```json
{
  "/api": {
    "target": "https://backend.com",
    "secure": false,
    "changeOrigin": true
  }
}
```

**Run:**
```bash
ng serve --proxy-config proxy.conf.json
```

**Interview line:**

CORS must be solved at backend; for dev we use Angular proxy to bypass browser restriction.

## 34. When should you implement custom HTTP interceptors?

**Answer:**

I implement interceptors when I need common behavior for all API calls.

**Common real-world use cases:**

- Attach auth token / refresh token
- Global error handling (401, 403, 500)
- Logging request/response time
- Show/hide global loader
- Add common headers (Content-Type, Accept)
- API caching for GET requests
- Modify request URL (base URL / versioning)

**Interview line:**

Interceptors are best for cross-cutting concerns like auth, error handling, loader, and logging.

## 35. You need dynamic form fields (add/remove). How will you implement this?

**Answer:**

For dynamic fields like add/remove rows, I use FormArray in Reactive Forms.
FormArray is designed for handling lists of controls/groups dynamically.

### Example: Add/Remove Fields using FormArray

**TS**

```typescript
import { FormBuilder, FormArray, Validators } from '@angular/forms';

constructor(private fb: FormBuilder) {}

form = this.fb.group({
  skills: this.fb.array([])
});

get skills(): FormArray {
  return this.form.get('skills') as FormArray;
}

addSkill() {
  this.skills.push(this.fb.control('', Validators.required));
}

removeSkill(index: number) {
  this.skills.removeAt(index);
}
```

**HTML**

```html
<form [formGroup]="form">
  <div formArrayName="skills">
    <div *ngFor="let skill of skills.controls; let i=index">
      <input [formControlName]="i" placeholder="Enter skill" />
      <button type="button" (click)="removeSkill(i)">Remove</button>
    </div>
  </div>

  <button type="button" (click)="addSkill()">Add Skill</button>
</form>
```

### This is used in real projects for:

- Add multiple phone numbers
- Add multiple addresses
- Add products in invoice
- Add education/experience blocks

**Interview line:**

For add/remove fields I use FormArray because it supports dynamic controls and validations cleanly.

## 36. How do you apply custom validation across multiple form controls?

**Answer:**

For validation across multiple controls (example: password & confirm password, date range, min/max) I use a custom validator at FormGroup level.

### Example: Password Match Validator (Group Validation)

**TS**

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;

  return password === confirmPassword ? null : { passwordMismatch: true };
}
```

**Apply validator to FormGroup**
```typescript
form = this.fb.group({
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required]
}, { validators: passwordMatchValidator });
```

**HTML Error**
```html
<div *ngIf="form.errors?.['passwordMismatch']">
  Password and Confirm Password must match
</div>
```

**Interview line:**

For cross-field validation I use group-level custom validators, because single control validators can't compare values.

## 37. How will you show validation errors only after form submission?

**Answer:**

I usually control this using a submitted flag.
Errors should display only when:
- user clicked submit OR
- field is touched/dirty (optional)

### Best Practice Approach

**TS**

```typescript
submitted = false;

onSubmit() {
  this.submitted = true;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  // API call here
}
```

**HTML (Show error only after submit)**
```html
<input formControlName="email" placeholder="Email" />

<div *ngIf="submitted && form.get('email')?.invalid">
  <small *ngIf="form.get('email')?.errors?.['required']">Email is required</small>
  <small *ngIf="form.get('email')?.errors?.['email']">Enter valid email</small>
</div>
```

**Interview line:**

I use a submitted flag + markAllAsTouched() so user sees validation messages only after clicking submit.

## 38. You have multiple API calls that depend on each other. How will you handle them?

**Answer:**

If API calls are dependent (2nd call needs output of 1st), I use switchMap / concatMap so the next API runs only after previous succeeds.

### Example (Dependent Calls)

Scenario: Get user → then get user orders

```typescript
this.userService.getUserById(id).pipe(
  switchMap(user => this.orderService.getOrdersByUserId(user.id))
).subscribe({
  next: orders => console.log(orders),
  error: err => console.log(err)
});
```

**When I use which:**

- switchMap → latest request matters (ex: route change)
- concatMap → must maintain order (ex: step-by-step operations)

**If APIs are independent (run parallel):**

Use forkJoin

```typescript
forkJoin({
  profile: this.userService.getProfile(),
  dashboard: this.dashboardService.getData()
}).subscribe(res => {
  console.log(res.profile, res.dashboard);
});
```

**Interview line:**

For dependent calls I use switchMap/concatMap, for parallel calls I use forkJoin.

## 39. You want to avoid multiple API calls on every keystroke. What will you use?

**Answer:**

For search inputs, I use:
- debounceTime() → wait user to stop typing
- distinctUntilChanged() → ignore same value
- switchMap() → cancel previous request

### Example (Best Search Pattern)
```typescript
this.searchControl.valueChanges.pipe(
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(value => this.api.search(value))
).subscribe(results => {
  this.data = results;
});
```

**Interview line:**

I use debounceTime + distinctUntilChanged + switchMap to prevent unnecessary API calls and cancel old requests.

## 40. What is the difference between switchMap and mergeMap in a real scenario?

**Answer (Real world):**

### switchMap (Cancels previous request)

Used when only latest response matters
- Example: Search suggestions, typeahead, route changes

```typescript
valueChanges.pipe(
  switchMap(text => this.api.search(text))
)
```

If user types quickly, old API calls get cancelled and only latest is processed.

### mergeMap (Runs all requests in parallel)

Used when you want all requests to complete
- Example: Upload multiple files, call API for each item

```typescript
from(files).pipe(
  mergeMap(file => this.api.upload(file))
)
```

It will not cancel previous calls, all run concurrently.

**Simple Interview Summary:**

- switchMap → latest wins, cancels previous
- mergeMap → all run, no cancellation, parallel

## 41. What will you do if an observable throws an error?

**Answer:**

If an observable throws error, it stops the stream unless we handle it.
So I use catchError() to handle errors properly.

### Common ways I handle it:

**1. Handle error and show message**
```typescript
this.api.getData().pipe(
  catchError(err => {
    this.toast.error("Something went wrong");
    return throwError(() => err);
  })
).subscribe();
```

**2. Return fallback value (so UI doesn't break)**
```typescript
this.api.getData().pipe(
  catchError(err => of([])) // fallback empty array
).subscribe(data => {
  this.list = data;
});
```

**3. Retry if temporary failure**
```typescript
this.api.getData().pipe(
  retry(2),
  catchError(err => of(null))
).subscribe();
```

**Interview line:**

I handle observable errors using catchError, sometimes retry for temporary failures, or return fallback values to keep UI stable.

## 42. When would a service be enough instead of NgRx?

**Answer:**

A normal Angular Service + RxJS (BehaviorSubject/ReplaySubject) is enough when the app state is small/medium, and you don't need heavy store features.

### Service is enough when:

- State is simple (ex: user profile, theme, selected tab)
- Few components need the data
- No complex side effects
- No requirement for time-travel debugging
- Team wants fast development and less boilerplate

**Example:**

- Logged-in user info
- Cart count badge
- Filter selection
- UI state (sidebar open/close)

**Interview line:**

If state is limited and doesn't need actions/reducers/effects, I prefer service + RxJS because it's simpler and faster to maintain.

## 43. How will you maintain application state after page refresh?

**Answer:**

On refresh, memory state (service/NgRx store) resets.
So I persist important state using storage and rehydrate it when app loads.

### Common ways:

**1. LocalStorage / SessionStorage**

Store token, user info, settings, small data

```typescript
localStorage.setItem('user', JSON.stringify(user));
```

On app init:

```typescript
const user = JSON.parse(localStorage.getItem('user') || '{}');
```

**2. NgRx Store Persistence**

Use libraries like:

- ngrx-store-localstorage (persist store slices)

**3. Backend as source of truth**

After refresh:

- token from storage
- call API /me to get user + permissions again

**Interview line:**

I persist required state in localStorage/sessionStorage and restore it on app init. For secure/critical state I re-fetch from backend.

## 44. How do you share state between lazy-loaded modules?

**Answer:**

To share state between lazy-loaded modules, I keep the state in a singleton service provided at root, or use NgRx store at app level.

### Best way: Shared Service in root
```typescript
@Injectable({ providedIn: 'root' })
export class AppStateService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
```

Now any lazy module component can subscribe to data$.

**Important Note:**

- Don't provide the same service inside lazy module providers because it creates multiple instances, and state won't be shared.

**If app is big:**

- Use NgRx Store globally (AppModule/root) Lazy modules can just select from store.

**Interview line:**

To share state across lazy-loaded modules I use root-level singleton service or NgRx store. I avoid providing the service inside lazy modules to prevent multiple instances.

## 45. How will you prevent XSS attacks in Angular?

**Answer:**

XSS happens when attacker injects malicious script into UI (example: `<script>alert()</script>`).
In Angular, I prevent XSS by:

- Never using [innerHTML] with untrusted content
- Use Angular data binding like {{value}} because Angular auto-escapes it
- Validate + sanitize user input on backend also
- Avoid directly manipulating DOM (document.getElementById, element.innerHTML)
- Use Content Security Policy (CSP) in production
- If HTML must be shown, sanitize it properly

**Interview line:**

Angular interpolation is safe by default, but risky areas are innerHTML and bypassing sanitization.

## 46. Where will you store JWT tokens securely?

**Answer:**

Best secure approach is storing JWT in HttpOnly Secure cookies, because JavaScript cannot access them → reduces XSS token theft.

**Options:**

### HttpOnly Cookie (Most secure)

- Not accessible from JS
- Works well with backend session style

### localStorage / sessionStorage (Less secure)

- Easy to implement
- But if XSS happens, token can be stolen

**My real-world approach:**

- If app is security-sensitive → HttpOnly cookie
- If only frontend handles auth → store in memory + refresh token strategy

**Interview line:**

Most secure storage is HttpOnly cookie; localStorage is simpler but vulnerable to XSS.

## 47. How do you protect routes from unauthorized access?

**Answer:**

I protect routes using Route Guards (CanActivate, CanMatch) and check auth state/token.

**Example (Auth Guard)**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
```

**Apply in routes**
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

**Interview line:**

I use guards to block unauthorized routes and redirect to login.

## 48. How does Angular provide security against XSS attacks?

**Answer:**

Angular provides XSS protection mainly through automatic sanitization + escaping.

**Angular protects by:**

- Escapes values in interpolation: `{{ userInput }}` - It converts unsafe characters into safe text.

- Sanitizes dangerous values for:
  - [innerHTML]
  - URLs
  - styles
  - resource URLs

**Interview line:**

Angular automatically sanitizes HTML, URLs, and styles, so script injection doesn't execute easily.

## 49. Explain CSRF protection in Angular.

**Answer:**

CSRF happens when attacker tricks a logged-in user's browser to send requests to a trusted site (cookies auto attached).

**Angular CSRF Protection:**

Angular supports XSRF token mechanism:

1. Backend sends an XSRF token cookie
2. Angular reads it and sends it in a header (example: X-XSRF-TOKEN)
3. Backend verifies header token matches cookie token

Angular does this automatically with HttpClient if cookie name matches defaults.

**Interview line:**

CSRF is mainly for cookie-based auth; Angular sends XSRF token header automatically when configured.

## 50. When would you use DomSanitizer and why should it be used cautiously?

**Answer:**

I use DomSanitizer only when I must render trusted HTML or trusted URLs, like:

- rendering HTML from CMS
- embedding safe iframe URLs
- showing formatted rich text

**Why cautious?**

Because methods like:
- `bypassSecurityTrustHtml()`
- `bypassSecurityTrustResourceUrl()`

Tell Angular: trust this content. So if input is not trusted, it can cause XSS.

**Interview line:**

DomSanitizer bypass methods can open security holes, so I use them only for trusted backend-generated content.

## 51. What's the difference between storing tokens in localStorage vs HttpOnly cookies?

### localStorage

**Pros:**
- Easy to implement
- Token accessible anywhere in app

**Cons:**
- Vulnerable to XSS (JS can read it)
- Manual attach token in headers

### HttpOnly Cookies

**Pros:**
- Not accessible by JS → safer against XSS
- Automatically sent with requests

**Cons:**
- Need CSRF protection (because cookies auto attach)
- Backend setup required (SameSite, Secure, HttpOnly)

**Interview conclusion line:**

localStorage is simpler but XSS-prone; HttpOnly cookies are more secure but need CSRF handling.

## 52. How will you implement global error handling?

**Answer:**

In Angular, for global runtime error handling (UI errors, JS exceptions, template errors), I implement a GlobalErrorHandler using Angular's built-in ErrorHandler.

### Steps:

1. Create custom error handler
2. Register it in providers
3. Show user-friendly message + log to server

**Example:**
```typescript
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const http = this.injector.get(HttpClient);

    console.error('Global Error:', error);

    // log to server
    http.post('/api/log-error', {
      message: error?.message || error.toString(),
      stack: error?.stack || null
    }).subscribe();

    // optional: show toast
    // this.injector.get(ToastrService).error('Something went wrong');
  }
}
```

**Register it:**
```typescript
providers: [
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
]
```

**Interview line:**

I use Angular ErrorHandler for runtime errors and interceptors for API errors.

## 53. How do you log frontend errors to a server?

**Answer:**

I log errors using:
- GlobalErrorHandler for runtime errors
- HttpInterceptor for API errors

Then send logs to backend with details like:

- error message
- stack trace
- URL
- user info (if allowed)
- browser/device

**Example payload:**
```typescript
http.post('/api/log-error', {
  message,
  stack,
  route: window.location.href,
  time: new Date()
});
```

**In real projects I use tools:**

- Sentry
- Datadog RUM
- New Relic
- Firebase Crashlytics / Performance

**Interview line:**

I send structured logs to server or use Sentry for production error tracking.

## 54. What's the difference between handling runtime errors vs API errors?

### Runtime Errors

Happen in frontend code:

- undefined access
- template binding errors
- JS exceptions
- component crashes

**Handled using:**
- ErrorHandler
- try/catch (rare)
- error boundary-like patterns

### API Errors

Happen during HTTP calls:

- 401, 403, 404, 500
- timeout / network failure

**Handled using:**
- HttpInterceptor
- catchError() in service
- retry logic

**Interview line:**

Runtime errors are app code issues handled by ErrorHandler; API errors are server/network issues handled by interceptors + RxJS.

## 55. How do you debug a specific Angular component?

**Answer:**

I debug a component by checking:

- Inputs data coming correctly or not
- Lifecycle hooks (ngOnInit, ngOnChanges)
- Template bindings
- API subscription
- Change detection issues
- Console + breakpoints

**What I do:**

- Put console.log() in:
  - ngOnInit()
  - ngOnChanges()
  - subscribe callback

- Use Chrome DevTools:
  - Sources → breakpoints
  - Network → API response
  - Console → errors

**Interview line:**

I debug component by verifying inputs, lifecycle, API response, and template binding step-by-step.

## 56. What tools do you use for debugging (Chrome DevTools, Angular DevTools)?

**Answer:**

### Chrome DevTools

- Console → errors/logs
- Network → API calls + headers + response
- Sources → breakpoints, step-through
- Performance → slow rendering / long tasks
- Application → localStorage/session/cookies

### Angular DevTools

- Inspect component tree
- Check @Input values
- Detect change detection runs
- View router state (helpful)
- Debug performance of components

**Interview line:**

Chrome DevTools for network/runtime debugging, Angular DevTools for component tree + change detection debugging.

## 57. How would you debug a component that's not rendering data correctly?

**Answer (Practical steps):**

If UI is not showing data, I debug in this order:

**Step 1: Check API response**

- Open Network tab
- Verify response is correct and not empty
- Check status code (200/401/500)

**Step 2: Check subscription is running**
```typescript
this.api.getData().subscribe(res => {
  console.log("API Data:", res);
  this.data = res;
});
```

**Step 3: Check template binding**

Example: if data is object but used as array in HTML → it won't render.

**Step 4: Check async issues**

If data comes async, use safe navigation:

```html
{{ user?.name }}
```

**Step 5: Check OnPush change detection**

If component uses OnPush and data mutated, UI won't update.

Fix by:
- updating reference (immutable) `this.data = [...this.data];`
- or `ChangeDetectorRef.markForCheck()`

**Step 6: Check *ngIf conditions**

Sometimes UI hidden due to wrong condition:

```html
<div *ngIf="data?.length > 0">...</div>
```

**Step 7: Check errors in console**

Many times one template error stops rendering.

**Interview line:**

I check API → subscription → binding → OnPush/change detection → ngIf → console errors. This gives quick root cause.

## 58. How do you plan and execute an Angular migration across major versions?

**Answer (Interview Style):**

When migrating Angular across major versions, I follow a step-by-step upgrade plan to avoid breaking the application.

### My migration plan:

**1. Check current state**

- Angular version, Node version, TypeScript version
- Check dependencies + third-party libraries

**2. Read official Angular update guide**

- Use Angular Update Guide for recommended path

**3. Upgrade gradually (major version by major version)**

Example: 9 → 10 → 11 → 12 → 13
This reduces risk instead of jumping directly.

**4. Run Angular CLI update**

```bash
ng update @angular/core @angular/cli
```

**5. Fix build issues**

- TypeScript errors
- RxJS changes
- Deprecations

**6. Run unit + e2e tests**

```bash
ng test
ng e2e
```

**7. Manual regression testing**

- Login flows
- Critical pages
- Forms + payments

**8. Deploy to staging first**

- Monitor errors/logs
- Then release to production

**Interview line:**

I upgrade version-by-version, validate dependencies, run tests, and do staging rollout to ensure smooth migration.

## 59. What are the key breaking changes from Angular 9 to Angular 13?

**Answer (High-level but interview relevant):**

Angular 9 to 13 includes multiple major updates mainly around Ivy, TypeScript, and Node support.

### Key breaking changes (common ones):

**1. Ivy becomes default (Angular 9)**

- Better build + faster compilation
- Some libraries not compatible initially

**2. TypeScript version upgrades**

- Angular 9 uses older TS, Angular 13 requires newer TS
- So many TS strict errors may appear after upgrade.

**3. Node.js version requirements changed**

- Angular 13 requires newer Node version
- Old Node versions stop working.

**4. View Engine support removed (Angular 13)**

- Angular 13 fully relies on Ivy
- Any old libraries built only for View Engine will break

**5. RxJS / build changes**

- RxJS updates may affect imports/operators usage
- Build pipeline became faster and stricter

**Interview line:**

Major changes from 9 to 13 are Ivy adoption, removal of View Engine, TypeScript/Node upgrades, and stricter builds.

## 60. How do you handle third-party library incompatibilities during migration?

**Answer:**

This is a very common issue. My approach:

### Steps I follow:

- Check library compatibility (verify library supports the new Angular version)
- Upgrade the library version: `npm i library-name@latest`
- Replace unsupported libraries if not maintained, use better alternatives
  - Example: old UI libs → Angular Material / PrimeNG
  - Example: old chart libs → ngx-charts / chart.js wrapper
- Temporary workaround if library breaks build but needed urgently:
  - Use compatible older Angular version temporarily
  - Plan replacement in next sprint
- Use ngcc (older migrations) - In older versions Angular compatibility compiler helped, but in Angular 13+ Ivy is default.

**Interview line:**

I handle incompatible libraries by upgrading them first; if not supported, I replace them with maintained alternatives.

## 61. What's your testing strategy after a major Angular upgrade?

**Answer:**

After upgrade, I follow a layered testing strategy:

### Testing strategy:

- **Unit Testing (Jasmine/Karma / Jest)**
  - Components, services, pipes
  - `ng test`

- **Integration testing**
  - Feature flows: login, search, forms, dashboard

- **E2E testing (Cypress / Protractor older apps)**
  - Full UI journey tests
  - `ng e2e`

- **Manual QA regression**
  - Most critical user flows

- **Cross-browser testing**

- **Performance testing**
  - Lighthouse score check
  - Large list screens, lazy loaded modules

**Interview line:**

I run unit + e2e tests, do regression testing on critical flows, and verify performance after upgrade.

## 62. How do you ensure no regressions were introduced?

**Answer:**

To ensure no regressions:

### Steps I do:

- Run complete automated test suite (Unit + e2e)
- Compare key screens before & after
- UI snapshot comparison (if available)
- Verify core features
- Monitor runtime errors (Use tools like Sentry in staging/production)
- Check bundle size + performance (Ensure upgrade didn't increase load time)
- Feature flag / phased rollout:
  - Deploy to staging → UAT → production
  - Release in small batches if possible
- Code review + checklist:
  - Make sure no deprecated code remains
  - Validate all interceptors/guards working

**Interview line:**

I ensure no regressions using automated tests, staging validation, monitoring tools, and performance checks.

## 63. How do you identify performance bottlenecks in Angular applications? What tools did you use to identify the performance score?

**Answer (Interview Style):**

First I try to understand where the slowness is happening → is it initial load, API delay, change detection, rendering large DOM, or bundle size.
Then I measure it using browser + Angular tools and optimize step by step.

### Tools I use:

**Chrome DevTools**
- Performance tab → find long tasks, scripting time, rendering time, layout shifts
- Network tab → API time, payload size, waterfall
- Lighthouse → performance score + suggestions

**Angular DevTools**
- Check change detection cycles
- Detect components re-rendering unnecessarily

**Web Vitals / Real metrics**
- LCP, CLS, INP (user experience)
- Sometimes use Google PageSpeed Insights

### How I identify bottleneck:

- If main thread busy → too much JS / change detection
- If DOM huge → list rendering issue
- If bundle heavy → build optimization + lazy load
- If API slow → caching / pagination / debounce

## 64. How does OnPush change detection impact parent and child components?

**Answer:**

OnPush makes Angular run change detection only when required, instead of checking every time.

### Default Strategy:

Angular checks component when:
- any event happens
- async tasks
- timer / promise
- input changes
- basically many triggers

### OnPush Strategy:

Angular checks component only when:
- @Input reference changes (new object/array reference)
- event happens inside component
- async pipe emits
- manually triggered using markForCheck() or detectChanges()

### Parent → Child impact:

If parent updates an object like this (mutating):
```typescript
this.user.name = "new";
```
Child will NOT update with OnPush.

But if parent replaces object reference:
```typescript
this.user = { ...this.user, name: "new" };
```
Child will update.

**Interview line:**

OnPush works best with immutable data patterns and improves performance by reducing unnecessary checks.

## 65. What tools do you use to measure real-world web performance?

**Answer:**

For real-world performance, I prefer field data + user-based metrics, not only Lighthouse.

### Tools:

- Chrome User Experience Report (CrUX)
- Google PageSpeed Insights (lab + real users data)
- Web Vitals (LCP, CLS, INP, FCP, TTFB)
- Firebase Performance Monitoring (if project uses Firebase)
- Sentry Performance / New Relic / Datadog (in production monitoring)
- Lighthouse (good for lab testing)

**Interview line:**

Lighthouse is good for testing, but for actual users I trust Web Vitals + monitoring tools.

## 66. An Angular page is very slow when rendering a large list. How will you optimize it?

**Answer:**

If a large list is slow, the main problem is usually too many DOM elements + change detection cost.

### My optimization steps:

**1. Use Virtual Scroll (Best Solution)**

Instead of rendering 5000 rows, render only visible rows.

```html
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items">{{item.name}}</div>
</cdk-virtual-scroll-viewport>
```

**2. Use trackBy in *ngFor**

Prevents DOM recreation.

```html
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

```typescript
trackById(index: number, item: any) {
  return item.id;
}
```

**3. Use OnPush**

For list item components:

```typescript
changeDetection: ChangeDetectionStrategy.OnPush
```

**4. Pagination / Infinite scroll**

Load data in chunks (50/100 at a time)

**5. Reduce heavy template logic**

Avoid calling functions directly inside HTML:
```html
{{ getName(item) }}
```
Instead compute once in TS.

**6. Use pure pipes / memoization**

For repeated calculations

**7. Optimize images and UI**

- Lazy load images
- Reduce DOM nesting

**Interview line:**

My first choice is Virtual Scroll + trackBy + OnPush, it gives immediate performance boost.

## 67. When would you use ChangeDetectionStrategy.OnPush?

**Answer:**

I use OnPush when:
- component is presentational / reusable UI component
- data comes from @Input / Observables
- we follow immutable updates
- performance is important (large lists, dashboards)

### Example:

- table rows component
- cards list
- reusable button/form components
- heavy UI screens

**Interview line:**

OnPush is perfect when data changes are predictable and we want to avoid extra change detection cycles.

## 68. How does trackBy improve performance in *ngFor?

**Answer:**

Without trackBy, Angular uses object reference and index, so when list changes it may destroy and recreate DOM nodes, even if items are same.

With trackBy, Angular identifies items uniquely using id, so it:
- updates only changed items
- keeps existing DOM nodes
- reduces re-rendering and improves speed

### Example:

```typescript
trackById(index: number, item: any) {
  return item.id;
}
```

**Interview line:**

trackBy is very useful in lists where data updates frequently (like live data, search, filter).

## 69. How do you reduce Angular bundle size?

**Answer:**

To reduce bundle size, I focus on removing unused code and splitting bundles.

### Best ways:

**1. Lazy loading modules/routes**

Load features only when needed.

```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

**2. Build in production mode**
```bash
ng build --configuration production
```

**3. Remove unused libraries**

Example: avoid importing full lodash
```typescript
import debounce from 'lodash/debounce';
```

**4. Use Angular standalone components (modern apps)**

Reduces module overhead.

**5. Tree-shaking + ESBuild (Angular 16+)**

Angular automatically does this well, but ensure dependencies support it.

**6. Optimize images/fonts**

- use compressed images
- limit font weights
- use modern formats (webp)

**7. Use source-map only for debugging**

Disable in production builds.

**8. Analyze bundle**

Use:
```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/**/stats.json
```

**Interview line:**

Biggest improvements usually come from lazy loading + removing heavy libraries + optimizing assets.

