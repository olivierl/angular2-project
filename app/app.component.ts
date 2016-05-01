import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {PostsComponent} from './posts/posts.component';

@RouteConfig([ 
    { path: '/', name: 'Home', component: HomeComponent }, 
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/posts', name: 'Posts', component: PostsComponent }, 
    { path: '/*other', name: 'Other', redirectTo: ['Home'] } 
]) 
@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .container {
            margin-top: 70px;
        }
    `]
    directives: [NavbarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent { }