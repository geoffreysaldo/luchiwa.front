import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Admin } from '../models/admin.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  admin = new BehaviorSubject<Admin>(null)
  private tokenExpirationTimer: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }

  login(authForm): Observable<any>{
    return this.httpClient.post<any>(
      "http://localhost:3000/auth-admin/signin",
       authForm
       ).pipe(
         tap(resData => {
           const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
           const admin = new Admin(resData.email, resData.id, resData.accessToken, expirationDate);
           this.admin.next(admin);
           this.autoLogout(resData.expiresIn * 1000)
           localStorage.setItem('adminData', JSON.stringify(admin))
         })
       );
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _accesstoken: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('adminData'));
    if(!userData){
      return;
    }

    const loadedAdmin = new Admin(userData.email, userData.id, userData._accesstoken, new Date(userData._tokenExpirationDate))

    if(loadedAdmin.token){
      this.admin.next(loadedAdmin);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }


  logout(){
    this.admin.next(null);
    localStorage.removeItem("adminData");
    this.router.navigate(["admin/connexion"])
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }
}
