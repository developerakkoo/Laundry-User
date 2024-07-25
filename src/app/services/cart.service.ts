import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:any[] = [];
  cartSubject:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor() { }



  addToCart(product:any){
    console.log(product);
    const cartItem = this.cart.find(item => item.product.id === product.id);
    this.cart.push(product);
    console.log(this.cart);
    
  }

  removeFromCart(product:any){
    console.log(product);
    
  }

  clearCart(){
    console.log(this.cart);
    
    this.cart = [];
    this.cartSubject.next([]);
    
  }

}
