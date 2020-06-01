import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['../header/header.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() columnDefs: [];
  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

}
