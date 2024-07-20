import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(phoneNumber:string){
    this.isLoggedIn.next(true);
  }

  sendOtp(phoneNumber:string){

  }

  verifyOtp(phoneNumber:string, otp:string){

  }
}
