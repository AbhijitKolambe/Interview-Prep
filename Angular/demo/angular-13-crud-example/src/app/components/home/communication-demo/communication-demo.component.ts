import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-communication-demo',
    template: `
    <div class="container mt-4">
      <h2>Sibling Communication using Service (Getters/Setters)</h2>
      <p class="text-muted">Pass data between components that do not have a parent-child relationship.</p>
      <div class="row">
        <div class="col-md-6">
          <app-sender></app-sender>
        </div>
        <div class="col-md-6">
          <app-receiver></app-receiver>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class CommunicationDemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
