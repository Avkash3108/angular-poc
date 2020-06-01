import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { Sort } from '../sort';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  sort: Sort = {
     sortBy: '',
     sortOrder: ''
  }

  constructor() {
  }
  private _sortSource = new BehaviorSubject(this.sort);
  currentSort$ = this._sortSource.asObservable();

  setSorting(sortBy: string) {
      if(this.sort.sortBy === sortBy) {
          this.sort.sortOrder = this.sort.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      } else {
          this.sort.sortBy = sortBy;
          this.sort.sortOrder = 'ASC';
      }
       this._sortSource.next(this.sort)
  }
isValid(value) {
    return value !== undefined && value !== null && value !== '';
};
  buildQueryString(queryObject) {
    const queryparams = Object.keys(queryObject);

    const query = queryparams.reduce((acc, param) => {
        return this.isValid(queryObject[param]) ? acc.concat(`${param}=${queryObject[param]}`) : acc;
    }, []);

    return query.length ? `?${query.join('&')}` : '';
};
}
