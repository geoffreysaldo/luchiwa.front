import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConnectionPageComponent } from './components/connection-page/connection-page.component';
import { InscriptionPageComponent } from './components/inscription-page/inscription-page.component';
import { ValidationPageComponent } from './components/validation-page/validation-page.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { UpdatePasswordPageComponent} from './components/update-password-page/update-password-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AccountResolver } from './services/account.resolver';

const routes: Routes = [
    {
        path:'',
        component: HomePageComponent,
        children:[
            {
                path:'connexion',
                component: ConnectionPageComponent,
            },
            {
                path:'inscription',
                component: InscriptionPageComponent,
            },
            {
                path:'validation/:token',
                component: ValidationPageComponent,
            },
            {
                path:'oublie_mdp',
                component: ForgetPasswordPageComponent,
            },
            {
                path:'update_password/:token',
                component: UpdatePasswordPageComponent,
            },
            {
                path:'account',
                component: AccountPageComponent,
                resolve: {
                    userInfo: AccountResolver
                }
            }
        ]
    },


]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[AccountResolver]
})

export class HomeRoutingModule {}