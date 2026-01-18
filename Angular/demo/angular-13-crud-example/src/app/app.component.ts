import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  title = 'Angular 13 CRUD example';
  count: number = 0;

  constructor() {
    this.count = 5;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Input changed", changes);
  }

  ngOnInit() {
    console.log("Component Initialized");
  }

  ngDoCheck() {
    console.log("Checking changes...");
  }

  ngAfterContentInit() {
    console.log("Projected content initialized");
  }

  ngAfterContentChecked() {
    console.log("Projected content checked");
  }

  ngAfterViewInit() {
    console.log("View initialized");
  }

  ngAfterViewChecked() {
    console.log("View checked");
  }

  ngOnDestroy() {
    console.log("Component destroyed");
  }

  counter() {
    this.count++;
    // console.log("counter");
  }
}
