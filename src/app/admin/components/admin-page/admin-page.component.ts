import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../../services/auth-admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private authAdminService: AuthAdminService) { }

  ngOnInit(): void {
    this.authAdminService.autoLogin();
  }

}
