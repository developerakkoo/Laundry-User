import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class LogicService {
  categories: any[] = [];
  address: any[] = [];
  laundriesByCategory: any[] = [];
  services: any[] = [];
  allLaundries: any[] = [];

  accessToken: BehaviorSubject<string> = new BehaviorSubject('');
  userId: BehaviorSubject<string> = new BehaviorSubject('');
  userProfileUpdated: BehaviorSubject<string> = new BehaviorSubject('');

  categoriesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.categories
  );
  category$ = this.categoriesSubject.asObservable();

  addressSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.address
  );
  address$ = this.addressSubject.asObservable();

  laundriesByCategorySubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  laundryByCategory$ = this.laundriesByCategorySubject.asObservable();

  servicesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  allLaundriesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  laundry$ = this.allLaundriesSubject.asObservable();
  constructor(private http: HttpClient, private storage: DataService) {
    this.init();
  }

  async init() {
    let token = await this.storage.get('accessToken');
    let userId = await this.storage.get('userId');
    let profileUpdated = await this.storage.get('profileUpdated');

    this.accessToken.next(token);
    this.userId.next(userId);
    this.userProfileUpdated.next(profileUpdated);
  }
  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log error or display a user-friendly message
    console.error('An error occurred:', error.message);
    // Optionally, you can display a user-friendly message to the user here
    return throwError('Something went wrong; please try again later.');
  }

  async getUserId(): Promise<string> {
    const userData = await this.storage.get('userId');
    if (userData) {
      return userData;
    }

    throw new Error('User Not Found in local Storgare');
  }

  register(body: {}) {
    return this.http.post(environment.URL + 'partner/register', body);
  }

  login(body: {}) {
    return this.http.post(environment.URL + 'user/login', body);
  }

  logout() {
    return this.http.get(
      environment.URL + `user/logout?userId=${this.userId.value}`
    );
  }
  getUserProfile() {
    return this.http.get(
      environment.URL + `user/get-current-user?userId=${this.userId.value}`
    );
  }

  updateUserProfile(body: {}) {
    return this.http.put(
      environment.URL + `user/update-profile?userId=${this.userId.value}`,
      body
    );
  }

  getNotifications() {
    return this.http
      .get(environment.URL + `notification/get/all/user/${this.userId.value}`)
      .pipe(catchError(this.handleError));
  }

  deleteNotification(notificationId: string) {
    return this.http
      .delete(environment.URL + `notification/delete/${notificationId}`)
      .pipe(catchError(this.handleError));
  }
  getAllCategories() {
    this.http
      .get(environment.URL + `partner/category/getAll`)
      .pipe(
        tap((data: any) => {
          console.log(data);

          this.categoriesSubject.next(data);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getAllAddress() {
    return this.http.get(
      environment.URL + `user/get/all-address/${this.userId.value}`
    );
  }

  addUserAddress(body: {}) {
    return this.http.post(
      environment.URL + `user/add-address?userId=${this.userId.value}`,
      body
    );
  }
  getUserAddress() {
    return this.http.get(
      environment.URL + `user/get/all-address/${this.userId.value}`
    );
  }

  getLaundryByCategory(
    latitude: any,
    longitude: any,
    categoryId: any,
    userId: any
  ) {
    // Create an instance of HttpParams
    let params = new HttpParams()
      .set('categoryId', '66a7496d1f27b4f5fb506c1d')
      .set('userId', userId)
      .set('latitude', latitude) // Convert number to string
      .set('longitude', longitude); // Convert number to string
    this.http
      .get(environment.URL + `partner/shop/get-all`, { params })
      .pipe(
        tap((data: any) => {
          console.log(data);

          this.laundriesByCategorySubject.next(data);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getServiceByLaundry() {
    // Create an instance of HttpParams
    let params = new HttpParams()
      .set('search', '')
      .set('latitude', '18.5925785') // Convert number to string
      .set('longitude', '73.7183639'); // Convert number to string
    this.http
      .get(environment.URL + `partner/shop/get/by/category`, { params })
      .pipe(
        tap((data: any) => {
          console.log(data);

          this.allLaundriesSubject.next(data);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getAllLaundries() {
    // Create an instance of HttpParams
    let params = new HttpParams()
      .set('search', '')
      .set('latitude', '18.5925785') // Convert number to string
      .set('longitude', '73.7183639'); // Convert number to string
    return this.http.get(environment.URL + `partner/shop/get-all`, { params });
  }

  getServiceByLaundryId(laundryId: any) {
    return this.http.get(
      environment.URL + `partner/service/get/shopId/${laundryId}`
    );
  }

  getAllOffers() {
    return this.http.get(environment.URL + `admin/promoCode/get-all`);
  }
  like(shopId: string) {
    return this.http.post(
      environment.URL + `partner/shop/like/${shopId}/${this.userId.value}`,
      {}
    );
  }

  unlike(shopId: string) {
    return this.http.post(
      environment.URL + `partner/shop/unlike/${shopId}/${this.userId.value}`,
      {}
    );
  }

  // userId, serviceId, quantity, selectedQuantityTypee
  addToCart(serviceId: any, quantity: any, selectedQuantityType: any) {
    console.log(`Quantity added is in htttp ${quantity}`);

    return this.http.post(environment.URL + `cart/add`, {
      userId: this.userId.value,
      quantity: quantity,
      serviceId: serviceId,
      selectedQuantityType: selectedQuantityType,
    });
  }

  removeFromCart(serviceId: any, quantity: any) {
    return this.http.post(environment.URL + `cart/remove`, {
      userId: this.userId.value.toString(),
      quantity: quantity,
      serviceId: serviceId,
    });
  }
  fetchCartAndServices(laundryId: string): Observable<any> {
    const cart$ = this.http
      .get(environment.URL + `cart/${this.userId.value}`)
      .pipe(
        catchError((error) => {
          console.error('Cart fetch error:', error);
          return of({ data: { products: [] } }); // Return empty cart
        })
      );

    const services$ = this.http
      .get(environment.URL + `partner/service/get/shopId/${laundryId}`)
      .pipe(
        catchError((error) => {
          console.error('Services fetch error:', error);
          return of({ data: { content: [] } }); // Return empty services
        })
      );

    return forkJoin([cart$, services$]).pipe(
      map(([cartResponse, servicesResponse]: any[]) => {
        const cartItems = cartResponse.data.products || [];
        const services = servicesResponse.data.content || [];

        // Merge services with cart items
        const enrichedServices = services.map((service: any) => {
          const cartItem = cartItems.find(
            (item: any) => item.serviceId._id === service._id
          );
          return {
            ...service,
            quantity: cartItem ? cartItem.quantity : 0, // Add quantity if in cart
          };
        });

        return enrichedServices;
      })
    );
  }

  getCart() {
    return this.http.get(environment.URL + `cart/${this.userId.value}`);
  }
  checkout(amount: number) {
    return this.http.post(
      environment.URL + `order/initiate/payment`,
      {
        amount: amount,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }
  calculateCartAmount(promoCode: string) {
    return this.http.post(
      environment.URL + `order/calculate/amount-to-pay`,
      {
        userId: this.userId.value,
        // userLat: 18.598372410944155,
        // userLong: 73.72979994780117,
        // shopLat: 18.596541603034428,
        // shopLong: 73.71820627128781,
        code: promoCode,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  placeOrder(
    dropoffAddressId: any,
    pickupAddressId: any,
    pickupTime: any,
    dropoffTime: any,
    selfService: any,
    priceDetails: any,
    orderType: any,
    products: any
  ) {
    return this.http.post(environment.URL + 'order/place', {
      userId: this.userId.value,
      dropoffAddressId,
      pickupAddressId,
      pickupTime,
      dropoffTime,
      selfService,
      priceDetails,
      orderType,
      products,
    });
  }

  getAllUserOrders() {
    return this.http.get(
      environment.URL + `order/get/order/${this.userId.value}`
    );
  }

  getUserSubscription() {
    return this.http.get(environment.URL + `subscription/get/all-plans`);
  }

  getSubscriptionByUserId() {
    return this.http.get(
      environment.URL + `subscription/get/${this.userId.value}`
    );
  }
  purchaseSubscription(planId: any, paymentDetails: any) {
    //"{paymentId: skjdbfbkfhbvugfvu,success: true}"
    return this.http.post(environment.URL + `subscription/purchase`, {
      userId: this.userId.value,
      planId: planId,
      paymentDetails: paymentDetails,
    });
  }
}
