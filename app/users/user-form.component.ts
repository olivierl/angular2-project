import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup} from 'angular2/common';

@Component({
  selector: 'user-form',
  templateUrl: 'app/users/user-form.html'
})
export class UserFormComponent {
  form: ControlGroup;
  
  constructor(fb: FormBuilder) {
    this.form = fb.group({
			name: [],
			email: [],
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