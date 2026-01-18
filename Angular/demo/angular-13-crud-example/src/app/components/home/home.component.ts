import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  // State for toggling visible sections.
  activeSection: string = 'pipes';

  // Property for the category input in Home (requested requirement)
  homeCategoryInput: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("HomeComponent - ngOnChanges triggered", changes);
  }



  /**
   * Helper method to switch the currently active section.
   * @param section The name of the section to display ('pipes', 'directives', 'io', 'todos').
   */
  setActiveSection(section: string): void {
    this.activeSection = section;
  }

}
