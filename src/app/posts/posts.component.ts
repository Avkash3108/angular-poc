import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { TableService } from '../services/table.service';
import { AlertService } from '../services/alert.service';
import { Post } from '../post';
import { Sort } from '../sort';
import { Alert } from '../alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [TableService]
})
export class PostsComponent implements OnInit {
  search = '';
  selectedRows = [];
  disableDelete = true;
  sort: Sort;
  cssClass = 'posts';
  posts: Post[];
  columnDefs = [
      {
          sortable: true,
          headerTitle: 'Post Id',
          cssClass: 'id',
          key: 'id'
      },
      {
          sortable: true,
          headerTitle: 'Title',
          cssClass: 'post-title',
          key: 'title'
      },
      {
          sortable: true,
          headerTitle: 'Category',
          cssClass: 'post-category',
          key: 'category'
      },
      {
          sortable: true,
          headerTitle: 'Owner',
          cssClass: 'post-owner',
          key: 'ownerId'
      },
     {
          hasAction: true,
          sortable: false,
          headerTitle: 'Actions',
          cssClass: 'table-actions',
          onEdit: (id: any) => {this.router.navigateByUrl(`/post/${id}`); }
      }
  ];

  constructor(
      private tableService: TableService,
      private postService: PostService,
      private loadingIndicatorService: LoadingIndicatorService,
      private alertService: AlertService,
      private router: Router
  ) { }

  ngOnInit() {

    this.tableService.getSort().subscribe(sort => {
        this.sort = sort;
        this.getPosts();
    });
    this.tableService.getSelectedRows().subscribe(selectedPosts => {
        this.setSelectedPosts(selectedPosts);
    });

    // this.getPosts();
  }

  getPosts(): void {
      this.postService.getPosts(this.sort, this.search).subscribe(posts => {
         this.loadingIndicatorService.hide();
         this.posts = posts;
      });
  }

  deleteSelectedPosts() {
      this.postService.deleteSelectedPosts(this.selectedRows).subscribe(response => {
        this.loadingIndicatorService.hide();
        this.posts = this.posts.filter((post) => {
            return this.selectedRows.indexOf(post.id.toString()) === -1;
        });
        const alert = new Alert();
        alert.autoClose = false;
        alert.id = 'RECORDS_DELETED';
        alert.message = `${this.selectedRows.length} record(s) has been deleted.`;
        this.alertService.showAlert(alert);
        this.tableService.clearSelectedRows();

    });
  }

 setSelectedPosts(selectedRows): void {
  this.selectedRows = Object.keys(selectedRows).reduce((acc, selectedRowId) => {
        const selectedRow = selectedRows[selectedRowId];
        if (selectedRow && acc.indexOf(selectedRowId) === -1) {
            acc.push(selectedRowId);
        }
        return acc;
    }, []);
  }
  onSearch(searchVal) {
    this.getPosts();
  }
  ngOnDestroy() {

}
}

