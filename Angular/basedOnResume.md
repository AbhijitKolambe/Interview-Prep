# 1. Angular Architecture & Design

### Q1. How do you design scalable Angular architecture for enterprise applications?

**Answer (Senior-level):**
I follow a feature-based modular architecture instead of a layer-based one. Each feature owns its components, services, routing, and state. Shared logic goes into Core and Shared modules.

**Key principles I follow:**
- Feature modules + lazy loading
- Smart vs dumb components
- Single-responsibility services
- Strict linting + coding standards
- SOLID principles in UI code

**Example Structure:**
```text
src/
 ├── app/
 │   ├── core/
 │   │   ├── services/
 │   │   ├── guards/
 │   │   └── interceptors/
 │   ├── shared/
 │   │   ├── components/
 │   │   ├── pipes/
 │   │   └── directives/
 │   ├── features/
 │   │   ├── dashboard/
 │   │   ├── reports/
 │   │   └── governance/
```

### Q2. Why do you prefer feature-based modules over shared mega-modules?

**Answer:**
Shared mega-modules cause:
- Large bundle sizes
- Tight coupling
- Accidental dependency leaks

Feature-based modules:
- Enable lazy loading
- Improve maintainability
- Reduce cognitive load
- Scale better with teams

# 2. Performance Optimization (Strongly matches your resume)

### Q3. How did you improve Angular application performance in your projects?

**Answer:**
I improved performance using:
- Lazy-loaded feature modules
- Route-level code splitting
- OnPush change detection
- TrackBy in *ngFor
- Optimized RxJS subscriptions
- API payload reduction

**Example – Lazy Loading Route:**
```typescript
const routes: Routes = [
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/reports.module')
        .then(m => m.ReportsModule)
  }
];
```

### Q4. Explain OnPush change detection and when you use it.

**Answer:**
OnPush tells Angular to run change detection only when:
- @Input reference changes
- Observable emits new value
- Event occurs in component

Used for:
- Large lists
- Dashboard widgets
- Reusable UI components

**Example:**
```typescript
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() data!: CardData;
}
```

# 3. RxJS & State Management

### Q5. How do you handle subscriptions to avoid memory leaks?

**Answer:**
I use:
- async pipe (preferred)
- takeUntil with destroy subject
- Subscription cleanup as fallback

**Best Practice Example:**
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data$
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Q6. When do you choose NgRx vs service-based state?

**Answer:**
I use NgRx only when needed, such as:
- Shared state across many modules
- Complex business workflows
- Undo/redo
- Time-travel debugging

For simple flows → service + BehaviorSubject.

# 4. Routing, Guards & Security

### Q7. How do route guards improve security?

**Answer:**
Route guards prevent unauthorized navigation before component loads, reducing:
- UI flicker
- Unauthorized API calls
- Security leaks

**Auth Guard Example:**
```typescript
canActivate(): boolean {
  return this.authService.isLoggedIn();
}
```

### Q8. Difference between CanActivate and CanDeactivate?

**Answer:**
- **CanActivate** → restricts route access
- **CanDeactivate** → prevents accidental navigation loss (forms)

# 5. Angular Material & UI Engineering

### Q9. How do you customize Angular Material without breaking design consistency?

**Answer:**
I use:
- Global theme SCSS
- CSS variables
- Custom wrapper components
- Avoid direct DOM overrides

**Theme Example:**
```scss
$primary: mat.define-palette(mat.$indigo-palette);
$theme: mat.define-light-theme($primary);

@include mat.all-component-themes($theme);
```

### Q10. How do you ensure UI consistency across large teams?

**Answer:**
- Shared component library
- Design tokens
- Storybook (if allowed)
- Strict ESLint + Prettier
- PR reviews with UI checklist

# 6. Code Quality & Tooling (Matches your R&D work)

### Q11. Why did you introduce Husky and Git hooks?

**Answer:**
To prevent bad code from entering the repository by enforcing:
- Linting
- Formatting
- Commit message rules

**Example:**
```bash
npx husky add .husky/pre-commit "npm run lint"
```

### Q12. How do ESLint and SonarQube help in frontend?

**Answer:**
They catch:
- Unused variables
- Memory leaks
- Complexity issues
- Security vulnerabilities
- Duplicate logic

# 7. Senior-Level Behavioral + Ownership Questions

### Q13. How do you mentor junior developers?

**Answer:**
- Code reviews with explanations
- Pair programming
- Architecture walkthroughs
- Enforcing standards, not opinions
- Gradual responsibility increase

### Q14. How do you handle disagreements in UI decisions?

**Answer:**
I rely on:
- UX principles
- Performance metrics
- Maintainability
- Data, not preference

# 8. Practical Coding Task (Very Likely)

**Task:** Build a reusable table component with OnPush & trackBy

```typescript
@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() rows: any[] = [];

  trackById(index: number, item: any) {
    return item.id;
  }
}
```


## Part 1: Architecture & Reusability

**Context:** Your resume mentions "developing custom reusable Angular components, shared modules" and "standardizing frontend architecture".

### Q1: The "Smart" vs. "Dumb" Component Pattern

**Question:** You have experience building shared component libraries. How do you decide when to make a component "smart" (container) versus "dumb" (presentational)? If you were designing a complex Data Grid for the corporate governance platform you worked on, how would you structure it to be reusable across the entire enterprise application?

**Sample Answer:**

**Concept:** "Dumb" components should rely solely on `@Input()` for data and `@Output()` for communication. They should have no dependencies on services or state management (NgRx). "Smart" components connect to the state/services and pass data down.

For the Data Grid: I would create a Generic presentation component that accepts `<T>` (any data type) and a configuration object for columns. It would not fetch data itself but emit events like `(onSort)` or `(onPageChange)`.

**Practical Code (Generic Component):**

```typescript
// generic-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let col of columns" (click)="sort(col.key)">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let col of columns">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class GenericTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: { key: keyof T; label: string }[] = [];
  @Output() sortChanged = new EventEmitter<keyof T>();

  sort(key: keyof T) {
    this.sortChanged.emit(key);
  }
}
```

## Part 2: Performance Optimization

**Context:** You specifically mentioned "implementing Angular lazy loading, on-demand modules... resulting in reduced initial load time".

### Q2: Advanced Lazy Loading & Preloading

**Question:** You used lazy loading to improve performance. However, lazy loading can cause a slight delay when the user actually clicks the route. How would you mitigate this delay without sacrificing the initial load time benefit? Explain how you would implement a Custom Preloading Strategy.

**Sample Answer:**

**Concept:** Standard lazy loading waits until the click. `PreloadAllModules` loads everything immediately after the app stabilizes. A Custom Strategy is best: it loads critical lazy modules based on a data flag in the route configuration (e.g., `preload: true`).

**Practical Code (Custom Strategy):**

```typescript
// custom-preload-strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptInPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload if the route specifically requests it
    return route.data && route.data['preload'] 
      ? load() 
      : of(null);
  }
}

// app-routing.module.ts
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { preload: true } // This will be preloaded
  }
];
```

## Part 3: RxJS & Reactive Programming

**Context:** Your skills include "RxJS" and "Angular best practices".

### Q3: Handling Race Conditions (SwitchMap vs. MergeMap)

**Question:** In your experience integrating REST APIs, imagine a search bar where a user types fast. If you use a simple `.subscribe()`, earlier requests might resolve after the latest one, showing wrong data. How do you solve this using RxJS operators?

**Sample Answer:**

**Concept:** I would use `switchMap`. It cancels the previous inner observable (the API call) if a new value is emitted before the previous one completes. `mergeMap` would be wrong here as it runs calls in parallel. I would also use `debounceTime` to avoid spamming the API.

**Practical Code (Typeahead Search):**

```typescript
// search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Component({ ... })
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  results$!: Observable<any[]>;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),        // Wait for 300ms pause in typing
      distinctUntilChanged(),   // Ignore if next value is same as previous
      switchMap(searchTerm =>   // Cancel previous request, switch to new one
        this.api.search(searchTerm)
      )
    );
  }
}
```

## Part 4: Code Quality & SOLID Principles

**Context:** You listed "Clean Code Practices (SOLID Principles)" and "enforcing linting rules using ESLint".

### Q4: Dependency Injection & The 'D' in SOLID

**Question:** Explain how Angular's Dependency Injection system supports the Dependency Inversion Principle. If you have a LoggerService used across the app, but you want to use a different ServerLogger in production and a ConsoleLogger in development, how do you achieve this without changing component code?

**Sample Answer:**

**Concept:** Angular allows us to code to an interface (or abstract class), not a concrete implementation. We can use the providers array in `app.module.ts` to swap implementations using `useClass` or `useFactory`.

**Practical Code (Provider Swap):**

```typescript
// 1. Define the abstract base
export abstract class Logger {
  abstract log(msg: string): void;
}

// 2. Define implementations
@Injectable()
export class ConsoleLogger extends Logger {
  log(msg: string) { console.log('DEV:', msg); }
}

@Injectable()
export class ServerLogger extends Logger {
  log(msg: string) { /* HTTP post to server */ }
}

// 3. Provide based on environment (app.module.ts)
import { environment } from '../environments/environment';

@NgModule({
  providers: [
    {
      provide: Logger, 
      useClass: environment.production ? ServerLogger : ConsoleLogger
    }
  ]
})
export class AppModule {}

// 4. Usage in Component (remains unchanged!)
constructor(private logger: Logger) {
  this.logger.log('App started');
}
```

### Summary of Senior Strengths to Highlight
Based on your profile, when answering these, emphasize:
- **Tooling:** Mention your R&D work with Husky and ESLint to show you care about team velocity, not just your own code.
- **Mentorship:** Mention your experience mentoring junior developers when discussing code reviews or architectural decisions.
- **Metrics:** Always reference the "reduced initial load time" as a concrete outcome of your technical choices.

## Angular Re-rendering on Data Change – Senior-Level Explanation

Angular re-rendering is controlled by its change detection mechanism. When data changes, Angular decides which components need to update the DOM and which do not.

### 1. What does “re-render” mean in Angular?

Angular does NOT re-render the entire DOM like naive frameworks.

Instead, it:
- Detects data changes
- Re-evaluates component templates
- Updates only the DOM nodes whose bound values changed

This process is called **Change Detection**.

### 2. What triggers change detection?

Angular runs change detection when any of these happen:
- Browser events (click, input, scroll)
- HTTP responses
- Timers (setTimeout, setInterval)
- Promise resolution
- Observable emission
- `@Input()` value change
- Manual trigger (`detectChanges()`)

All of these are captured by **Zone.js**.

### 3. Default Change Detection Strategy

**Default behavior:**
- Angular checks ALL components from root to leaves
- Every binding expression is re-evaluated
- Happens on every async event

**Flow (Default):**
```text
AppComponent
 ├── HeaderComponent
 ├── DashboardComponent
 │    ├── ChartComponent
 │    └── TableComponent
 └── FooterComponent
```

👉 Even if only `ChartComponent` data changes, Angular still checks all components.

### 4. Example – Default Strategy Re-render

```typescript
@Component({
  selector: 'app-demo',
  template: `{{ count }}`
})
export class DemoComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
```

When `increment()` is called:
1. Angular runs change detection
2. Template expression `{{ count }}` is re-evaluated
3. DOM updates only if value changed

### 5. OnPush Change Detection Strategy (Important for Performance)

**What OnPush means:**
Angular skips re-rendering unless:
- `@Input()` reference changes
- Observable emits (async pipe)
- Component event occurs
- Manual trigger

**Example – OnPush:**
```typescript
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ data.name }}`
})
export class CardComponent {
  @Input() data!: { name: string };
}
```

### 6. Reference vs Mutation (CRITICAL CONCEPT)

**❌ Mutation (NO re-render with OnPush)**
```typescript
this.data.name = 'Updated';
```
Angular sees same object reference → no re-render.

**✅ New Reference (Triggers re-render)**
```typescript
this.data = { ...this.data, name: 'Updated' };
```
Angular sees new reference → re-render.

📌 **This is why immutability is required with OnPush.**

### 7. How *ngFor affects re-rendering

**Without trackBy (BAD)**
```html
<div *ngFor="let item of items">
  {{ item.name }}
</div>
```
Entire list re-renders on any change.

**With trackBy (GOOD)**
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
Angular updates only changed items.

### 8. Observables & async pipe (Best Practice)

**Why async pipe is better:**
- Triggers change detection automatically
- Handles subscription + unsubscribe
- Works perfectly with OnPush

```html
<div *ngIf="user$ | async as user">
  {{ user.name }}
</div>
```

### 9. Manual Change Detection (Advanced)

**ChangeDetectorRef**
```typescript
constructor(private cdr: ChangeDetectorRef) {}

update() {
  this.cdr.detectChanges();
}
```

**When to use:**
- Third-party libraries
- WebSocket callbacks
- Performance-critical zones

### 10. Zone.js and Re-rendering

**Zone.js:**
- Patches async APIs
- Notifies Angular when async work finishes
- Triggers change detection

**Without Zone.js (advanced):**
- You manually control change detection
- Used with Angular Signals / zoneless mode

### 11. Summary Table

| Scenario | Re-render Trigger |
|---|---|
| Default strategy | Any async event |
| OnPush | Input reference change |
| Observable | Emission |
| trackBy | Item identity change |
| Mutation | ❌ No re-render (OnPush) |
| New reference | ✅ Re-render |

### 12. Interview-Ready One-Liner (Use This)

> “Angular doesn’t blindly re-render the UI. It runs change detection triggered by async events and updates only the bindings whose values changed. Using OnPush, immutability, async pipe, and trackBy dramatically reduces unnecessary re-rendering.”

## 1. Angular Core (v17+)

### Q1. What is Angular and how is it different from React?

**Answer:**
Angular is a full-fledged front-end framework maintained by Google. It provides a complete solution including routing, forms, HTTP, DI, RxJS integration, and tooling.

**Key differences:**
- Angular uses TypeScript by default
- Built-in Dependency Injection
- Uses RxJS Observables extensively
- React is a library, Angular is a framework
- Angular uses HTML templates, React uses JSX

### Q2. What are Standalone Components in Angular 17?

**Answer:**
Standalone components eliminate the need for NgModule.

**Benefits:**
- Reduced boilerplate
- Faster compilation
- Better tree-shaking
- Easier lazy loading

```typescript
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>User</h1>`
})
export class UserComponent {}
```

### Q3. Explain Angular Signals. Why were they introduced?

**Answer:**
Signals are a fine-grained reactivity system introduced to reduce dependency on zone.js.

**Benefits:**
- Faster change detection
- Explicit state tracking
- Less unnecessary re-rendering

```typescript
count = signal(0);

increment() {
  this.count.update(v => v + 1);
}
```
Signals are pull-based, unlike Observables which are push-based.

## 2. TypeScript (Advanced)

### Q4. Difference between interface and type

**Answer:**

| Feature | interface | type |
|---|---|---|
| Extension | ✔️ | ✔️ |
| Declaration merging | ✔️ | ❌ |
| Union types | ❌ | ✔️ |

Use `interface` for object shapes, `type` for complex unions.

### Q5. What are Generics and why are they important?

**Answer:**
Generics make components and services type-safe and reusable.

```typescript
function identity<T>(value: T): T {
  return value;
}
```

Used heavily in:
- HTTP responses
- NgRx actions
- Reusable utilities

## 3. HTML5, CSS3 & Responsive Design

### Q6. How do you handle responsive design in Angular?

**Answer:**
- CSS Flexbox / Grid
- Media queries
- Angular CDK Layout
- Mobile-first approach

```css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
```

### Q7. Difference between Flexbox and Grid?

**Answer:**
- **Flexbox** → 1D layout (row OR column)
- **Grid** → 2D layout (rows AND columns)

## 4. RxJS & State Management

### Q8. What is RxJS and why Angular uses it?

**Answer:**
RxJS is a reactive programming library based on Observables.

Angular uses RxJS for:
- HTTP calls
- Event handling
- State management
- Async streams

### Q9. Observable vs Promise

**Answer:**

| Observable | Promise |
|---|---|
| Multiple values | Single value |
| Cancelable | Not cancelable |
| Lazy | Eager |
| Operators | Limited |

### Q10. Explain switchMap, mergeMap, concatMap

**Answer:**
- **switchMap** → Cancels previous request (search)
- **mergeMap** → Parallel requests
- **concatMap** → Sequential execution

```typescript
this.search$
  .pipe(switchMap(term => this.api.search(term)))
```

### Q11. What is NgRx and when do you use it?

**Answer:**
NgRx is a Redux-style state management library.

**Use NgRx when:**
- Large application
- Shared global state
- Predictable state changes
- Debugging with DevTools

**Core concepts:**
- Actions
- Reducers
- Effects
- Selectors

## 5. REST API Integration

### Q12. How does Angular handle HTTP calls?

**Answer:**
Using `HttpClient`, which returns Observables.

```typescript
this.http.get<User[]>('/api/users');
```

**Features:**
- Interceptors
- Typed responses
- Error handling
- Retry mechanisms

### Q13. What are HTTP Interceptors?

**Answer:**
Interceptors modify requests/responses globally.

**Use cases:**
- Add auth token
- Logging
- Error handling

```typescript
intercept(req, next) {
  return next.handle(req.clone({
    setHeaders: { Authorization: 'Bearer token' }
  }));
}
```

## 6. Testing (Jasmine & Karma)

### Q14. Difference between Jasmine and Karma

**Answer:**
- **Jasmine** → Testing framework (syntax, assertions)
- **Karma** → Test runner (executes tests in browser)

### Q15. Unit vs Integration testing

**Answer:**
- **Unit** → Component/service in isolation
- **Integration** → Multiple modules working together

```typescript
it('should create component', () => {
  expect(component).toBeTruthy();
});
```

## 7. Git & Version Control

### Q16. Git workflow you follow?

**Answer:**
- Feature branches
- Pull Requests
- Code reviews
- Squash commits

**Common commands:**
```bash
git checkout -b feature/login
git rebase main
git cherry-pick
```

### Q17. Difference between merge and rebase

**Answer:**
- **Merge** → Keeps history
- **Rebase** → Linear history (cleaner)

## 8. Agile Methodology

### Q18. What is Agile and how do you work in it?

**Answer:**
Agile focuses on iterative development and continuous feedback.

**Ceremonies:**
- Sprint planning
- Daily stand-up
- Sprint review
- Retrospective

**Tools:**
- Jira
- Scrum boards
- Story points

### Q19. How do you handle changing requirements?

**Answer:**
- Break work into small tasks
- Use feature flags
- Refactor safely
- Communicate early

## 9. Performance & Best Practices

### Q20. How do you optimize Angular performance?

**Answer:**
- OnPush change detection
- TrackBy in *ngFor
- Lazy loading
- Signals
- Avoid heavy logic in templates

```html
<li *ngFor="let item of items; trackBy: trackId"></li>
```










# 1. Approach & Planning

### Q1. How do you approach developing a new Angular UI from scratch?

**Answer:**
I start by understanding the business problem and user workflow, not the UI alone. I collaborate with product managers to clarify functional and non-functional requirements.

**My approach:**
- Break features into standalone components
- Define smart vs dumb components
- Establish routing and lazy-loaded modules
- Use OnPush change detection
- Follow SCAM or feature-based architecture

This ensures scalability, maintainability, and performance.

### Q2. How do you convert business requirements into executable Angular solutions?

**Answer:**
I translate business requirements into:
- User stories
- Acceptance criteria
- UI state diagrams
- API contracts

**Then I:**
- Design component structure
- Define data models (TypeScript interfaces)
- Integrate APIs
- Handle edge cases and error flows

This avoids rework and ensures alignment with business goals.

# 2. Analysis, Design & Architecture

### Q3. How do you analyze user needs and determine technical requirements?

**Answer:**
**I analyze:**
- User personas
- Data volume
- Real-time vs batch updates
- Security and performance needs

**Then I choose:**
- RxJS patterns for async handling
- State management strategy (local vs global)
- Caching and pagination approach

This ensures the solution fits both current and future needs.

### Q4. How do you participate in software design meetings?

**Answer:**
**I contribute by:**
- Reviewing architecture diagrams
- Identifying performance bottlenecks
- Suggesting reusable components
- Highlighting scalability and maintainability risks

I focus on long-term impact, not just feature delivery.

# 3. Coding, Testing & Debugging

### Q5. What is your coding approach for enterprise Angular applications?

**Answer:**
**I follow:**
- SOLID principles
- Strong TypeScript typing
- Separation of concerns
- RxJS best practices (no nested subscriptions)

**I avoid:**
- Heavy logic in templates
- Unmanaged subscriptions
- Tight coupling between UI and services

### Q6. How do you handle testing and debugging?

**Answer:**
**I:**
- Write unit tests for services and components
- Mock APIs and dependencies
- Test edge cases and error scenarios
- Debug using browser dev tools and logs

For production issues, I analyze stack traces and reproduction steps before fixing.

# 4. REST APIs & Asynchronous Processing

### Q7. How do you integrate RESTful APIs in Angular?

**Answer:**
Using `HttpClient` with:
- Typed responses
- Interceptors for auth/logging
- Centralized error handling
- Retry strategies for transient failures

I ensure UI remains responsive during async operations.

### Q8. How do you handle concurrent and asynchronous processing?

**Answer:**
I use RxJS operators like:
- `switchMap` for cancelable calls
- `forkJoin` for parallel APIs
- `combineLatest` for dependent streams

This is critical for real-time and distributed systems.

# 5. Enterprise & Real-Time Applications

### Q9. What challenges do you face in real-time enterprise applications?

**Answer:**
**Key challenges:**
- High data volume
- Frequent updates
- UI performance
- Error recovery

**Solutions:**
- Debouncing/throttling
- WebSocket or polling strategies
- Efficient change detection
- Smart state updates

# 6. L3 Support & Production Ownership

### Q10. What is L3 support and how do you contribute?

**Answer:**
L3 support involves:
- Handling critical production issues
- Root cause analysis
- Permanent fixes (not workarounds)
- Supporting post-mortems

I analyze logs, metrics, and user flows to prevent recurrence.

### Q11. How do you contribute to post-mortems and retrospectives?

**Answer:**
**I provide:**
- Technical root cause
- Impact analysis
- Preventive measures
- Process or architectural improvements

The goal is system improvement, not blame.

# 7. Documentation & Knowledge Sharing

### Q12. How do you handle documentation?

**Answer:**
**I document:**
- Architecture decisions
- API contracts
- Installation steps
- Common failure scenarios

Clear documentation improves onboarding and support efficiency.

### Q13. How do you train or communicate with non-technical teams?

**Answer:**
**I:**
- Simplify technical concepts
- Focus on system behavior and impact
- Use diagrams and examples
- Answer “why” rather than deep code details

# 8. Technology Evaluation & Innovation

### Q14. How do you evaluate new technologies?

**Answer:**
**I assess:**
- Learning curve
- Performance benefits
- Community support
- Compatibility with existing systems

I prototype before recommending adoption.

# 9. Presentation & Communication

### Q15. How do you present technical solutions to business stakeholders?

**Answer:**
**I:**
- Focus on outcomes and value
- Avoid jargon
- Explain trade-offs
- Use visuals when possible

Clear communication builds trust and alignment.

# 10. Ownership & Accountability

### Q16. How do you ensure code used in core commercial applications is stable?

**Answer:**
**I ensure:**
- Code reviews
- Automated tests
- Backward compatibility
- Safe deployments

I treat production code as business-critical, not experimental.











Q1. Your Angular dashboard shows real-time credit risk events. Data refresh causes UI lag. How do you fix it?

Expected Answer:

First, identify whether lag is due to:

Excessive change detection

Large DOM updates

Uncontrolled subscriptions

Solutions:

Use ChangeDetectionStrategy.OnPush

Update only affected rows (not whole table)

Use RxJS throttleTime / debounceTime

Avoid re-creating arrays/objects

Virtual scrolling for large lists

What FIS is testing:
Performance mindset + enterprise UI scale handling.

2️⃣ Production Incident (L3 Support)
Q2. A production release causes login failure for some users only. You’re on L3 support. What do you do?

Expected Answer:

Assess impact and scope (region, browser, role)

Check:

API responses

Auth interceptor changes

Token expiry logic

Reproduce locally with same config

Provide:

Immediate mitigation (rollback / feature flag)

Root cause analysis

Permanent fix

Document findings for post-mortem

What FIS is testing:
Ownership, calm under pressure, and RCA thinking.

3️⃣ Converting Business Requirement to Code
Q3. Business says:

“Show risk alerts within 2 seconds of generation.”
How do you implement this in Angular?


# 2. Performance & Production Scenarios

### Q1. Your Angular dashboard shows real-time credit risk events. Data refresh causes UI lag. How do you fix it?

**Expected Answer:**
First, identify whether lag is due to:
- Excessive change detection
- Large DOM updates
- Uncontrolled subscriptions

**Solutions:**
- Use `ChangeDetectionStrategy.OnPush`
- Update only affected rows (not whole table)
- Use RxJS `throttleTime` / `debounceTime`
- Avoid re-creating arrays/objects
- Virtual scrolling for large lists

**What FIS is testing:**
Performance mindset + enterprise UI scale handling.

### Q2. A production release causes login failure for some users only. You’re on L3 support. What do you do?

**Expected Answer:**
**Assess impact and scope (region, browser, role)**

**Check:**
- API responses
- Auth interceptor changes
- Token expiry logic
- Reproduce locally with same config

**Provide:**
- Immediate mitigation (rollback / feature flag)
- Root cause analysis
- Permanent fix
- Document findings for post-mortem

**What FIS is testing:**
Ownership, calm under pressure, and RCA thinking.

# 3. Converting Business Requirement to Code

### Q3. Business says: “Show risk alerts within 2 seconds of generation.” How do you implement this in Angular?

**Expected Answer:**
**Clarify if:**
- Polling or WebSocket
- Push or pull model

**Use:**
- WebSocket / SSE for real-time
- RxJS streams to update UI
- OnPush + signals (Angular 17)
- Show loading & fallback states
- Monitor latency metrics

**What FIS is testing:**
Translation of business SLAs into technical solutions.

# 4. Large Enterprise Module Design

### Q4. Credit Monitoring UI is growing fast. How do you structure Angular modules?

**Expected Answer:**
**Feature-based architecture:**
- Credit-dashboard module
- Alerts module
- Reports module
- Lazy load each feature
- Keep shared module small and pure
- Domain-specific services inside feature
- Clear ownership boundaries

**What FIS is testing:**
Scalability & long-term thinking.

# 5. Handling Concurrent API Calls

### Q5. Dashboard loads data from 5 APIs. Some depend on others. How do you manage this?

**Expected Answer:**
**Use:**
- `forkJoin` for parallel independent calls
- `switchMap` for dependent calls
- Centralize API orchestration in service
- Handle partial failures gracefully
- Show progressive UI loading

**What FIS is testing:**
RxJS mastery for enterprise async flows.

# 6. Security & Compliance Scenario

### Q6. How do you ensure sensitive credit data is not exposed in the UI?

**Expected Answer:**
- No sensitive logic in client
- Mask data at UI level
- Role-based rendering
- Secure token handling
- Avoid logging sensitive payloads
- Follow least-privilege principle

**What FIS is testing:**
Security awareness (very important for FIS).

# 7. Post-Mortem / Retrospective

### Q7. A UI bug caused incorrect risk score display. How do you contribute to the post-mortem?

**Expected Answer:**
**Explain:**
- What failed
- Why it failed
- Why it wasn’t caught

**Propose:**
- Test coverage improvements
- Monitoring alerts
- Code review changes
- Focus on prevention, not blame

**What FIS is testing:**
Maturity and system improvement mindset.

# 8. Introducing New Technology

### Q8. Angular Signals look promising. How do you introduce them safely?

**Expected Answer:**
- Do not refactor entire app
- **Start with:**
    - One isolated feature
    - Performance-critical area
- Measure before/after impact
- Ensure team understanding
- Gradual adoption

**What FIS is testing:**
Innovation without risk.

# 9. Cross-Team Communication

### Q9. Product team wants UI change that affects backend contracts. What do you do?

**Expected Answer:**
- Raise dependency early
- Sync with backend team
- Propose backward-compatible change
- Avoid breaking APIs
- Align on delivery timelines

**What FIS is testing:**
Collaboration and professionalism.

# 10. Presentation to Business Stakeholders

### Q10. You need to explain a UI delay issue to non-technical leadership. How?

**Expected Answer:**
- Avoid technical jargon
- Explain impact, not implementation
- Use visuals or flow diagrams
- Provide options with trade-offs
- Give clear next steps

**What FIS is testing:**
Communication & leadership.

---

# ROUND 1: Technical Screening (Architecture & Fundamentals)

### Q1. Walk me through how you design an Angular UI for a Credit / Fraud Monitoring dashboard.

**Strong Answer (Say this):**
I start by understanding the business flow and SLAs — for example, how quickly alerts must appear and how frequently data updates.

I design the UI using feature-based architecture where each domain (alerts, transactions, reports) is isolated and lazy-loaded.

**I use:**
- Standalone components or feature modules based on complexity
- OnPush change detection
- RxJS streams for async data
- Clear separation between smart and presentational components

This ensures scalability, performance, and ownership clarity.

### Q2. Why do you avoid shared mega-modules?

**Expected Answer:**
Shared mega-modules increase bundle size, create tight coupling, and make it impossible to lazy load features.

Feature-based modules ensure only required code is loaded when the route is accessed, reducing initial load time and improving maintainability.

### Q3. How do you ensure UI performance when handling real-time updates?

**Expected Answer:**
- Avoid full component re-renders
- Use OnPush + immutable updates
- Throttle or debounce streams
- Update only affected UI parts
- Use virtual scrolling for large datasets

Performance issues usually come from unnecessary change detection, not API speed.

# ROUND 2: Coding Round (Real FIS-Style Scenarios)

### Scenario 1: RxJS – Cancel Previous Requests

**Problem:**
User types in a search box. API should cancel previous requests.

**Expected Solution:**
```typescript
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
).subscribe(results => {
  this.results = results;
});
```

**Why this matters at FIS:**
Prevents backend overload and UI race conditions.

### Scenario 2: Optimize *ngFor Performance

**Problem:**
Large list re-renders completely on update.

**Solution:**
```html
<div *ngFor="let item of items; trackBy: trackById">
```
```typescript
trackById(index: number, item: any) {
  return item.id;
}
```

### Scenario 3: Convert Business Rule to UI Logic

**Rule:**
“Show alert only if risk score > 80 AND user role is Admin”

```html
<div *ngIf="alert.score > 80 && isAdmin">
  High Risk Alert
</div>
```

**What they check:**
Clean logic, no over-engineering.

# ROUND 3: Advanced Angular (Angular 17+)

### Q4. Signals vs RxJS — when do you use each?

**Strong Answer:**
- **Signals** are ideal for local synchronous UI state and reducing unnecessary change detection.
- **RxJS** is still best for async operations, HTTP calls, streams, and orchestration.

In enterprise apps, I use both together, not one instead of the other.

### Q5. How do you handle memory leaks in Angular?

**Expected Answer:**
- Avoid manual subscriptions when possible
- Use async pipe
- Use `takeUntil` pattern
- Ensure cleanup in `ngOnDestroy`

# ROUND 4: L3 Support & Production Scenarios (VERY IMPORTANT)

### Q6. A production issue occurs after deployment. Some users can’t see alerts. What do you do?

**Expected Answer (Structured):**
1. Assess impact and severity
2. Check logs, API responses, feature flags
3. Reproduce using prod config
4. Identify root cause
5. Rollback or hotfix
6. Document RCA and prevention steps

L3 support is about fixing permanently, not patching temporarily.

### Q7. How do you contribute to post-mortems?

**Answer:**
I focus on why the issue escaped testing, what signals were missed, and how we can prevent recurrence — not on blame.

# ROUND 5: Behavioral (STAR Method – FIS Focused)

### STAR Q1: Tell me about a time you handled a critical production issue.

**S – Situation:**
Production UI bug caused incorrect data display.

**T – Task:**
Identify root cause and restore system quickly.

**A – Action:**
- Checked API payload vs UI mapping
- Found incorrect transformation logic
- Fixed and added regression test

**R – Result:**
Issue resolved within SLA, no recurrence.

### STAR Q2: Tell me about a time you disagreed with a product requirement.

**Answer Summary:**
- Raised concerns early
- Explained technical impact
- Suggested alternative
- Achieved compromise without delay

**What FIS sees:**
Maturity + collaboration.

### STAR Q3: Tell me about a time you introduced a new technology.

**Answer Summary:**
- Evaluated impact
- Introduced gradually
- Measured improvement
- Trained team

# ROUND 6: Communication & Ownership

### Q8. How do you explain technical issues to non-technical stakeholders?

**Expected Answer:**
I explain impact, options, and timelines using simple language and visuals, not code details.

### Q9. How do you ensure compliance and data security in UI?

**Expected Answer:**
- Mask sensitive data
- Role-based rendering
- Secure token handling
- No sensitive logs
- Follow least-privilege principle

(Security is critical at FIS.)

# FINAL ROUND: Closing Question

### Q10. Why do you want to work at FIS?

**Perfect Answer:**
FIS builds mission-critical financial systems where correctness, performance, and reliability matter. I enjoy working on enterprise-scale products where UI decisions have real-world impact and long-term value.

# 🎯 FINAL INTERVIEW SCORECARD (What FIS Wants)

**They look for:**
- Production ownership
- Performance mindset
- Clean architecture
- Strong Angular fundamentals
- Calm decision-making
- Clear communication