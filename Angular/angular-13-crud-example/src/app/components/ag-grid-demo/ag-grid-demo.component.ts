import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-demo',
  templateUrl: './ag-grid-demo.component.html',
  styleUrls: ['./ag-grid-demo.component.css']
})
export class AgGridDemoComponent implements OnInit {

  gridApi!: GridApi;

  columnDefs = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      filter: false
    },
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: 'Age',
      field: 'age',
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `
          <button class="edit-btn">Edit</button>
        `;
      }
    }
  ];

  defaultColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true
  };

  rowData = [
    { id: 1, name: 'Abhijit', email: 'abhijit@mail.com', age: 25 },
    { id: 2, name: 'Rahul', email: 'rahul@mail.com', age: 28 },
    { id: 3, name: 'Priya', email: 'priya@mail.com', age: 23 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSearch(event: any) {
    const value = event.target.value;
    this.gridApi.setQuickFilter(value);
  }

  addRow() {
    const newRow = {
      id: Date.now(),
      name: 'New User',
      email: 'new@mail.com',
      age: 20
    };

    this.rowData = [...this.rowData, newRow];
  }

  deleteRow() {
    const selected = this.gridApi.getSelectedRows();
    this.rowData = this.rowData.filter(r => !selected.includes(r));
  }
}
