import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent implements OnInit {
  subscribeForm: FormGroup;
  error: string;
  success: string;
  loading = false;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      address: ['', []],
      city: ['', []],
      zipcode: ['', []],
      phone: ['', [Validators.required]],
    })
   }
   
  ngOnInit(): void {
  }


  signup(){
    if(this.subscribeForm.invalid){
      return;
    }
  this.authService.signup(this.subscribeForm.value).subscribe(result => {
      this.error = null;
      this.router.navigateByUrl('/connexion', { state: { success: result.message } });
    },
      (err) => {
        this.error = err.error.message;
        this.success = null;
    })
  }
}
