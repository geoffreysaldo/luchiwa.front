import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdminService } from './auth-admin.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
    constructor(private authAdminService: AuthAdminService, private router: Router){}

    canActivate(
        route:ActivatedRouteSnapshot,
        router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
            this.authAdminService.autoLogin();
            return this.authAdminService.admin.pipe(map(admin => {
                take(1);
                const isAuth = !!admin;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/admin/connexion']);
            }))
    }

}