import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoadingIndicatorComponent } from './shared/loading-indicator/loading-indicator.component';
import { TableComponent } from './shared/table/table.component';
import { HeaderComponent } from './shared/table/header/header.component';
import { TableRowComponent } from './shared/table/table-row/table-row.component';
import { SortHeaderComponent } from './shared/table/sort-header/sort-header.component';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { PostsComponent } from './posts/posts.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { TableService } from './services/table.service';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    LoadingIndicatorComponent,
    TableComponent,
    HeaderComponent,
    TableRowComponent,
    SortHeaderComponent,
    StickyHeaderDirective,
    CheckboxComponent,
    UserFormComponent,
    AlertComponent,
    AlertsComponent,
    PostsComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
