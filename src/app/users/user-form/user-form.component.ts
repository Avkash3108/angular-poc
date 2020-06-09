import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alert } from '../../alert';
import { AlertService } from '../../services/alert.service';
import { User } from '../../user';
import { UserService } from '../../services/user.service';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
 user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    contact: ''
 };
 isNew = true;
 userForm = this.userFormBuilder.group({
    firstName: [this.user.firstName, Validators.required],
    lastName: [this.user.lastName, Validators.required],
    address: [this.user.address, Validators.required],
    email: [this.user.email, [Validators.required, Validators.email]],
    contact: [this.user.contact, Validators.required],
  });
  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private userFormBuilder: FormBuilder,
    private loadingIndicatorService: LoadingIndicatorService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
      this.getUser();
  }
onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.isNew ? this.addUser() : this.updateUser();
}

addUser() {
    this.userService.addUser(this.userForm.value).subscribe(users => {
         this.loadingIndicatorService.hide();
         this.userForm.reset();
         const alert = new Alert();
         alert.id = 'ADD_USER';
         alert.message = `New User has been added successfully.`;
         this.alertService.showAlert(alert);
    });
}

updateUser() {
    this.userService.updateUser({...this.userForm.value, id: this.user.id}).subscribe(users => {
         console.log('UPDATIN');
         this.loadingIndicatorService.hide();
         const alert = new Alert();
         alert.id = 'USER_UPDATE';
         alert.message = `User has been update successfully.`;
         this.alertService.showAlert(alert);
    });
}

    getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
       this.userService.getUser(id)
      .subscribe(user => {
          this.loadingIndicatorService.hide();
          this.isNew = false;
          this.user = user;
          const {id, ...loadedUser} = this.user;
          this.userForm.setValue(loadedUser);
      });
    }
  }
}
