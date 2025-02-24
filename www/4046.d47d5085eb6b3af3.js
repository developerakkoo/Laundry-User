"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4046],{8661:(C,y,s)=>{s.r(y),s.d(y,{EditProfilePageModule:()=>R});var I=s(177),d=s(9417),a=s(5374),f=s(5260),c=s(358),o=s(3953);const U=[{path:"",component:c.R}];let L=(()=>{var e;class n{}return(e=n).\u0275fac=function(g){return new(g||e)},e.\u0275mod=o.$C({type:e}),e.\u0275inj=o.G2t({imports:[f.iI.forChild(U),f.iI]}),n})(),R=(()=>{var e;class n{}return(e=n).\u0275fac=function(g){return new(g||e)},e.\u0275mod=o.$C({type:e}),e.\u0275inj=o.G2t({imports:[I.MD,d.YN,d.X1,a.bv,L]}),n})()},8786:(C,y,s)=>{s.d(y,{W:()=>g});var I=s(467),d=s(1626),a=s(4412),f=s(8810),c=s(8141),o=s(9437),U=s(7673),L=s(7468),R=s(6354);const e_URL="https://api.breezyemart.com/api/v1/";var n=s(3953),p=s(8490);let g=(()=>{var l;class m{constructor(t,r){this.http=t,this.storage=r,this.categories=[],this.address=[],this.laundriesByCategory=[],this.services=[],this.allLaundries=[],this.accessToken=new a.t(""),this.userId=new a.t(""),this.userProfileUpdated=new a.t(""),this.categoriesSubject=new a.t(this.categories),this.category$=this.categoriesSubject.asObservable(),this.addressSubject=new a.t(this.address),this.address$=this.addressSubject.asObservable(),this.laundriesByCategorySubject=new a.t([]),this.laundryByCategory$=this.laundriesByCategorySubject.asObservable(),this.servicesSubject=new a.t([]),this.allLaundriesSubject=new a.t([]),this.laundry$=this.allLaundriesSubject.asObservable(),this.init()}init(){var t=this;return(0,I.A)(function*(){let r=yield t.storage.get("accessToken"),u=yield t.storage.get("userId"),i=yield t.storage.get("profileUpdated");t.accessToken.next(r),t.userId.next(u),t.userProfileUpdated.next(i)})()}handleError(t){return console.error("An error occurred:",t.message),(0,f.$)("Something went wrong; please try again later.")}getUserId(){var t=this;return(0,I.A)(function*(){const r=yield t.storage.get("userId");if(r)return r;throw new Error("User Not Found in local Storgare")})()}register(t){return this.http.post(e_URL+"partner/register",t)}login(t){return this.http.post(e_URL+"user/login",t)}logout(){return this.http.get(e_URL+`user/logout?userId=${this.userId.value}`)}getUserProfile(){return this.http.get(e_URL+`user/get-current-user?userId=${this.userId.value}`)}updateUserProfile(t){return this.http.put(e_URL+`user/update-profile?userId=${this.userId.value}`,t)}getAllCategories(){this.http.get(e_URL+"partner/category/getAll").pipe((0,c.M)(t=>{console.log(t),this.categoriesSubject.next(t)}),(0,o.W)(this.handleError)).subscribe()}getAllAddress(){return this.http.get(e_URL+`user/get/all-address/${this.userId.value}`)}addUserAddress(t){return this.http.post(e_URL+`user/add-address?userId=${this.userId.value}`,t)}getUserAddress(){return this.http.get(e_URL+`user/get/all-address/${this.userId.value}`)}getLaundryByCategory(t,r,u,i){let v=(new d.Nl).set("categoryId","66a7496d1f27b4f5fb506c1d").set("userId",i).set("latitude",t).set("longitude",r);this.http.get(e_URL+"partner/shop/get-all",{params:v}).pipe((0,c.M)(h=>{console.log(h),this.laundriesByCategorySubject.next(h)}),(0,o.W)(this.handleError)).subscribe()}getServiceByLaundry(){let t=(new d.Nl).set("search","").set("latitude","18.5925785").set("longitude","73.7183639");this.http.get(e_URL+"partner/shop/get/by/category",{params:t}).pipe((0,c.M)(r=>{console.log(r),this.allLaundriesSubject.next(r)}),(0,o.W)(this.handleError)).subscribe()}getAllLaundries(){let t=(new d.Nl).set("search","").set("latitude","18.5925785").set("longitude","73.7183639");return this.http.get(e_URL+"partner/shop/get-all",{params:t})}getServiceByLaundryId(t){return this.http.get(e_URL+`partner/service/get/shopId/${t}`)}getAllOffers(){return this.http.get(e_URL+"admin/promoCode/get-all")}like(t){return this.http.post(e_URL+`partner/shop/like/${t}/${this.userId.value}`,{})}unlike(t){return this.http.post(e_URL+`partner/shop/unlike/${t}/${this.userId.value}`,{})}addToCart(t,r,u){return console.log(`Quantity added is in htttp ${r}`),this.http.post(e_URL+"cart/add",{userId:this.userId.value,quantity:r,serviceId:t,selectedQuantityType:u})}removeFromCart(t,r){return this.http.post(e_URL+"cart/remove",{userId:this.userId.value.toString(),quantity:r,serviceId:t})}fetchCartAndServices(t){const r=this.http.get(e_URL+`cart/${this.userId.value}`).pipe((0,o.W)(i=>(console.error("Cart fetch error:",i),(0,U.of)({data:{products:[]}})))),u=this.http.get(e_URL+`partner/service/get/shopId/${t}`).pipe((0,o.W)(i=>(console.error("Services fetch error:",i),(0,U.of)({data:{content:[]}}))));return(0,L.p)([r,u]).pipe((0,R.T)(([i,v])=>{const h=i.data.products||[];return(v.data.content||[]).map(b=>{const P=h.find(E=>E.serviceId._id===b._id);return{...b,quantity:P?P.quantity:0}})}))}getCart(){return this.http.get(e_URL+`cart/${this.userId.value}`)}checkout(t){return this.http.post(e_URL+"order/initiate/payment",{amount:t},{headers:{"x-access-token":this.accessToken.value.toString()}})}calculateCartAmount(t){return this.http.post(e_URL+"order/calculate/amount-to-pay",{userId:this.userId.value,code:t},{headers:{"x-access-token":this.accessToken.value}})}placeOrder(t,r,u,i,v,h,S,$){return this.http.post(e_URL+"order/place",{userId:this.userId.value,dropoffAddressId:t,pickupAddressId:r,pickupTime:u,dropoffTime:i,selfService:v,priceDetails:h,orderType:S,products:$})}getAllUserOrders(){return this.http.get(e_URL+`order/get/order/${this.userId.value}`)}getUserSubscription(){return this.http.get(e_URL+"subscription/get/all-plans")}getSubscriptionByUserId(){return this.http.get(e_URL+`subscription/get/${this.userId.value}`)}purchaseSubscription(t,r){return this.http.post(e_URL+"subscription/purchase",{userId:this.userId.value,planId:t,paymentDetails:r})}}return(l=m).\u0275fac=function(t){return new(t||l)(n.KVO(d.Qq),n.KVO(p.u))},l.\u0275prov=n.jDH({token:l,factory:l.\u0275fac,providedIn:"root"}),m})()}}]);