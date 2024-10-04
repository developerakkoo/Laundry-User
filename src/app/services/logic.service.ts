import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  categories:any[] = [];
  laundriesByCategory:any[] = [];
  services:any[] = [];
  allLaundries:any[] = [];

  categoriesSubject:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.categories);
  category$ = this.categoriesSubject.asObservable();

  laundriesByCategorySubject:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  laundryByCategory$ = this.laundriesByCategorySubject.asObservable();

  servicesSubject:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  allLaundriesSubject:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  laundry$ = this.allLaundriesSubject.asObservable();
  constructor(private http:HttpClient) { }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log error or display a user-friendly message
    console.error('An error occurred:', error.message);
    // Optionally, you can display a user-friendly message to the user here
    return throwError('Something went wrong; please try again later.');
  }

  getAllCategories(){
   this.http.get(environment.URL + `partner/category/getAll`)
   .pipe(tap((data:any) =>{
    console.log(data);
    
    this.categoriesSubject.next(data);
   }),catchError(this.handleError)).subscribe()
  }

  getLaundryByCategory(latitude:any, longitude:any, categoryId:any,userId:any){
    // Create an instance of HttpParams
    let params = new HttpParams()
    .set('categoryId', "66a7496d1f27b4f5fb506c1d")
    .set('userId', userId)
    .set('latitude', latitude) // Convert number to string
    .set('longitude', longitude); // Convert number to string
    this.http.get(environment.URL + `partner/shop/get-all`,{params})
    .pipe(tap((data:any) =>{
     console.log(data);
     
     this.laundriesByCategorySubject.next(data);
    }),catchError(this.handleError)).subscribe();
  }

  getServiceByLaundry(){
// Create an instance of HttpParams
let params = new HttpParams()
.set('search', "")
.set('latitude', "18.5925785") // Convert number to string
.set('longitude', "73.7183639"); // Convert number to string
this.http.get(environment.URL + `partner/shop/get/by/category`,{params})
.pipe(tap((data:any) =>{
 console.log(data);
 
 this.allLaundriesSubject.next(data);
}),catchError(this.handleError)).subscribe();
  }

  getAllLaundries(){
     // Create an instance of HttpParams
     let params = new HttpParams()
     .set('search', "")
     .set('latitude', "18.5925785") // Convert number to string
     .set('longitude', "73.7183639"); // Convert number to string
    this.http.get(environment.URL + `partner/shop/get-all`,{params})
    .pipe(tap((data:any) =>{
     console.log(data);
     
     this.allLaundriesSubject.next(data);
    }),catchError(this.handleError)).subscribe();
  }

}
