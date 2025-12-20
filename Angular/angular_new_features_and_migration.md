
# Angular New Features & Migration Guide (v14 → v18)

## 1. Control Flow Syntax (`@if`, `@for`, `@switch`)
**Introduced:** Angular 17

### Old Syntax
```html
<div *ngIf="isLoggedIn">Welcome</div>
<li *ngFor="let user of users; trackBy: trackById">{{ user.name }}</li>
```

### New Syntax
```html
@if (isLoggedIn) {
  <div>Welcome</div>
}

@for (user of users; track user.id) {
  <li>{{ user.name }}</li>
}
```

### Why Changed?
- Better readability
- Improved performance
- Easier compiler optimization
- JavaScript-like syntax

---

## 2. `@else`, `@else if`
**Angular 17**
```html
@if (isAdmin) {
  <div>Admin</div>
} @else {
  <div>User</div>
}
```

---

## 3. `@switch`
**Angular 17**
```html
@switch (role) {
  @case ('admin') { <p>Admin</p> }
  @case ('user') { <p>User</p> }
  @default { <p>Guest</p> }
}
```

---

## 4. Signals
**Introduced:** Angular 16

```ts
count = signal(0);

increment() {
  this.count.update(v => v + 1);
}
```

```html
<p>{{ count() }}</p>
```

### Why Signals?
- Fine-grained reactivity
- Better performance
- Reduced Zone.js dependency

---

## 5. Zoneless Angular
**Angular 16+**
```ts
bootstrapApplication(AppComponent, {
  providers: [provideExperimentalZonelessChangeDetection()]
});
```

---

## 6. Standalone Components
**Introduced:** Angular 14 (Default in 17)

```ts
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

---

## 7. Lazy Loading Without Modules
```ts
{
  path: 'admin',
  loadComponent: () =>
    import('./admin.component').then(c => c.AdminComponent)
}
```

---

## 8. Required Inputs
**Angular 16**
```ts
@Input({ required: true }) title!: string;
```

---

## 9. DestroyRef & Auto Cleanup
```ts
constructor(destroyRef: DestroyRef) {
  destroyRef.onDestroy(() => console.log('Destroyed'));
}
```

---

## 10. takeUntilDestroyed
```ts
this.data$
  .pipe(takeUntilDestroyed())
  .subscribe();
```

---

## 11. Functional Route Guards
```ts
export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn();
};
```

---

## 12. Typed Forms
```ts
const form = new FormGroup({
  name: new FormControl<string>(''),
});
```

---

# Migration Guide (Old → New Angular)

## Is Migration Mandatory?
❌ No. Old syntax still works.
✅ Recommended for performance & future-proofing.

---

## Easy Migration Steps

### 1. Update Angular
```bash
ng update @angular/core @angular/cli
```

---

### 2. Migrate `*ngIf` → `@if`
```html
<!-- Old -->
<div *ngIf="condition">Hello</div>

<!-- New -->
@if (condition) {
  <div>Hello</div>
}
```

---

### 3. Migrate `*ngFor` → `@for`
```html
@for (item of items; track item.id) {
  <p>{{ item.name }}</p>
}
```

---

### 4. Mixed Usage Allowed
You can use **old and new syntax together** during migration.

---

## Recommended Migration Order
1. Standalone components
2. Functional guards
3. Signals (for state)
4. Control flow (`@if`, `@for`)
5. Zoneless (optional)

---

## Interview Summary
- Angular 14 → Standalone
- Angular 16 → Signals, Zoneless
- Angular 17 → New control flow
- Migration is **gradual and safe**

---

## Final Tip
> Migrate **feature-by-feature**, not whole app at once.
