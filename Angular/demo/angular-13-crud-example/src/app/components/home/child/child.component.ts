import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styles: [`
    .child-box { border: 2px dashed #0d6efd; padding: 15px; margin-top: 10px; border-radius: 5px; background-color: #e7f1ff; }
  `]
})
export class ChildComponent {
    @Input() parentData: string = '';
    @Output() childEvent = new EventEmitter<string>();
    @Input() myValue: any = 0;

    sendMessageToParent() {
        this.childEvent.emit('Hello from Child Component! ' + new Date().toLocaleTimeString());
    }

    changeParentData(newMessage: string) {
        this.parentData = newMessage;
    }
}
