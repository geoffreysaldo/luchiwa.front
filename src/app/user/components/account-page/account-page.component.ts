import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../models/user-info.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  userInfo: UserInfo;
  accountForm: FormGroup;
  error: boolean;
  success: boolean;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder) {
      this.accountForm = this.fb.group({
        address: [{value:""}, [Validators.required]],
        city: [{value:""}, [Validators.required]],
        zipcode: [{value:""}, [Validators.required]],
        phone: [{value:""}, [Validators.required]],
        password: [{value:""}, [Validators.required]],
        checkPassword: [{value:""}, [Validators.required]],
      })
     }

  ngOnInit(): void {
    this.route.data.subscribe((data: {userInfo: UserInfo}) => this.userInfo= data.userInfo)
  }

  resetPassword(){
    this.authService.resetPassword().subscribe(result => {
      this.error = null;
      this.success = result.message
      this.loading = false;
    },
    (err) => {
      this.success = null
      this.error = err.error.message
      this.loading = false
    })
  }
}
