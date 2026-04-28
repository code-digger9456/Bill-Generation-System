import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from './billing-details/customer-details/customer-details.component';
import { ProductDetailsComponent } from './billing-details/product-details/product-details.component';
import { InvoiceComponent } from './billing-details/invoice/invoice.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';

export const routes: Routes = [
    {path:'', redirectTo:'loginng s', pathMatch:'prefix'},
     { path: 'login',   component: LoginPageComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'customer_details',   component: CustomerDetailsComponent },
    { path: 'product_details',   component: ProductDetailsComponent },
    { path: 'invoice', component: InvoiceComponent },
    // { path: '**',   component: CustomerDetailsComponent }

];
