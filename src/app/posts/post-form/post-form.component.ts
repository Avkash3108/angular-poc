import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../../post';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../alert';
import { PostService } from '../../services/post.service';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post: Post = {
    id: 0,
    title: '',
    description: '',
    ownerId: '',
    category: ''
 };
 isNew = true;
 postForm = this.postFormBuilder.group({
    title: [this.post.title, Validators.required],
    description: [this.post.description, Validators.required],
    category: [this.post.category, Validators.required]
  });
  constructor(
    private alertService: AlertService,
    private postService: PostService,
    private postFormBuilder: FormBuilder,
    private loadingIndicatorService: LoadingIndicatorService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
      this.getPost();
  }
onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    this.isNew ? this.addPost() : this.updatePost();
}

addPost() {
    this.postService.addPost(this.postForm.value).subscribe(users => {
         console.log('ADD post');
         this.loadingIndicatorService.hide();
         this.postForm.reset();
         const alert = new Alert();
         alert.id = 'ADD_POST';
         alert.message = `Post has been added successfully.`;
         this.alertService.showAlert(alert);
    });
}

updatePost() {
    this.postService.updatePost({...this.post, ...this.postForm.value}).subscribe(users => {
         this.loadingIndicatorService.hide();
         const alert = new Alert();
         alert.id = 'POST_UPDATE';
         alert.message = `Post has been update successfully.`;
         this.alertService.showAlert(alert);
    });
}

getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
       this.postService.getPost(id)
      .subscribe(post => {
          this.loadingIndicatorService.hide();
          this.isNew = false;
          this.post = post;
          const {id, ownerId, ...loadedPost} = this.post;
          this.postForm.setValue(loadedPost);
      });
    }
  }
}
