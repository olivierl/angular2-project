import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  private _baseUrl = 'http://jsonplaceholder.typicode.com/posts';
  
  constructor(private _http: Http) {
  }
  
  getPosts(filter?) {
    var url = this._baseUrl;
        
    if (filter && filter.userId)
        url += `?userId=${filter.userId}`;
        
    return this._http.get(url).map(res => res.json());
  }
  
  getComments(postId){
		return this._http.get(this._baseUrl + '/' + postId + '/comments')
			.map(res => res.json());
	}
}