import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { TableService } from '../services/table.service';
import { User } from '../user';
import { Sort } from '../sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  sort: Sort
  cssClass="users"
  users: User[];
  columnDefs = [
      {
          sortable: true,
          headerTitle: 'User Id',
          cssClass: 'id',
          key: 'id'
      },
      {
          sortable: true,
          headerTitle: 'First Name',
          cssClass: 'first-name',
          key: 'firstName'
      },
      {
          sortable: true,
          headerTitle: 'Last Name',
          cssClass: 'last-name',
          key: 'lastName'
      },
      {
          sortable: true,
          headerTitle: 'Contact',
          cssClass: 'contact',
          key: 'contact'
      }
  ];

  constructor(private tableService: TableService, private userService: UserService,  private loadingIndicatorService: LoadingIndicatorService) { }

  ngOnInit() {
    this.tableService.currentSort$.subscribe(sort => {
        this.sort = sort;
        this.getUsers();
      });
      this.getUsers();
  }

  getUsers(): void {
      console.log(this.sort);
      this.userService.getUsers(this.sort).subscribe(users => {
         this.loadingIndicatorService.hide();
         this.users = users
      });
  }
}
