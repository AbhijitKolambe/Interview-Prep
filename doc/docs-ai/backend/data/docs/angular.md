# Angular Guide

## Angular Performance
To improve Angular performance, use the OnPush change detection strategy. It minimizes the number of checks Angular has to perform by only running change detection when input references change or events occur.

## Angular Signals
Signals provide a new way to handle state in Angular 16+ applications. They offer fine-grained reactivity, making apps significantly faster by avoiding unnecessary re-renders across the component tree.

## Dependency Injection
Angular's Dependency Injection (DI) system allows you to decouple components and services, making your application more modular and easier to test. Use the `@Injectable({ providedIn: 'root' })` decorator for singleton services.
