import { Component } from '@angular/core';

@Component({
    selector: 'app-io-demo',
    templateUrl: './io-demo.component.html',
    styles: []
})
export class IoDemoComponent {
    dataToChild: string = 'Initial Data from Parent';
    messageFromChild: string = '';

    handleChildEvent(message: string) {
        this.messageFromChild = message;
    }
}
