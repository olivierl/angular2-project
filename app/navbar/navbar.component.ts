import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

@Component({
  selector: 'navbar',
  templateUrl: 'app/navbar/navbar.html',
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {
  constructor(private _router: Router){
  }
 
  isCurrentRoute(route){
    var instruction = this._router.generate(route);
    return this._router.isRouteActive(instruction);
  }
}