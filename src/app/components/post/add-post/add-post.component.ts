import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  titleCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(35),
  ]);
  textCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  authorCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(35),
  ]);

  postForm = new FormGroup({
    title: this.titleCtrl,
    text: this.textCtrl,
    author: this.authorCtrl,
  });

  @Input() post: any;

  submit() {
    if (this.postForm.invalid) {
      return;
    }

    const recipeId = this.activatedRoute.snapshot.params['recipeId']
    this.postService.addPost(this.postForm.value).subscribe({
      next: (post) => {
        this.post = post;
        this.postService.getPosts();
        this.router.navigate(['/recipes/' + recipeId]);
      },
      error: (error) => {
        console.error(`Error: ${error}`);
      },
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
