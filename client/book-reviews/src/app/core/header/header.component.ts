import { Component } from '@angular/core';
//import { tap } from 'rxjs'
import { AuthService } from 'src/app/auth-user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authService: AuthService) { }

  signOut() {
    this.authService.logOut()
  } 

}
