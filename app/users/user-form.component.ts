import {Component, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {Router, RouteParams, CanDeactivate} from 'angular2/router';

import {BasicValidators} from '../shared/basic-validators';
import {UserService} from './user.service';
import {User} from './user';

@Component({
  selector: 'user-form',
  templateUrl: 'app/users/user-form.html',
	providers: [UserService]
})
export class UserFormComponent implements OnInit, CanDeactivate {
  form: ControlGroup;
	title: string;
	user = new User();

  constructor(fb: FormBuilder,
							private _userService: UserService,
							private _router: Router,
							private _routeParams: RouteParams) {
    this.form = fb.group({
			name: ['', Validators.required],
			email: ['', BasicValidators.email],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});
  }
	
	ngOnInit() {
		var userId = this._routeParams.get('id');
		
		this.title = userId ? 'Edit User' : 'New User';
		
		if(!userId) {
			return;
		}
		
		this._userService.getUser(this._routeParams.get('id'))
				.subscribe(
					u => this.user = u,
					response => {
						if(response.status == 404) {
							this._router.navigate(['NotFound']);
						}
					});
	}

	routerCanDeactivate() {
		if (this.form.dirty) {
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		}
		return true;
	}

	save() {
		var result;
		
		if(this.user.id) {
			result = this._userService.updateUser(this.user);
		}
		else {
			result = this._userService.addUser(this.user)
		}
		
		result.subscribe(x => {
			// Ideally, here we'd want:
			// this.form.markAsPristine();
			this._router.navigate(['Users']);
		});
	}
}