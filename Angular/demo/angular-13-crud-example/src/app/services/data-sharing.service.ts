import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {

    // We use a BehaviorSubject to hold the current value and emit changes to subscribers.
    // We initialize it with a default value.
    private _dataSource = new BehaviorSubject<string>('Default Category');

    // We expose the Observable part so components can subscribe to it.
    data$: Observable<string> = this._dataSource.asObservable();

    constructor() { }

    // Getter to get the current snapshot value (synchronous)
    get data(): string {
        return this._dataSource.getValue();
    }

    // Setter to update the value and notify all subscribers
    set data(value: string) {
        console.log(`[DataSharingService] Setting data to: ${value}`);
        this._dataSource.next(value);
    }
}
