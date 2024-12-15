import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  post_url = environment.post_url;

  http = inject(HttpClient);

constructor(private userService: UserService) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.post_url);
  }

  addPost(post: any): Observable<Post> {
    const options = this.userService.authHeaders();
    return this.http.post<Post>(this.post_url, post, options);
  }
}
