import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
    standalone: true,
    imports: [FormsModule]
})
export class ChatComponent {
    question = "";
    answer = "";

    constructor(private chat: ChatService) { }

    ask() {
        this.chat.ask(this.question).subscribe(res => {
            this.answer = res.answer;
        });
    }
}
