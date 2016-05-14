import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {Router, CanDeactivate} from 'angular2/router';

import {BasicValidators} from '../shared/basic-validators';
import {UserService} from './user.service';
import {User} from './user';

@Component({
  selector: 'user-form',
  templateUrl: 'app/users/user-form.html',
	providers: [UserService]
})
export class UserFormComponent implements CanDeactivate {
  form: ControlGroup;
	user = new User();

  constructor(fb: FormBuilder,
							private _userService: UserService,
							private _router: Router) {
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

	routerCanDeactivate() {
		if (this.form.dirty) {
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		}
		return true;
	}

	save() {
		var result = this._userService.addUser(this.user)
		result.subscribe(x => {
			// Ideally, here we'd want:
			// this.form.markAsPristine();
			this._router.navigate(['Users']);
		});
	}
}