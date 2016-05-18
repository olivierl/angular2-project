import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  private _baseUrl = 'http://jsonplaceholder.typicode.com/posts';
  
  constructor(private _http: Http) {
  }
  
  getPosts() {
    return this._http.get(this._baseUrl).map(res => res.json());
  }
  
  getPost(postId) {
    return this._http.get(this.getPostUrl(postId)).map(res => res.json());
  }
  
  private getPostUrl(postId){
		return this._baseUrl + '/' + postId;
	}
}