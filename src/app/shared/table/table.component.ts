import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() cssClass: string;
  @Input() columnDefs: [];
  @Input() data: any;

  getTableData(): [] {
      return;
  }
  constructor() { }

  ngOnInit(): void {
  }
}
