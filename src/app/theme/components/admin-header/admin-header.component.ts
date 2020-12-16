import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../../../admin/services/auth-admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  isAuthenticated = false;
  private adminSub: Subscription;
  constructor(private authAdminService: AuthAdminService) { }

  ngOnInit(): void {
    this.adminSub = this.authAdminService.admin.subscribe(admin =>
      { 
        this.isAuthenticated = !!admin 
      }
      )
  }


  logout(){
    this.authAdminService.logout()
  }

}
