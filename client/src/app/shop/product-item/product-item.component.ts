import { Component,Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input()  product:IProduct | undefined;

}
