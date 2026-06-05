import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {

    private key = 'invoiceDate';
  constructor(private http: HttpClient) {}

  saveInvoiceData(data: any)
  {
    const saveddata = sessionStorage.setItem(this.key, JSON.stringify(data));
  }
  updateInvoiceData(section : string, data: any)
  {
    const existingData = this.getInvoiceData();
    existingData[section] = data;
    sessionStorage.setItem(this.key, JSON.stringify(existingData));
  }
  getInvoiceData()
  {
    const data = sessionStorage.getItem(this.key);
    return data ? JSON.parse(data) :{};
  }
  clearInvoiceDate()
  {
    sessionStorage.removeItem(this.key);
  }


  saveCustomer(data: any)
  {
    return this.http.post("http://localhost:8080/billing/customer/addCustomer", data);
  }
}
