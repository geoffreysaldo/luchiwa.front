import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuardService } from './admin/services/auth-guard.service';

const routes: Routes = [
    {
        path:'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path:'',
        loadChildren: () => import('./user/home.module').then(m => m.HomeModule)
    }

]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}