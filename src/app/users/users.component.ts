import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { TableService } from '../services/table.service';
import { AlertService } from '../services/alert.service';
import { User } from '../user';
import { Sort } from '../sort';
import { Alert } from '../alert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [TableService]
})
export class UsersComponent implements OnInit {
  search = '';
  selectedRows = [];
  disableDelete = true;
  sort: Sort;
  cssClass = 'users';
  users: User[];
  columnDefs = [
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
      },
      {
          hasAction: true,
          sortable: false,
          headerTitle: 'Actions',
          cssClass: 'table-actions',
          onEdit: (id) => {this.router.navigateByUrl(`/user/${id}`); }
      }
  ];

  constructor(
      private tableService: TableService,
      private userService: UserService,
      private loadingIndicatorService: LoadingIndicatorService,
      private alertService: AlertService,
      private router: Router

  ) { }

  ngOnInit() {
    this.tableService.getSort().subscribe(sort => {
        this.sort = sort;
        this.getUsers();
    });
    this.tableService.getSelectedRows().subscribe(selectedUsers => {
        this.setSelectedUsers(selectedUsers);
    });

    // this.getUsers();
  }

  getUsers(): void {
      this.userService.getUsers(this.sort, this.search).subscribe(users => {
         this.loadingIndicatorService.hide();
         this.users = users;
      });
  }

  deleteSelectedUsers() {
      this.userService.deleteSelectedUsers(this.selectedRows).subscribe(response => {
        this.loadingIndicatorService.hide();
        this.users = this.users.filter((user) => {
            return this.selectedRows.indexOf(user.id.toString()) === -1;
        });
        const alert = new Alert();
        alert.id = 'RECORDS_DELETED';
        alert.message = `${this.selectedRows.length} record(s) has been deleted.`;
        this.alertService.showAlert(alert);
        this.tableService.clearSelectedRows();

    });
  }

 setSelectedUsers(selectedRows): void {
  this.selectedRows = Object.keys(selectedRows).reduce((acc, selectedRowId) => {
        const selectedRow = selectedRows[selectedRowId];
        if (selectedRow && acc.indexOf(selectedRowId) === -1) {
            acc.push(selectedRowId);
        }
        return acc;
    }, []);
  }
  onSearch(searchVal) {
    this.getUsers();
  }
  ngOnDestroy() {

  }
}
