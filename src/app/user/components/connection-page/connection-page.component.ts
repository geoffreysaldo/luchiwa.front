import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.scss']
})
export class ConnectionPageComponent implements OnInit {
  success: string;
  loginForm: FormGroup;
  error: string;
  loading = false;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.success = window.history.state.success;
    })
  }


  login() {
    if(this.loginForm.invalid){
      this.error = "Veuillez remplir correctement les champs de connexion"
    }
    this.loading = true
    this.authService.login(this.loginForm.value).subscribe(
      token => {
        this.error = null;
        this.loading = false;
        this.router.navigate(['/']);
    },
      (err) => {
        console.log(err)
        switch (err.status){
          case 401:
            this.error = err.error.message
            this.loading = false
            break;
          case 400:
            this.error = err.error.message[0]
            this.loading = false
        }
      }
    )
    }
}
