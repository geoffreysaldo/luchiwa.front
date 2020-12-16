import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthAdminService } from '../../services/auth-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-connection-page',
  templateUrl: './admin-connection-page.component.html',
  styleUrls: ['./admin-connection-page.component.scss']
})
export class AdminConnectionPageComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  loading = false;
  constructor(
    private authAdminService: AuthAdminService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
   }

  ngOnInit(): void {

  }

  login() {
    if(this.loginForm.invalid){
      this.error = "Veuillez remplir correctement les champs de connexion"
    }
    this.loading = true
    this.authAdminService.login(this.loginForm.value).subscribe(
      token => {
        this.error = null;
        this.loading = false;
        this.router.navigate(['/admin/commandes']);
    },
      (err) => {
        switch (err.status){
          case 401:
            this.error = "Veuillez vérifier votre email et mot de passe"
            this.loading = false
            break;
        }
      }
    )
    }

}
