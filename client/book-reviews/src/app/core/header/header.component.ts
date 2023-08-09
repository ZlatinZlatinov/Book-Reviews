import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string | undefined = 'a'
  constructor(public authService: AuthService) {
    authService.user.subscribe((u) => this.username = u?.username);
  }

  signOut(){
    this.authService.logOut()
  }
}
