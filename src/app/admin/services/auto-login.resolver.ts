import { Injectable, resolveForwardRef } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthAdminService } from './auth-admin.service';


@Injectable()
export class AutoLoginResolver implements Resolve<void> {

    constructor(private authAdminService: AuthAdminService){}
    
    resolve(){
        this.authAdminService.autoLogin();
    }
}