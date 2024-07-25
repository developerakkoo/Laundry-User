import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  categories:any[] = [  {
    "statusCode": 200,
    "data": [
        {
            "_id": "66a0cc7e83d5aa0964cd09b4",
            "name": "Washing",
            "createdAt": "2024-07-24T09:42:22.321Z",
            "updatedAt": "2024-07-24T09:42:22.379Z",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1721814142304-198759459.jpeg",
            "relativePath": "uploads/1721814142304-198759459.jpeg"
        },
        {
            "_id": "66a0cc9e83d5aa0964cd09bc",
            "name": "Dry Clean",
            "createdAt": "2024-07-24T09:42:54.594Z",
            "updatedAt": "2024-07-24T09:42:54.618Z",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1721814174581-654483860.jpeg",
            "relativePath": "uploads/1721814174581-654483860.jpeg"
        },
        {
            "_id": "66a0ccbb83d5aa0964cd09c2",
            "name": "Press",
            "createdAt": "2024-07-24T09:43:23.114Z",
            "updatedAt": "2024-07-24T09:43:23.137Z",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1721814203101-942857776.jpeg",
            "relativePath": "uploads/1721814203101-942857776.jpeg"
        },
        {
            "_id": "66a0ccd883d5aa0964cd09c8",
            "name": "shoe care",
            "createdAt": "2024-07-24T09:43:52.162Z",
            "updatedAt": "2024-07-24T09:43:52.186Z",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1721814232149-326054933.jpeg",
            "relativePath": "uploads/1721814232149-326054933.jpeg"
        },
        {
            "_id": "66a0ccf383d5aa0964cd09ce",
            "name": "test1",
            "createdAt": "2024-07-24T09:44:19.764Z",
            "updatedAt": "2024-07-24T09:44:19.787Z",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1721814259751-510544434.jpeg",
            "relativePath": "uploads/1721814259751-510544434.jpeg"
        },
        {
            "_id": "66a0ccff83d5aa0964cd09d4",
            "name": "test2",
            "createdAt": "2024-07-24T09:44:31.296Z",
            "updatedAt": "2024-07-24T09:44:31.350Z",
            "__v": 0,
            "image_url": "http://localhost:3000/uploads/1721814271282-349342767.jpeg",
            "relativePath": "uploads/1721814271282-349342767.jpeg"
        }
    ],
    "message": "Category fetched successfully",
    "success": true
}];
  laundriesByCategory:any[] = [];
  services:any[] = [];
  allLaundries:any[] = [];

  categoriesEvent:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.categories);
  laundriesByCategoryEvent:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  servicesEvent:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  allLaundriesEvent:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient) { }


  getAllCategories(){
    // this.http.get(environment.URL)
    this.categoriesEvent.next(this.categories);
  }

  getLaundryByCategory(){

  }

  getServiceByLaundry(){

  }

  getAllLaundries(){

  }

}
