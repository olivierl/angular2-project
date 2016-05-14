import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';

import {BasicValidators} from '../shared/basic-validators';

@Component({
  selector: 'user-form',
  templateUrl: 'app/users/user-form.html'
})
export class UserFormComponent {
  form: ControlGroup;
  
  constructor(fb: FormBuilder) {
    this.form = fb.group({
			name: ['', Validators.required],
			email: ['', BasicValidators.email],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [],
				zipCode: []
			})
		});
  }
}