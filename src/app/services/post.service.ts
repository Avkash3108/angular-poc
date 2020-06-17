import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingIndicatorService } from './loading-indicator.service';
import { QueryService } from './query.service';
import { Post } from '../post';

@Injectable({
  providedIn: 'root' 
})
export class PostService {
  private _pageLimite = 100;
  private postUrl = 'posts';

  constructor(private queryService: QueryService, private http: HttpClient, private loadingIndicatorService: LoadingIndicatorService) { }

  deleteSelectedPosts(selectedPosts): Observable<{}> {
      const selectedPostsIds = selectedPosts.join(',');
      this.loadingIndicatorService.show();
      const ajaxCall = {
          url: `${this.postUrl}/${selectedPostsIds}`,
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json'
          }
      };
      return ajax(ajaxCall);
  }
  getPosts(sort, search: string): Observable<Post[]> {
      const queryObject = {
            _limit: this._pageLimite,
            _order: sort.sortOrder,
            _page: 1,
            _sort: sort.sortBy,
            q: search
        };
      const query = this.queryService.buildQueryString(queryObject);
      this.loadingIndicatorService.show();
      return this.http.get<Post[]>(`${this.postUrl}${query}`);
  }

  getPost(id): Observable<Post> {
      const url = `${this.postUrl}/${id}`;
      this.loadingIndicatorService.show();
      return this.http.get<Post>(url);
  }

  addPost(post): Observable<{}> {
      const url = `${this.postUrl}`;
      this.loadingIndicatorService.show();
      return this.http.post<Post>(url, post);
  }

  updatePost(post): Observable<{}> {
      const url = `${this.postUrl}/${post.id}`;
      this.loadingIndicatorService.show();
      return this.http.put<Post>(url, post);
  }
}
