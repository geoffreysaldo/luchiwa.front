import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {
  emailForm: FormGroup;
  error: string;
  success: string
  loading: boolean;

  constructor(
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.emailForm = this.formBuilder.group({
        email: ['', [Validators.required]],
      })
    }

    
  ngOnInit(): void {
  }


  forgetPassword(){
    if(this.emailForm.invalid){
      return
    }
    this.authService.forgetPassword(this.emailForm.value).subscribe(result => {
      this.error = null;
      this.success = result.message
      this.loading = false;
    },
    (err) => {
      this.success = null
      this.error = err.error.message
      this.loading = false
    });
  }
}
