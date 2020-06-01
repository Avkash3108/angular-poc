import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoadingIndicatorComponent } from './shared/loading-indicator/loading-indicator.component';
import { TableComponent } from './shared/table/table.component';
import { HeaderComponent } from './shared/table/header/header.component';
import { TableRowComponent } from './shared/table/table-row/table-row.component';
import { SortHeaderComponent } from './shared/table/sort-header/sort-header.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    LoadingIndicatorComponent,
    TableComponent,
    HeaderComponent,
    TableRowComponent,
    SortHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
