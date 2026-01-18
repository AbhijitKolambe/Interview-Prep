import { Component } from '@angular/core';

@Component({
    selector: 'app-pipes-demo',
    templateUrl: './pipes-demo.component.html',
    styles: []
})
export class PipesDemoComponent {
    today: Date = new Date();
    price: number = 1234.56;
    message: string = 'Angular is Awesome';
}
