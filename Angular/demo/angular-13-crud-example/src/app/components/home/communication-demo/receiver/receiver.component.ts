import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
    selector: 'app-receiver',
    template: `
    <div class="card p-3 bg-light">
      <h3>Receiver Component</h3>
      <p>Latest Data Received:</p>
      <div class="alert alert-info">
        <strong>{{ receivedData }}</strong>
      </div>
    </div>
  `,
    styles: []
})
export class ReceiverComponent implements OnInit {

    receivedData: string = '';

    constructor(private dataSharingService: DataSharingService) { }

    ngOnInit(): void {
        // Subscribe to the observable to get updates
        this.dataSharingService.data$.subscribe(data => {
            this.receivedData = data;
        });
    }

}
