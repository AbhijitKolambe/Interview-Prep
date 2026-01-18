import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-category-child',
    templateUrl: './category-child.component.html',
    styleUrls: ['./category-child.component.css']
})
export class CategoryChildComponent implements OnInit {

    // Two way data binding property
    categoryName: string = '';

    // Normal change event property
    categoryDescription: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    // Normal change function
    onDescriptionChange(event: any): void {
        this.categoryDescription = (event.target as HTMLInputElement).value;
        console.log('Category Description Changed:', this.categoryDescription);
    }

}
