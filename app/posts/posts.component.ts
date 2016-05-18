import {Component, OnInit} from 'angular2/core';

import {PostService} from './post.service';
import {SpinnerComponent} from '../shared/spinner.component';

@Component({
    selector: 'posts',
    templateUrl: 'app/posts/posts.html',
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
    `],
    providers: [PostService],
    directives: [SpinnerComponent]
})
export class PostsComponent implements OnInit {
    posts = [];
    selectedPost;
    isLoading = true;

    constructor(private _postService: PostService) {
    }

    ngOnInit() {
        this._postService.getPosts()
            .subscribe(posts => this.posts = posts,
            null,
            () => this.isLoading = false);
    }
    
    select(post) {
        this.selectedPost = post;
    }
}