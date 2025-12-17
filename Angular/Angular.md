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
