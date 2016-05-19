import {Component, OnInit} from 'angular2/core';

import {PostService} from './post.service';
import {UserService} from '../users/user.service';

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
    providers: [PostService, UserService],
    directives: [SpinnerComponent]
})
export class PostsComponent implements OnInit {
    posts = [];
    users = [];
    selectedPost;
    postsLoading;
    commentsLoading;

    constructor(private _postService: PostService, private _userService: UserService) {
    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }
    
    loadUsers() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }
    
    loadPosts(filter?) {
        this.postsLoading = true;
        this._postService.getPosts(filter)
            .subscribe(
                posts => this.posts = posts,
                null,
                () => this.postsLoading = false);
    }
    
    reloadPosts(filter){
        this.selectedPost = null;
        
        this.loadPosts(filter);
    }

    select(post) {
        this.selectedPost = post;
        this.commentsLoading = true;
        this._postService.getComments(post.id)
            .subscribe(
                comments => this.selectedPost.comments = comments,
                null,
                () => this.commentsLoading = false);
    }
}