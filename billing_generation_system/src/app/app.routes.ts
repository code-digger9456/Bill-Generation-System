import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from './billing-details/customer-details/customer-details.component';
import { ProductDetailsComponent } from './billing-details/product-details/product-details.component';
import { InvoiceComponent } from './billing-details/invoice/invoice.component';

export const routes: Routes = [
    {path:'', redirectTo:'customer_details', pathMatch:'prefix'},
    { path: 'customer_details',   component: CustomerDetailsComponent },
    { path: 'product_details',   component: ProductDetailsComponent },
    { path: 'invoice', component: InvoiceComponent },
    // { path: '**',   component: CustomerDetailsComponent }

];
