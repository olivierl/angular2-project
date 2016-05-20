import {Component, Input} from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <i *ngIf="visible" class="fa fa-refresh fa-spin fa-2x"></i>
  `
})
export class SpinnerComponent {
  @Input() visible = true;
}