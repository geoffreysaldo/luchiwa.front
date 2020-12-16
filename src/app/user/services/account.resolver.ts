import {Injectable} from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.interface';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AccountResolver implements Resolve<UserInfo>{
    constructor(private authService: AuthService){}

    resolve(): Observable<UserInfo>{
        return this.authService.getUserInfo().pipe(take(1))
    }
}