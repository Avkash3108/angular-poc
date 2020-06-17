import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingIndicatorService } from './loading-indicator.service';
import { QueryService } from './query.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private _pageLimite = 100;
private usersUrl = 'users';

  constructor(private queryService: QueryService, private http: HttpClient, private loadingIndicatorService: LoadingIndicatorService) { }

  deleteSelectedUsers(selectedUsers): Observable<{}> {
      const selectedUsersIds = selectedUsers.join(',');
      this.loadingIndicatorService.show();
      const ajaxCall = {
          url: `${this.usersUrl}/${selectedUsersIds}`,
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json'
          }
      };
      return ajax(ajaxCall);
  }
  getUsers(sort, search): Observable<User[]> {
      const queryObject = {
            _limit: this._pageLimite,
            _order: sort.sortOrder,
            _page: 1,
            _sort: sort.sortBy,
            q: search
        };

      const query = this.queryService.buildQueryString(queryObject);
      this.loadingIndicatorService.show();
      return this.http.get<User[]>(`${this.usersUrl}${query}`);
  }

  getUser(id): Observable<User> {
      const url = `${this.usersUrl}/${id}`;
      this.loadingIndicatorService.show();
      return this.http.get<User>(url);
  }

  addUser(user): Observable<{}> {
      const url = `${this.usersUrl}`;
      this.loadingIndicatorService.show();
      return this.http.post<User>(url, user);
  }

  updateUser(user): Observable<{}> {
      const url = `${this.usersUrl}/${user.id}`;
      this.loadingIndicatorService.show();
      return this.http.put<User>(url, user);
  }
}
