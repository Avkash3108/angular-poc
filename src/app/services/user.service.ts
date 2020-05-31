import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private usersUrl = 'users';

  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.usersUrl)
  }
}
