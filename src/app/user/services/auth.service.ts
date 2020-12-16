import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { UserInfo } from '../models/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any;


  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  signup(signupform): Observable<any>{
    return this.httpClient.post<any>("http://localhost:3000/auth/signup", signupform);
  }

  login(loginForm): Observable<any>{
    return this.httpClient.post<any>("http://localhost:3000/auth/signin", loginForm).pipe(
      tap(resData => {
        const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
        const user = new User(resData.lastname, resData.firstname, resData.email, resData.id, resData.accessToken, expirationDate);
        this.user.next(user);
        //this.autoLogout(resData.expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
      })
    );;
  }

  getUserInfo(): Observable<UserInfo>{
    return this.httpClient.get<UserInfo>("http://localhost:3000/auth/user_info")
  }

  forgetPassword(email): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/auth/update_password/forget", email);
  }

  resetPassword(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:3000/auth/update_password/")
  }

  updatePassword(passwordForm, secretToken: string): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/auth/update_password/" + secretToken, passwordForm);
  }

  autoLogin(){
    const userData: {
      lastname: string,
      firstname: string,
      email: string,
      id: string,
      _accesstoken: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedAdmin = new User(userData.lastname, userData.firstname,userData.email, userData.id, userData._accesstoken, new Date(userData._tokenExpirationDate))

    if(loadedAdmin.token){
      this.user.next(loadedAdmin);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  validate(token): Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/auth/validate/" + token)
  }
  
  logout(){
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["presentation"])
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
