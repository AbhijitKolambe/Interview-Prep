import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-reusable-card',
    template: `
    <div class="card mb-3 shadow-sm">
      <div class="card-header bg-light fw-bold" *ngIf="title">
        {{ title }}
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer text-muted" *ngIf="footer">
        {{ footer }}
      </div>
    </div>
  `,
    styles: []
})
export class ReusableCardComponent {
    @Input() title: string = '';
    @Input() footer: string = '';
}
