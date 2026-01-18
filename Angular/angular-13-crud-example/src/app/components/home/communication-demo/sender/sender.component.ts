import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
    selector: 'app-sender',
    template: `
    <div class="card p-3">
      <h3>Sender Component</h3>
      <div class="mb-3">
        <label for="categoryInput" class="form-label">New Category Name</label>
        <input type="text" class="form-control" id="categoryInput" [(ngModel)]="categoryName" placeholder="Enter category">
      </div>
      <button class="btn btn-success" (click)="sendData()">Create New Category</button>
    </div>
  `,
    styles: []
})
export class SenderComponent implements OnInit {

    categoryName: string = '';

    constructor(private dataSharingService: DataSharingService) { }

    ngOnInit(): void {
    }

    sendData(): void {
        if (this.categoryName) {
            // Using the setter to pass data
            this.dataSharingService.data = this.categoryName;
            this.categoryName = ''; // Reset input
        }
    }

}
