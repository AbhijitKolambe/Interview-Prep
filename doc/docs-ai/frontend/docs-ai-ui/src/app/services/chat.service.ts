import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {

    constructor(private http: HttpClient) { }

    ask(question: string) {
        return this.http.post<any>("http://localhost:8000/ask", { question })
    }

}
