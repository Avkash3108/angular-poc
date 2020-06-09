import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {

  @Input() sortBy: string;
  sortOrder = '';
  constructor(public tableService: TableService) { }

  ngOnInit(): void {
        this.tableService.getSort().subscribe(sort => {
         this.sortOrder = sort.sortBy === this.sortBy ? sort.sortOrder : '';
      });
  }

  setSorting() {
      this.tableService.setSorting(this.sortBy);
  }

}
