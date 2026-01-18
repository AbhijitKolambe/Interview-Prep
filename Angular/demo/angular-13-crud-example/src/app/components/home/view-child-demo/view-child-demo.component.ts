import { Component, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
    selector: 'app-view-child-demo',
    templateUrl: './view-child-demo.component.html',
    styles: []
})
export class ViewChildDemoComponent implements AfterViewInit {
    @ViewChild('inputRef') inputElement!: ElementRef;
    @ViewChild(ChildComponent) firstChild!: ChildComponent;
    @ViewChildren(ChildComponent) allChildren!: QueryList<ChildComponent>;

    childCount: number = 0;

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit - firstChild:', this.firstChild);
        console.log('ngAfterViewInit - allChildren count:', this.allChildren ? this.allChildren.length : 0);
    }

    focusInput() {
        if (this.inputElement) {
            this.inputElement.nativeElement.focus();
            this.inputElement.nativeElement.value = "Focused via ViewChild!";
        }
    }

    updateFirstChild() {
        if (this.firstChild) {
            this.firstChild.changeParentData('Updated via ViewChild!');
        }
    }

    countChildren() {
        if (this.allChildren) {
            this.childCount = this.allChildren.length;
            this.allChildren.forEach(child => {
                child.changeParentData('Updated via ViewChildren Loop');
            });
        }
    }
}
