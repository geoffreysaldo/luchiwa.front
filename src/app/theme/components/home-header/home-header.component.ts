import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../user/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../user/models/user.model';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  isAuthenticated = false;
  names: string;
  private userSub: Subscription;
  constructor(

    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
      if(this.isAuthenticated){
        this.names = user.lastname + " " + user.firstname + " "
      } else {
        this.names = null;
      }
    })
  }

  logout(){

  }
}
