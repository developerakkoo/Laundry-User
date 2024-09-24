import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
   this.http.get(environment.URL + `get-categories`)
   .pipe(tap((data:any) =>{
    console.log(data);
    
    this.categoriesSubject.next(data);
   }),catchError(this.handleError)).subscribe()
  }

  getLaundryByCategory(){
    
  }

  getServiceByLaundry(){

  }

  getAllLaundries(){
    this.http.get(environment.URL + `shop/get-all`)
    .pipe(tap((data:any) =>{
     console.log(data);
     
     this.allLaundriesSubject.next(data);
    }),catchError(this.handleError)).subscribe();
  }

}
