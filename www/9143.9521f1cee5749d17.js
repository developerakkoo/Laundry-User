"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9143],{9143:(L,f,s)=>{s.r(f),s.d(f,{MyorderPageModule:()=>m});var b=s(177),p=s(9417),r=s(5374),F=s(5260),e=s(3953),h=s(8786),M=s(3455);const j=[{path:"",component:(()=>{var i;class c{constructor(a,u){this.logic=a,this.haptics=u,this.isRecentOrder=!0,this.orders=[],this.isLoading=!1}ngOnInit(){}ionViewDidEnter(){this.getOrders()}getOrders(){this.logic.getAllUserOrders().subscribe({next:a=>{console.log(a)},error:a=>{console.log(a)}})}segmentChanged(a){console.log(a.detail.value);let u=a.detail.value;1===u?(console.log("Recent Orders"),this.isRecentOrder=!0):2===u&&(console.log("Previous Orders"),this.isRecentOrder=!1)}}return(i=c).\u0275fac=function(a){return new(a||i)(e.rXU(h.W),e.rXU(M.o))},i.\u0275cmp=e.VBU({type:i,selectors:[["app-myorder"]],decls:74,vars:2,consts:[[1,"ion-no-border",3,"translucent"],["slot","start"],["defaultHref","/tabs/tabs/tab3"],[1,"ion-padding",3,"fullscreen"],["value","1",3,"ionChange"],["value","1"],["value","2"],[1,"animate__animated","animate__backInLeft"],["color","light","slot","header","lines","none","detail","",1,"ion-margin-top"],["crossOrigin","anonymous","src","https://placehold.co/60",1,"hotel-thumbnail"],[1,"hotel-item-container"],[1,"ion-margin-start"],[1,"title"],[1,"sub-title"],[1,"ion-margin-start","rating-container"],[1,"rating"],[1,"sort-badge","ion-margin-start"],["slot","content",1,"ion-padding"],[1,"ion-margin-top"],["slot","end",1,"pricing"],["expand","block","fill","clear","shape","round"]],template:function(a,u){1&a&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"My Orders"),e.k0s(),e.j41(4,"ion-buttons",1),e.nrm(5,"ion-back-button",2),e.k0s()()(),e.j41(6,"ion-content",3)(7,"ion-segment",4),e.bIt("ionChange",function(o){return u.segmentChanged(o)}),e.j41(8,"ion-segment-button",5)(9,"ion-label"),e.EFF(10,"Recent"),e.k0s()(),e.j41(11,"ion-segment-button",6)(12,"ion-label"),e.EFF(13,"Previous"),e.k0s()()(),e.j41(14,"ion-list")(15,"ion-accordion-group")(16,"ion-accordion",7)(17,"ion-item",8),e.nrm(18,"img",9),e.j41(19,"div",10)(20,"ion-label",11)(21,"p",12),e.EFF(22,"Title"),e.k0s(),e.j41(23,"p",13),e.EFF(24,"6 X"),e.k0s()(),e.j41(25,"div",14)(26,"p",15),e.EFF(27,"May 24, 2024"),e.k0s()(),e.j41(28,"div",16)(29,"p"),e.EFF(30,"Received"),e.k0s()()()(),e.j41(31,"div",17)(32,"ion-list")(33,"ion-list-header")(34,"ion-label"),e.EFF(35,"Your Order Details"),e.k0s()(),e.j41(36,"ion-item",18),e.nrm(37,"img",9),e.j41(38,"div",10)(39,"ion-label",11)(40,"p",12),e.EFF(41,"Jeans"),e.k0s(),e.j41(42,"p",13),e.EFF(43,"234"),e.k0s(),e.j41(44,"span"),e.EFF(45,"X 4"),e.k0s()()()()(),e.nrm(46,"br"),e.j41(47,"ion-item")(48,"ion-label"),e.EFF(49,"Subtotal"),e.k0s(),e.j41(50,"p",19),e.EFF(51,"300"),e.k0s()(),e.j41(52,"ion-item")(53,"ion-label"),e.EFF(54,"Delivery"),e.k0s(),e.j41(55,"p",19),e.EFF(56,"20"),e.k0s()(),e.j41(57,"ion-item")(58,"ion-label"),e.EFF(59,"Handling Fees"),e.k0s(),e.j41(60,"p",19),e.EFF(61,"20"),e.k0s()(),e.j41(62,"ion-item")(63,"ion-label"),e.EFF(64,"(GST)"),e.k0s(),e.j41(65,"p",19),e.EFF(66,"3%"),e.k0s()(),e.j41(67,"ion-item")(68,"ion-label"),e.EFF(69,"Total"),e.k0s(),e.j41(70,"p",19),e.EFF(71,"450"),e.k0s()(),e.j41(72,"ion-button",20),e.EFF(73," Help "),e.k0s()()()()()()),2&a&&(e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0))},dependencies:[r.xk,r.YH,r.Jm,r.QW,r.W9,r.eU,r.uz,r.he,r.nf,r.AF,r.Gp,r.eP,r.BC,r.ai,r.Je,r.el],styles:[".title[_ngcontent-%COMP%]{font-size:14px;font-weight:700}.sub-title[_ngcontent-%COMP%]{font-size:18px}.pricing[_ngcontent-%COMP%]{color:#22a45d;font-size:15px;font-weight:700}.ion-item[_ngcontent-%COMP%]{height:-moz-fit-content;height:fit-content}ion-accordion[_ngcontent-%COMP%]{border-radius:12px}.hotel-thumbnail[_ngcontent-%COMP%]{height:80px;width:80px;border-radius:8px}.hotel-item-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;justify-content:center}ion-item[_ngcontent-%COMP%]   .rating-container[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]{font-size:10px;margin:0}.rating[_ngcontent-%COMP%]{margin:0;font-size:14px}.rating-container[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:2px}.sub-title[_ngcontent-%COMP%]{font-size:12px}ion-icon[_ngcontent-%COMP%]{font-size:20px}.sort-badge[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#e7fff1;height:20px;width:57px;border-radius:2px;padding-left:10px;padding-right:10px;margin-top:6px}.sort-badge[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;color:#00c54f}ion-item[_ngcontent-%COMP%]:active{animation:scale-down-center .8s cubic-bezier(.25,.46,.45,.94) both}ion-chip[_ngcontent-%COMP%]{margin-right:10px}"]}),c})()}];let n=(()=>{var i;class c{}return(i=c).\u0275fac=function(a){return new(a||i)},i.\u0275mod=e.$C({type:i}),i.\u0275inj=e.G2t({imports:[F.iI.forChild(j),F.iI]}),c})(),m=(()=>{var i;class c{}return(i=c).\u0275fac=function(a){return new(a||i)},i.\u0275mod=e.$C({type:i}),i.\u0275inj=e.G2t({imports:[b.MD,p.YN,r.bv,n]}),c})()},8786:(L,f,s)=>{s.d(f,{W:()=>c});var b=s(467),p=s(1626),r=s(4412),F=s(8810),e=s(8141),h=s(9437),M=s(7673),C=s(7468),j=s(6354);const n_URL="https://api.breezyemart.com/api/v1/";var m=s(3953),i=s(8490);let c=(()=>{var l;class a{constructor(t,o){this.http=t,this.storage=o,this.categories=[],this.address=[],this.laundriesByCategory=[],this.services=[],this.allLaundries=[],this.accessToken=new r.t(""),this.userId=new r.t(""),this.categoriesSubject=new r.t(this.categories),this.category$=this.categoriesSubject.asObservable(),this.addressSubject=new r.t(this.address),this.address$=this.addressSubject.asObservable(),this.laundriesByCategorySubject=new r.t([]),this.laundryByCategory$=this.laundriesByCategorySubject.asObservable(),this.servicesSubject=new r.t([]),this.allLaundriesSubject=new r.t([]),this.laundry$=this.allLaundriesSubject.asObservable(),this.init()}init(){var t=this;return(0,b.A)(function*(){let o=yield t.storage.get("accessToken"),g=yield t.storage.get("userId");t.accessToken.next(o),t.userId.next(g)})()}handleError(t){return console.error("An error occurred:",t.message),(0,F.$)("Something went wrong; please try again later.")}getUserId(){var t=this;return(0,b.A)(function*(){const o=yield t.storage.get("userId");if(o)return o;throw new Error("User Not Found in local Storgare")})()}register(t){return this.http.post(n_URL+"partner/register",t)}login(t){return this.http.post(n_URL+"user/login",t)}getAllCategories(){this.http.get(n_URL+"partner/category/getAll").pipe((0,e.M)(t=>{console.log(t),this.categoriesSubject.next(t)}),(0,h.W)(this.handleError)).subscribe()}getAllAddress(){return this.http.get(n_URL+`user/get/all-address/${this.userId.value}`)}addUserAddress(t){return this.http.post(n_URL+`user/add-address?userId=${this.userId.value}`,t)}getUserAddress(){return this.http.get(n_URL+`user/get/all-address/${this.userId.value}`)}getLaundryByCategory(t,o,g,d){let y=(new p.Nl).set("categoryId","66a7496d1f27b4f5fb506c1d").set("userId",d).set("latitude",t).set("longitude",o);this.http.get(n_URL+"partner/shop/get-all",{params:y}).pipe((0,e.M)(v=>{console.log(v),this.laundriesByCategorySubject.next(v)}),(0,h.W)(this.handleError)).subscribe()}getServiceByLaundry(){let t=(new p.Nl).set("search","").set("latitude","18.5925785").set("longitude","73.7183639");this.http.get(n_URL+"partner/shop/get/by/category",{params:t}).pipe((0,e.M)(o=>{console.log(o),this.allLaundriesSubject.next(o)}),(0,h.W)(this.handleError)).subscribe()}getAllLaundries(){let t=(new p.Nl).set("search","").set("latitude","18.5925785").set("longitude","73.7183639");return this.http.get(n_URL+"partner/shop/get-all",{params:t})}getServiceByLaundryId(t){return this.http.get(n_URL+`partner/service/get/shopId/${t}`)}getAllOffers(){return this.http.get(n_URL+"admin/promoCode/get-all")}like(t){return this.http.post(n_URL+`partner/shop/like/${t}/${this.userId.value}`,{})}unlike(t){return this.http.post(n_URL+`partner/shop/unlike/${t}/${this.userId.value}`,{})}addToCart(t,o,g){return console.log(`Quantity added is in htttp ${o}`),this.http.post(n_URL+"cart/add",{userId:this.userId.value,quantity:o,serviceId:t,selectedQuantityType:g})}removeFromCart(t,o){return this.http.post(n_URL+"cart/remove",{userId:this.userId.value.toString(),quantity:o,serviceId:t})}fetchCartAndServices(t){const o=this.http.get(n_URL+`cart/${this.userId.value}`).pipe((0,h.W)(d=>(console.error("Cart fetch error:",d),(0,M.of)({data:{products:[]}})))),g=this.http.get(n_URL+`partner/service/get/shopId/${t}`).pipe((0,h.W)(d=>(console.error("Services fetch error:",d),(0,M.of)({data:{content:[]}}))));return(0,C.p)([o,g]).pipe((0,j.T)(([d,y])=>{const v=d.data.products||[];return(y.data.content||[]).map(O=>{const P=v.find(x=>x.serviceId._id===O._id);return{...O,quantity:P?P.quantity:0}})}))}getCart(){return this.http.get(n_URL+`cart/${this.userId.value}`)}checkout(t){return this.http.post(n_URL+"order/initiate/payment",{amount:t},{headers:{"x-access-token":this.accessToken.value.toString()}})}calculateCartAmount(t){return this.http.post(n_URL+"order/calculate/amount-to-pay",{userId:this.userId.value,code:t},{headers:{"x-access-token":this.accessToken.value}})}placeOrder(t,o,g,d,y,v,I){return this.http.post(n_URL+"order/place",{userId:this.userId.value,dropoffAddressId:t,pickupAddressId:o,pickupTime:g,dropoffTime:d,selfService:y,priceDetails:v,orderType:I})}getAllUserOrders(){return this.http.get(n_URL+`order/get-by/userId/${this.userId.value}`)}}return(l=a).\u0275fac=function(t){return new(t||l)(m.KVO(p.Qq),m.KVO(i.u))},l.\u0275prov=m.jDH({token:l,factory:l.\u0275fac,providedIn:"root"}),a})()}}]);