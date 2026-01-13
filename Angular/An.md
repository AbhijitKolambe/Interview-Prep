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