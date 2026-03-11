import { Component } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IFilterParams, IDoesFilterPassParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css']
})
export class StatusFilterComponent implements IFilterAngularComp {
  params!: IFilterParams;
  status: string = '';

  // 1. Initialized with AG Grid params
  agInit(params: IFilterParams): void {
    this.params = params;
  }

  // 2. Used to determine if the filter is applied
  isFilterActive(): boolean {
    return this.status !== '';
  }

  // 3. Logic to check each row against the filter value
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    // Check if the current row's status matches the selected dropdown status
    const field = this.params.colDef.field;
    const rowStatus = field ? params.data[field] : null;
    return rowStatus === this.status;
  }

  // 4. Returns the state of the filter
  getModel() {
    return this.isFilterActive() ? { value: this.status } : null;
  }

  // 5. Applies a given state to the filter
  setModel(model: any) {
    this.status = model ? model.value : '';
  }

  // Triggers an update inside AG Grid whenever the user selects a new dropdown option
  onChange(newValue: any) {
    this.params.filterChangedCallback();
  }
}
