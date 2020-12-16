import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminConnectionPageComponent } from './components/admin-connection-page/admin-connection-page.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [
    {
        path:'',
        component: AdminPageComponent,
        children:[
            {
                path:'connexion',
                component:AdminConnectionPageComponent
            },
            {
                path:'commandes',
                component:OrdersPageComponent,
                canActivate: [AuthGuardService]
            },
            {
                path:'produits',
                component:ProductPageComponent,
                canActivate: [AuthGuardService]
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule {}