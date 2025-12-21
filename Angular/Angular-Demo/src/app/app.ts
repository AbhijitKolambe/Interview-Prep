import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {VirtualListComponent} from "../components/virtual-list.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,VirtualListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Angular-Demo';

   isLoggedIn = false;
  username = 'Abhijit';

  users = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' }
  ];

  role: 'admin' | 'editor' | 'user' = 'user';

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  test() {
    console.log('hi');
  }
}
