import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { Sort } from '../sort';

@Injectable()
export class TableService {

  sort: Sort = {
     sortBy: '',
     sortOrder: ''
  };

  constructor() {
  }
  private sortSubject = new BehaviorSubject(this.sort);
  private sortObservable$ = this.sortSubject.asObservable();

  getSort() {
      return this.sortObservable$;
  }

  setSorting(sortBy: string) {
      if (this.sort.sortBy === sortBy) {
          this.sort.sortOrder = this.sort.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
          this.sort.sortBy = sortBy;
          this.sort.sortOrder = 'ASC';
      }
      this.sortSubject.next(this.sort);
  }

   resetSort() {
       this.sort = {
           sortBy: '',
           sortOrder: ''
       };
   }
}
