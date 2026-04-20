import { Component } from '@angular/core';
import { InvoiceDataService } from '../../services/invoice-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  customerDetails: any;
  productDetails: any[] = [];
    invoiceNumber: number = 1001;
  today: Date = new Date();
  

  constructor(private invoiceDataService: InvoiceDataService){}
  ngOnInit()
  {
    this.customerDetails = this.invoiceDataService.getInvoiceData().customerData;
    this.productDetails = this.invoiceDataService.getInvoiceData().productData?.products || [];
    
  }

  // receiveCustomer(data: any) {
  //   this.customerDetails = data;
  //   console.log("Customer:", data);
  // }

  // receiveProducts(data: any) {
  //   this.productDetails = data;
  //   console.log("Products:", data);
  // }

  // generateInvoice() {
  //   const invoice = {
  //     customer: this.customerDetails,
  //     products: this.productDetails
  //   };

    generatePdf() {
    console.log("Generate PDF clicked");
    console.log("Customer:", this.customerDetails);
    console.log("Products:", this.productDetails);
  }

  printInvoice() {
    window.print();
  }
}

