import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceDataService } from '../../services/invoice-data.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent  {
  customerForm : FormGroup;
 stateList: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];
  constructor( private formBuilder: FormBuilder, private router: Router,  private invoiceService: InvoiceDataService) {
     this.customerForm = this.formBuilder.group({
      customerName:['',Validators.required],
      customerAddress:['',Validators.required],
      customerGSTIN: [''],
      customerState:['',Validators.required],
      customerStateCode:['',[Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit():void {
    const saveData = this.invoiceService.getInvoiceData();
    if(saveData.customerData)
    {
      this.customerForm.patchValue(saveData.customerData);
    }

    this.customerForm.valueChanges.subscribe(value => { 
      this.invoiceService.updateInvoiceData('customerData', value);
    });
  }


 onSubmit()
  {
    if(this.customerForm.valid)
    {
      // this.invoiceService.setCustomer(this.customerForm.value);
      this.router.navigate(['/product_details']);
      console.log(this.customerForm.valid);
    }
    else
    {
      console.log(this.customerForm.valid);
    }
    
  }
}
