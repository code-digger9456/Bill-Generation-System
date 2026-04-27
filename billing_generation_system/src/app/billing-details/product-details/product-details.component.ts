import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InvoiceDataService } from '../../services/invoice-data.service';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatTableModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatAutocompleteModule  
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

// Columns for mat-table
  displayedColumns: string[] = ['sno', 'productName', 'quantity', 'amount', 'total_amount', 'action'];

  // Dropdown Data
  //  productList: string[] = [];
  productList: any[] = [];
  quantityList: number[] = [1,2,3,4,5,6,7,8,9,10];
  @ViewChild(MatTable) table!: MatTable<any>;
  productForm: FormGroup;
  // filteredOptions: Observable<string[]>;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceDataService,  private router: Router,  private productService:ProductService) {

    this.productForm = this.fb.group({
      products: this.fb.array([])
    });
    
    // Add first row automatically
    // this.addProduct();
  }

// filterProducts(value: string): string[] {
//   const filterValue = (value || '').toLowerCase();

//   return this.productList.filter(option =>
//     option.toLowerCase().includes(filterValue)
//   );
// }

filterProducts(value: string): any[] {
  const filterValue = (value || '').toLowerCase();

  return this.productList.filter(p =>
    p.productName.toLowerCase().includes(filterValue)
  );
}

setProductData(product: any, index: number) {
  const group = this.products.at(index) as FormGroup;

  group.patchValue({
    productName: product.productName,
    amount: product.productPrice
  });
}

getProductControl(index: number) {
  return this.products.at(index).get('productName');
}
  
   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productList.filter(option => option.toLowerCase().includes(filterValue));
  }

  
  ngOnInit(): void{

  // this.productService.getAllProducts().subscribe(res => {
  // this.productList = res.map((p: any) => p.productName);
  // });

  this.productService.getAllProducts().subscribe(res => {
  this.productList = res; // store full object
});

    const saveData = this.invoiceService.getInvoiceData();
    if(saveData?.productData?.products)
    {
      saveData.productData.products.forEach((item: any) =>{
        const productGroup = this.fb.group({
          productName: [item.productName, Validators.required],
          quantity:[item.quantity, Validators.required],
          amount:[item.amount, Validators.required],
          total_amount:[item.total_amount, Validators.required]
        });

        productGroup.get('quantity')?.valueChanges.subscribe(() =>{this.calculate(productGroup)});
        productGroup.get('amount')?.valueChanges.subscribe(() => {this.calculate(productGroup)});
         this.products.push(productGroup);
      });
      // this.table.renderRows();
      this.productForm.patchValue(saveData.productData);
    }

    this.productForm.valueChanges.subscribe(value =>{
      this.invoiceService.updateInvoiceData('productData', value);
    });
  }

  // Getter for FormArray
  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  // Add new row
  addProduct(): void {
    const productGroup = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      amount:['',Validators.required],
      total_amount:['', Validators.required]
    });

    productGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.calculate(productGroup)
    });
    productGroup.get('amount')?.valueChanges.subscribe(() => {
      this.calculate(productGroup)
    });
    this.products.push(productGroup);
      this.table?.renderRows();
  }

    calculate(group : FormGroup)
    {
      const  qty = group.get('quantity')?.value;
      const  amt = group.get('amount')?.value;
      if(qty && amt)
      {
        const total_amt = qty * amt;
        group.get('total_amount')?.setValue(total_amt, { emitEvent: false});
      }

    }
  // Remove row
  removeProduct(index: number): void {
    this.products.removeAt(index);
      this.table?.renderRows();
  }

  trackByIndex(index: number): number {
  return index;
}
  groupProducts(product:any[]) : any[]
  {
     const map = new Map<String , any>();
     product.forEach(item =>{
      const key = item.productName+'_'+item.amount;
      if(map.has(key))
      {
        const existingProduct = map.get(key);
        existingProduct.quantity += Number(item.quantity);
        existingProduct.total_amount = existingProduct.quantity * existingProduct.amount;
      }
      else
      {
        map.set(key,{...item,
          quantity :Number(item.quantity),
          amount :Number(item.amount),
          total_amount: Number(item.quantity) * Number(item.amount)
        });
      }
     });

     return Array.from(map.values());
  }

   // Submit
  onSubmit(): void {
    if (this.productForm.valid) {
      // this.productData.emit(this.productForm.valid);
      const product = this.groupProducts(this.productForm.value.products);
      this.invoiceService.updateInvoiceData('productData',{products:product});
      this.invoiceService.saveCustomer(this.invoiceService.getInvoiceData().customerData).subscribe
      (
        {
          next:(response) =>{
            console.log("Customer saved successfully", response);
             this.router.navigate(['/invoice']);
          },
          error:(err)=>{console.log("Error saving customer",err);}
        }
      );
      //  this.invoiceService.setProducts(product);
      console.log('Form Value:', this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    } 
  }
}
