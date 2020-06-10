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
export class PostsComponent implements OnInit, OnDestroy {
  search = '';
  selectedRows = [];
  disableDelete = true;
  sort: Sort;
  cssClass = 'posts';
  posts: Post[];
  columnDefs = [
    {
      sortable: false,
      headerTitle: '',
      cssClass: 'table-select',
      key: 'selected',
      checkboxColumn: true,
      onChangeSelection: ($event) => {
        this.setSelectedPosts($event.target.checked, $event.target.value);
      }
  },
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
          onEdit: (id: any) => {this.router.navigateByUrl(`/post/${id}`);},
          onDelete: (id: any) => {this.deletePosts([id])}
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
        this.sort = sort
        this.getPosts();
    });
  }

  setDeleteButton() {
    this.disableDelete = !this.posts.some((post) =>{
      return post.selected
    });
   }
  getPosts(): void {
      this.postService.getPosts(this.sort, this.search).subscribe(posts => {
         this.loadingIndicatorService.hide();
         this.posts = posts.map((post) => {
          post.selected = false;
          return post;
        });
      });
  }

  deletePosts(selectedPosts) {
      this.postService.deleteSelectedPosts(selectedPosts).subscribe(response => {
        this.loadingIndicatorService.hide();
        this.posts = this.posts.filter((post) => {
            return selectedPosts.indexOf(post.id) === -1;
        });
        this.setDeleteButton();
        const alert = new Alert();
        alert.autoClose = false;
        alert.id = 'RECORDS_DELETED';
        alert.message = `${selectedPosts.length} record(s) has been deleted.`;
        this.alertService.showAlert(alert);

    });
  }
  deleteSelectedPosts() {
    const selectedPosts = this.posts.reduce((acc, post) => {
      if(post.selected) {
        acc.push(post.id)
      }
      return acc;
    }, []);
    this.deletePosts(selectedPosts);
  }

  setSelectedPosts(checked, id): void {
    const post = this.posts.find((post) => {
      return post.id.toString() === id;
    });
    post ? post.selected = checked : '';
    this.setDeleteButton();
   }
  onSearch(searchVal) {
    this.getPosts();
  }
  ngOnDestroy() {

}
}

