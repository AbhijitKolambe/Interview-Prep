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

### Interview one-liner

`app.config.ts` replaces AppModule configuration in standalone Angular apps by defining global providers at bootstrap time.

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

### Interview one-liner

Lazy loading in Angular delays loading of features until navigation occurs, reducing initial bundle size and improving app performance.

## How lazy loading works with standalone components?

Lazy loading with standalone components in Angular works by loading the component only when its route is accessed, without using NgModules. The Angular Router dynamically imports the component file at runtime, which reduces the initial bundle size and improves application performance.

### Example

```typescript
{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard.component')
      .then(c => c.DashboardComponent)
}
```

### Interview one-liner

In standalone architecture, lazy loading is done using `loadComponent`, which loads the component on demand without NgModules.
## What is dependency injection?

Dependency Injection (DI) is a design pattern used in Angular where a class does not create its own dependencies, but instead receives them from an external source (the injector). This makes the code loosely coupled, easier to test, and more maintainable.

In Angular, services or dependencies are typically registered with the injector using @Injectable() or provider configurations. When a component or another service needs that dependency, Angular automatically injects the required instance through the constructor.

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
 **Interview key point:**
Dependency Injection allows Angular to manage and supply dependencies automatically instead of components creating them manually, leading to cleaner and more testable code.

## What does @Injectable({ providedIn: 'root' }) mean?
@Injectable({ providedIn: 'root' }) tells Angular to register the service with the root injector, making it available across the entire application as a singleton.

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

 **Interview one-liner:**
providedIn: 'root' makes a service globally available as a singleton throughout the Angular application.

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


Interview one-liner:
Services in Angular are used to share data and business logic across components using dependency injection.

## Why use services?
Services are used in Angular to separate business logic from UI logic. They help keep components clean, reusable, and easy to maintain by handling tasks like API calls, data sharing, and common utilities in one central place.

Why they are important:

- Avoids code duplication
- Enables data sharing between components
- Improves testability (easy to mock services)
- Follows separation of concerns

 **Interview one-liner:**
Services are used to centralize business logic and share data across components, making Angular applications cleaner and more maintainable.
