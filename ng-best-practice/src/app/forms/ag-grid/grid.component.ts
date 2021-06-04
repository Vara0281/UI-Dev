import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData$: any;
  columnDefs = [
    {
      headerName: 'Index', field: 'index', sortable: true, filter: true, width: 120,
      checkboxSelection: true, editable: true
    },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    // { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Gender', field: 'gender', sortable: true, width: 120 },
    { headerName: 'Email', field: 'company.email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'company.phone', sortable: true, filter: true },
    { headerName: 'Company', field: 'company.title', filter: true, width: 120 },
    { headerName: 'Country', field: 'company.location.country', width: 120, sortable: true, filter: true },
    { headerName: 'Address', field: 'company.location.address' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData$ = this.http.get('http://localhost:3000/api/paginate/grid');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.table(selectedData);
  }
}
