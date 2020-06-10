import { Component, OnInit, Input } from '@angular/core';

import { TableService } from '../../../services/table.service';
@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['../header/header.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() columnDefs: [];
  @Input() item: any;


  ngOnInit(): void {
  }
  constructor(private tableService: TableService) {}
}
