import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingIndicatorService } from './loading-indicator.service';
import { TableService } from './table.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private usersUrl = 'users';

  constructor(private tableService: TableService, private http: HttpClient, private loadingIndicatorService: LoadingIndicatorService) { }

  getUsers(sort): Observable<User[]> {
      const queryObject = {
            '_limit': 100,
            '_order': sort.sortOrder,
            '_page': 1,
            '_sort': sort.sortBy,
        };
      const query = this.tableService.buildQueryString(queryObject);
      this.loadingIndicatorService.show();
      return this.http.get<User[]>(`${this.usersUrl}${query}`)
  }

  getUser(id): Observable<User> {
      const url = `${this.usersUrl}/${id}`;
      this.loadingIndicatorService.show();
      return this.http.get<User>(url)
  }
}
