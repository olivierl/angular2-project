import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private _baseUrl = 'http://jsonplaceholder.typicode.com/users';

  constructor(private _http: Http) {
  }

  getUsers() {
    return this._http.get(this._baseUrl).map(res => res.json());
  }
  
  getUser(id) {
    return this._http.get(this._baseUrl + '/' + id).map(res => res.json());
  }
  
  addUser(user) {
    return this._http.post(this._baseUrl, JSON.stringify(user)).map(res => res.json());
  }
}