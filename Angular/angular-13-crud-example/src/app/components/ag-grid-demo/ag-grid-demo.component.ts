import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { StatusFilterComponent } from './status-filter/status-filter.component';
@Component({
  selector: 'app-ag-grid-demo',
  templateUrl: './ag-grid-demo.component.html',
  styleUrls: ['./ag-grid-demo.component.css']
})
export class AgGridDemoComponent implements OnInit {

  // State to handle which demo is currently visible
  // Possible values: 'basic', 'inlineEdit', 'cellPopup', 'pagination', 'customRender'
  activeGrid: string = 'basic';

  constructor() { }

  ngOnInit(): void { }

  setActiveGrid(gridName: string) {
    this.activeGrid = gridName;
  }

  // ==========================================
  // EXAMPLE 1: BASIC GRID DATA & LOGIC 
  // ==========================================
  gridApi!: GridApi;

  columnDefs = [
    { headerName: '', checkboxSelection: true, headerCheckboxSelection: true, width: 50, filter: false },
    { headerName: 'ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Email', field: 'email', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Age', field: 'age', sortable: true, filter: 'agNumberColumnFilter' }
  ];

  defaultColDef = { flex: 1, filter: true, floatingFilter: true };

  rowData = [
    { id: 1, name: 'Abhijit', email: 'abhijit@mail.com', age: 25 },
    { id: 2, name: 'Rahul', email: 'rahul@mail.com', age: 28 },
    { id: 3, name: 'Priya', email: 'priya@mail.com', age: 23 }
  ];

  onGridReady(params: any) { this.gridApi = params.api; }
  onSearch(event: any) { this.gridApi.setQuickFilter(event.target.value); }
  addRow() { this.rowData = [...this.rowData, { id: Date.now(), name: 'New User', email: 'new@mail.com', age: 20 }]; }
  deleteRow() {
    const selected = this.gridApi.getSelectedRows();
    this.rowData = this.rowData.filter(r => !selected.includes(r));
  }

  // Basic Grid associated Nested Table State
  showNestedTable = false;
  nestedData = [
    {
      groupName: 'Engineering',
      employees: [
        { id: 101, name: 'Amit', role: 'Frontend Developer', city: 'Pune' },
        { id: 102, name: 'Sneha', role: 'Backend Developer', city: 'Mumbai' }
      ]
    },
    {
      groupName: 'Product & Design',
      employees: [
        { id: 201, name: 'Kiran', role: 'UI/UX Designer', city: 'Mumbai' },
        { id: 202, name: 'Neha', role: 'Product Manager', city: 'Pune' }
      ]
    }
  ];
  toggleNestedTable() { this.showNestedTable = !this.showNestedTable; }


  // ==========================================
  // EXAMPLE 2: INLINE EDITABLE GRID 
  // ==========================================
  // Note: setting 'editable: true' allows native inline editing in ag-grid.
  inlineEditColumnDefs = [
    { headerName: 'ID', field: 'id', editable: false }, // usually IDs shouldn't be edited
    { headerName: 'Task Name', field: 'task', editable: true, cellStyle: { 'background-color': '#e8f4f8' } },
    {
      headerName: 'Status',
      field: 'status',
      editable: true,
      // cellEditor specifies we want ag-grid's native dropdown UI editor
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['To Do', 'In Progress', 'Done'] },
      cellStyle: { 'background-color': '#e8f4f8' },
      filter: StatusFilterComponent // Attach our custom Angular DroDpown Filter
    }
  ];
  inlineEditRowData = [
    { id: 1, task: 'Implement Redux Store', status: 'To Do' },
    { id: 2, task: 'Fix Login Bug', status: 'In Progress' },
    { id: 3, task: 'Setup CI/CD Pipeline', status: 'Done' }
  ];


  // ==========================================
  // EXAMPLE 3: CELL CLICK POPUP (MODAL)
  // ==========================================
  popupColumnDefs = [
    { headerName: 'Employee', field: 'name' },
    { headerName: 'Current Department', field: 'dept' },
    {
      headerName: 'Action (Click Me)',
      field: 'action',
      cellStyle: { 'color': '#0d6efd', 'text-decoration': 'underline', 'cursor': 'pointer', 'font-weight': 'bold' },
      valueGetter: () => 'Change Dept' // Fakes a column that just says 'Change Dept' on all rows
    }
  ];
  popupRowData = [
    { name: 'Abhijit', dept: 'Engineering' },
    { name: 'Rahul', dept: 'Human Resources' },
    { name: 'Priya', dept: 'Marketing' }
  ];

  // Internal state for our Custom Modal
  isModalOpen: boolean = false;
  selectedEmployeeNode: any = null; // Store AG-Grid node reference
  selectedEmployeeName: string = '';
  editDepartmentValue: string = '';
  popupTop: string = '0px';
  popupLeft: string = '0px';

  // Function triggered via (cellClicked)="onPopupCellClicked($event)" in HTML
  onPopupCellClicked(event: any) {
    if (event.colDef.field === 'action') {
      const mouseEvent = event.event as MouseEvent;

      // Calculate popup position natively relative to browser window
      // We add a minor 10px offset so the mouse doesn't cover the popup entirely
      this.popupTop = (mouseEvent.clientY + 10) + 'px';
      this.popupLeft = (mouseEvent.clientX + 10) + 'px';

      // 1. Save data into state
      this.selectedEmployeeNode = event.node;
      this.selectedEmployeeName = event.data.name;
      this.editDepartmentValue = event.data.dept;
      // 2. Open Modal
      this.isModalOpen = true;
    }
  }

  // Closes the custom modal without saving
  closeModal() {
    this.isModalOpen = false;
    this.selectedEmployeeNode = null;
  }

  // Saves the custom modal data back into AG-Grid
  saveModalChanges() {
    if (this.selectedEmployeeNode) {
      // 3. Update the Grid node dynamically
      this.selectedEmployeeNode.setDataValue('dept', this.editDepartmentValue);
      // 4. Close the modal
      this.closeModal();
    }
  }


  // ==========================================
  // EXAMPLE 4: PAGINATION GRID
  // ==========================================
  paginationColumnDefs = [
    { headerName: 'Emp ID', field: 'employeeId' },
    { headerName: 'Employee Name', field: 'name' }
  ];
  // Generate 25 fake rows dynamically using Array.from for our pagination demo
  paginationRowData = Array.from({ length: 25 }, (_, i) => ({
    employeeId: 1000 + i,
    name: 'Auto-Generated Employee ' + (i + 1)
  }));


  // ==========================================
  // EXAMPLE 5: CUSTOM CELL RENDERER
  // ==========================================
  customColumnDefs = [
    { headerName: 'Project Name', field: 'project' },
    {
      headerName: 'Progress Status',
      field: 'progress',
      // Instead of relying on Angular Component classes, 
      // you can return direct HTML templates matching the specific cell value!
      cellRenderer: (params: any) => {
        const percent = params.value;
        const color = percent === 100 ? '#4caf50' : (percent > 40 ? '#2196f3' : '#f44336'); // red, blue, green based on progress

        return `
          <div style="width: 100%; position: relative;">
            <div style="width: 100%; background-color: #e0e0e0; border-radius: 4px; overflow: hidden; margin-top: 10px; height: 18px;">
              <div style="width: ${percent}%; background-color: ${color}; height: 100%;"></div>
            </div>
            <span style="position: absolute; top: 0px; left: 45%; font-size: 11px; font-weight: bold; color: ${percent > 50 ? '#fff' : '#000'}; 
                         mix-blend-mode: difference;">${percent}%</span>
          </div>
        `;
      }
    }
  ];
  customRowData = [
    { project: 'CRM Migration', progress: 75 },
    { project: 'Database Upgrade', progress: 15 },
    { project: 'UI Refresh', progress: 100 },
    { project: 'Add Payment Gateway', progress: 45 }
  ];

  // ==========================================
  // EXAMPLE 6: MASTER/DETAIL ACCORDION
  // ==========================================
  masterColumnDefs = [
    { headerName: 'Department', field: 'department', cellRenderer: 'agGroupCellRenderer' },
    { headerName: 'Manager', field: 'manager' }
  ];

  masterRowData = [
    {
      id: "dept-1",
      department: 'Engineering',
      manager: 'Rakesh Patil',
      // Inner Detail Records:
      employees: [
        { id: 101, name: 'Amit', role: 'Frontend Developer', city: 'Pune' },
        { id: 102, name: 'Sneha', role: 'Backend Developer', city: 'Mumbai' }
      ]
    },
    {
      id: "dept-2",
      department: 'Design',
      manager: 'Priya Singh',
      employees: [
        { id: 201, name: 'Kiran', role: 'UI/UX Designer', city: 'Mumbai' }
      ]
    }
  ];

  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { headerName: 'Emp ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Role', field: 'role' },
        { headerName: 'City', field: 'city' }
      ],
      defaultColDef: { flex: 1 }
    },
    // Tells the AG-Grid Master what array of data to pass into the inner grid!
    getDetailRowData: (params: any) => {
      params.successCallback(params.data.employees);
    }
  };

  // ==========================================
  // EXAMPLE 7: LEGACY COLUMN MENU
  // ==========================================
  legacyMenuColumnDefs = [
    { field: 'name', filter: true },
    { field: 'age', filter: true },
    { field: 'country', filter: true }
  ];

  legacyMenuDefaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  legacyMenuRowData = [
    { name: 'John', age: 25, country: 'USA' },
    { name: 'Raj', age: 30, country: 'India' },
    { name: 'Anna', age: 28, country: 'UK' }
  ];

  legacyMenuGridOptions: any = {
    columnMenu: 'legacy'
  };

  // ==========================================
  // EXAMPLE 8: COLUMN VISIBILITY DROPDOWN
  // ==========================================
  visibilityGridApi!: GridApi;
  visibilityColumnApi!: any;
  isDropdownOpen: boolean = false;

  allColumns = [
    { headerName: 'ID', field: 'id', visible: true },
    { headerName: 'First Name', field: 'firstName', visible: true },
    { headerName: 'Last Name', field: 'lastName', visible: true },
    { headerName: 'Age', field: 'age', visible: true },
    { headerName: 'Gender', field: 'gender', visible: true },
    { headerName: 'Country', field: 'country', visible: true },
    { headerName: 'City', field: 'city', visible: true },
    { headerName: 'Occupation', field: 'occupation', visible: true },
    { headerName: 'Salary', field: 'salary', visible: true },
    { headerName: 'Experience', field: 'experience', visible: true },
    { headerName: 'Status', field: 'status', visible: true },
    { headerName: 'Email', field: 'email', visible: true },
    { headerName: 'Phone', field: 'phone', visible: true },
    { headerName: 'Department', field: 'department', visible: true },
    { headerName: 'Start Date', field: 'startDate', visible: true },
    { headerName: 'A Very Long Column Header Name Example', field: 'longDescription', visible: true }
  ];

  visibilityColumnDefs = this.allColumns.map(col => ({
    headerName: col.headerName,
    field: col.field,
    hide: !col.visible
  }));

  visibilityRowData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    firstName: 'User' + (i + 1),
    lastName: 'Name' + (i + 1),
    age: 20 + (i % 30),
    gender: i % 2 === 0 ? 'Male' : 'Female',
    country: i % 3 === 0 ? 'India' : (i % 3 === 1 ? 'USA' : 'UK'),
    city: 'City' + (i + 1),
    occupation: 'Role ' + (i % 5 + 1),
    salary: 50000 + (i * 1000),
    experience: (i % 10 + 1) + ' Yrs',
    status: i % 4 === 0 ? 'Inactive' : 'Active',
    email: `user${i + 1}@test.com`,
    phone: `98765432${i}`,
    department: 'Dept ' + (i % 4 + 1),
    startDate: `2023-${(i % 12) + 1}-01`,
    longDescription: `This is some very, extremely long dynamic description text for user ${i + 1} purely to test the automatic column width resizing behavior.`
  }));

  onVisibilityGridReady(params: any) {
    this.visibilityGridApi = params.api;
    this.visibilityColumnApi = params.columnApi;
  }

  onVisibilityFirstDataRendered(params: any) {
    this.autoSizeAll();
  }

  autoSizeAll() {
    if (this.visibilityColumnApi) {
      const allColumnIds: string[] = [];
      const columns = this.visibilityColumnApi.getAllDisplayedColumns();
      if (columns) {
        columns.forEach((column: any) => {
          allColumnIds.push(column.getColId());
        });
        this.visibilityColumnApi.autoSizeColumns(allColumnIds, false);
      }
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleColumn(field: string) {
    const col = this.allColumns.find(c => c.field === field);
    if (col) {
      col.visible = !col.visible;
      if (this.visibilityColumnApi) {
        this.visibilityColumnApi.setColumnVisible(field, col.visible);
        // Wait for AG-Grid DOM to append the new column before calculating dimensions
        setTimeout(() => this.autoSizeAll(), 150); 
      }
    }
  }

}
