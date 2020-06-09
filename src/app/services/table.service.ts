import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { Sort } from '../sort';

@Injectable()
export class TableService {

  sort: Sort = {
     sortBy: '',
     sortOrder: ''
  };

  selectedRows = {};
  constructor() {
  }
  private _sortSubject = new BehaviorSubject(this.sort);
  private _sortObservable$ = this._sortSubject.asObservable();
  private _selectedRowsSubject = new BehaviorSubject(this.selectedRows);
  private _selectedRowsObservable$ = this._selectedRowsSubject.asObservable();

  getSort() {
      return this._sortObservable$;
  }

  getSelectedRows() {
      return this._selectedRowsObservable$;
  }

  setSorting(sortBy: string) {
      if (this.sort.sortBy === sortBy) {
          this.sort.sortOrder = this.sort.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
          this.sort.sortBy = sortBy;
          this.sort.sortOrder = 'ASC';
      }
      this._sortSubject.next(this.sort);
  }

   resetSort() {
       this.sort = {
           sortBy: '',
           sortOrder: ''
       };
   }
  clearSelectedRows() {
      this.selectedRows = {};
      this._selectedRowsSubject.next(this.selectedRows);
  }
  setSelectedRows(selected, value) {
       this.selectedRows = {
           ...this.selectedRows,
           ...{[`${value}`]: selected}

       };
       this._selectedRowsSubject.next(this.selectedRows);
  }

isValid(value) {
    return value !== undefined && value !== null && value !== '';
}
  buildQueryString(queryObject) {
    const queryparams = Object.keys(queryObject);

    const query = queryparams.reduce((acc, param) => {
        return this.isValid(queryObject[param]) ? acc.concat(`${param}=${queryObject[param]}`) : acc;
    }, []);

    return query.length ? `?${query.join('&')}` : '';
}
}
