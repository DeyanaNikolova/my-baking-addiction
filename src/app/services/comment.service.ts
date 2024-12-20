import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  comment_url = environment.comment_url;

  http = inject(HttpClient);

  constructor(private userService: UserService) {}

  getCommentsRelation(recipeId: string): Observable<Comment[]> {
    const query = encodeURIComponent(`recipeId="${recipeId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    return this.http.get<Comment[]>(
      `${this.comment_url}?where=${query}&load=${relationQuery}`
    );
  }

  getAllCommentsByRecipeId(recipeId: string): Observable<Comment[]> {
    const query = encodeURIComponent(`recipeId="${recipeId}"`);
    return this.http.get<Comment[]>(
      `${this.comment_url}?where=${query}`
    );
  }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.comment_url);
  }

  addComment(recipeId: string, comment: string): Observable<Comment> {
    const options = this.userService.authHeaders();
    return this.http.post<Comment>(
      this.comment_url,
      { 
        body: comment,
        recipeId,
        username: this.userService.user?.username
       },
      options
    );
  }
}
