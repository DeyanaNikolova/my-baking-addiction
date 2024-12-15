import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../models/post.model';
import { AddPostComponent } from './add-post/add-post.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  post: Post | undefined;

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('Posts fetched successfully');
      },
      error: (error) => console.log('Error fetching post: ', error),
    });
  }

  openModal(post?: Post) {
    const modalRef = this.modalService.open(AddPostComponent);
    modalRef.componentInstance.post = post;
    modalRef.result
      .then((result) => {
        if (result) {
          this.createPost(result);
        }
      })
      .catch();
  }

  createPost(post: Post) {
    this.openModal(post);
  }

  
    fillForm(post: Post) {
      this.openModal(post);
    }
}
