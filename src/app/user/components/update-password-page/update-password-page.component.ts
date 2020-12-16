import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrls: ['./update-password-page.component.scss']
})
export class UpdatePasswordPageComponent implements OnInit {
  passwordForm: FormGroup;
  error: string;
  success: string
  loading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.passwordForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        checkPassword: ['', [Validators.required]],
      })
    }

  ngOnInit(): void {
  }


  updatePassword(){
    if(this.passwordForm.invalid){
      return;
    }
    this.authService.updatePassword(this.passwordForm.value, this.route.snapshot.paramMap.get('token')).subscribe(
      result => {
        this.success = result.message;
        this.error = null;
        this.router.navigateByUrl('/connexion', { state: { success: result.message } })
      },
      (err) => {
        this.error = err.error.message;
        this.success = null;
      }
    )
  }
}
