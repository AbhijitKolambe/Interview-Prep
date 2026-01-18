import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
    selector: 'app-todos-demo',
    templateUrl: './todos-demo.component.html',
    styles: []
})
export class TodosDemoComponent implements OnInit {
    todos: Todo[] = [];

    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
        this.todoService.getAll().subscribe({
            next: (data) => {
                this.todos = data;
                console.log("Todos fetched successfully", data);
            },
            error: (e) => console.error("Error fetching todos", e)
        });
    }
}
