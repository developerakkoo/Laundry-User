"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3485],{3485:(M,y,o)=>{o.r(y),o.d(y,{LoginPageModule:()=>R});var p=o(177),l=o(9417),a=o(5374),m=o(5260),h=o(467),t=o(3953),L=o(8490),x=o(3455),P=o(8786);const i=["input"];function v(e,n){if(1&e){const s=t.RV6();t.j41(0,"div",19)(1,"ion-button",20),t.bIt("click",function(){t.eBV(s);const c=t.XpG();return t.Njj(c.getOTP())}),t.EFF(2," Continue "),t.nrm(3,"ion-icon",21),t.k0s()()}if(2&e){const s=t.XpG();t.R7$(),t.Y8G("disabled",s.form.invalid)}}function U(e,n){if(1&e){const s=t.RV6();t.j41(0,"div",19)(1,"ion-button",20),t.bIt("click",function(){t.eBV(s);const c=t.XpG();return t.Njj(c.getOTP())}),t.nrm(2,"ion-spinner",22),t.k0s()()}if(2&e){const s=t.XpG();t.R7$(),t.Y8G("disabled",s.form.invalid)}}const u=[{path:"",component:(()=>{var e;class n{constructor(r,c,d,g,f,I,C){this.router=r,this.data=c,this.haptics=d,this.LoadingCtrl=g,this.logic=f,this.toastController=I,this.formBuilder=C,this.form=l.gE,this.submitted=!1}ngOnInit(){this.form=this.formBuilder.group({phoneNumber:["",[l.k0.required,l.k0.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]})}ionViewDidEnter(){this.input.setFocus()}login(){var r=this;return(0,h.A)(function*(){r.haptics.hapticsImpactLight()})()}getOTP(){var c,r=this;this.haptics.hapticsImpactLight(),this.submitted=!0,this.form.valid&&(console.log(this.form.value),this.logic.login(this.form.value).subscribe({next:(c=(0,h.A)(function*(d){console.log(d),r.submitted=!1;let g=d.data._id,f=d.data.accessToken;console.log(g),console.log(f),yield r.data.set("userId",g),yield r.data.set("accessToken",f),r.router.navigate(["otp",r.form.value.phoneNumber])}),function(g){return c.apply(this,arguments)}),error:c=>{console.log(c),this.submitted=!1}}))}onReset(){this.submitted=!1,this.form.reset()}}return(e=n).\u0275fac=function(r){return new(r||e)(t.rXU(m.Ix),t.rXU(L.u),t.rXU(x.o),t.rXU(a.Xi),t.rXU(P.W),t.rXU(a.K_),t.rXU(l.ok))},e.\u0275cmp=t.VBU({type:e,selectors:[["app-login"]],viewQuery:function(r,c){if(1&r&&t.GBs(i,5),2&r){let d;t.mGM(d=t.lsd())&&(c.input=d.first)}},decls:29,vars:4,consts:[["input",""],[1,"ion-padding",3,"fullscreen"],[1,"Login_Container","ion-margin-top"],[1,"animate__animated","animate__slideInUp"],[1,"text-container"],[1,"brand"],[1,"lato-black","brand-text"],[1,"dark-text"],[1,"light-text"],[3,"formGroup"],[1,"line"],[1,"input-text"],["type","tel","fill","solid","lines","none","mode","md","label","Mobile number","labelPlacement","stacked","formControlName","phoneNumber","counter","true","maxlength","10","helperText","Securing your personal information is our priority"],["slot","start","name","call","aria-hidden","true"],["class","button-div",4,"ngIf"],[1,"ion-no-border","animate__animated","animate__slideInUp"],["color","light",1,"ion-no-border"],["color","dark",1,"ion-text-center"],[2,"font-size","12px","text-align","center"],[1,"button-div"],["color","primary","expand","block","fill","solid","mode","ios",1,"animate__animated","animate__slideInUp",3,"click","disabled"],["slot","end","name","arrow-forward",1,"animate__animated","animate__shakeX","animate__infinite","slow"],["name","lines"]],template:function(r,c){1&r&&(t.j41(0,"ion-content",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"p",6),t.EFF(6,"Breezy"),t.k0s(),t.j41(7,"p",7),t.EFF(8,"Hi!\u{1f44b} Welcome to Breezy."),t.k0s(),t.j41(9,"p",8),t.EFF(10,"Create your account or Log in."),t.k0s()()(),t.nrm(11,"br"),t.j41(12,"form",9)(13,"div",10)(14,"p",11),t.EFF(15,"Enter your phone number"),t.k0s()(),t.j41(16,"ion-input",12,0),t.nrm(18,"ion-icon",13),t.k0s(),t.nrm(19,"br"),t.k0s()(),t.DNE(20,v,4,1,"div",14)(21,U,3,1,"div",14),t.k0s()(),t.j41(22,"ion-footer",15)(23,"ion-toolbar",16)(24,"ion-text",17)(25,"ion-label",18),t.EFF(26,"By login, you agree to our "),t.j41(27,"strong"),t.EFF(28,"terms and conditions."),t.k0s()()()()()),2&r&&(t.Y8G("fullscreen",!1),t.R7$(12),t.Y8G("formGroup",c.form),t.R7$(8),t.Y8G("ngIf",!c.submitted),t.R7$(),t.Y8G("ngIf",c.submitted))},dependencies:[p.bT,l.qT,l.BC,l.cb,l.tU,l.j4,l.JD,a.Jm,a.W9,a.M0,a.iq,a.$w,a.he,a.w2,a.IO,a.ai,a.Gw],styles:[".Login_Container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;height:100%;width:100%;flex-direction:column;padding:30px}.Login_Container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:200px;height:auto;margin-top:30%}.formCls[_ngcontent-%COMP%]{margin-top:20px}.Input_num[_ngcontent-%COMP%], .Input_num[_ngcontent-%COMP%]:hover{--border-color: var(--ion-color-success, #21AD4B)}.Login_Form[_ngcontent-%COMP%]{margin-top:10%}.show-error[_ngcontent-%COMP%]{padding-top:.2rem;color:red;font-size:12px}.Login_text[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.input-text[_ngcontent-%COMP%]{font-size:14px;font-weight:300}ion-text[_ngcontent-%COMP%]{display:flex;justify-content:center;text-align:center}.button-div[_ngcontent-%COMP%]{width:100vw;padding:20px}.brand[_ngcontent-%COMP%] > .brand-text[_ngcontent-%COMP%]{font-size:2rem;color:var(--ion-color-primary);font-weight:700;margin:10px 0}ion-input[_ngcontent-%COMP%]{--border-radius: 12px}"]}),n})()}];let b=(()=>{var e;class n{}return(e=n).\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.$C({type:e}),e.\u0275inj=t.G2t({imports:[m.iI.forChild(u),m.iI]}),n})(),R=(()=>{var e;class n{}return(e=n).\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.$C({type:e}),e.\u0275inj=t.G2t({imports:[p.MD,l.YN,l.X1,a.bv,b]}),n})()},8786:(M,y,o)=>{o.d(y,{W:()=>j});var p=o(467),l=o(1626),a=o(4412),m=o(8810),h=o(8141),t=o(9437),L=o(7673),x=o(7468),P=o(6354);const i_URL="https://api.breezyemart.com/api/v1/";var v=o(3953),U=o(8490);let j=(()=>{var u;class b{constructor(e,n){this.http=e,this.storage=n,this.categories=[],this.address=[],this.laundriesByCategory=[],this.services=[],this.allLaundries=[],this.accessToken=new a.t(""),this.userId=new a.t(""),this.categoriesSubject=new a.t(this.categories),this.category$=this.categoriesSubject.asObservable(),this.addressSubject=new a.t(this.address),this.address$=this.addressSubject.asObservable(),this.laundriesByCategorySubject=new a.t([]),this.laundryByCategory$=this.laundriesByCategorySubject.asObservable(),this.servicesSubject=new a.t([]),this.allLaundriesSubject=new a.t([]),this.laundry$=this.allLaundriesSubject.asObservable(),this.init()}init(){var e=this;return(0,p.A)(function*(){let n=yield e.storage.get("accessToken"),s=yield e.storage.get("userId");e.accessToken.next(n),e.userId.next(s)})()}handleError(e){return console.error("An error occurred:",e.message),(0,m.$)("Something went wrong; please try again later.")}getUserId(){var e=this;return(0,p.A)(function*(){const n=yield e.storage.get("userId");if(n)return n;throw new Error("User Not Found in local Storgare")})()}register(e){return this.http.post(i_URL+"partner/register",e)}login(e){return this.http.post(i_URL+"user/login",e)}getAllCategories(){this.http.get(i_URL+"partner/category/getAll").pipe((0,h.M)(e=>{console.log(e),this.categoriesSubject.next(e)}),(0,t.W)(this.handleError)).subscribe()}getAllAddress(){return this.http.get(i_URL+`user/get/all-address/${this.userId.value}`)}addUserAddress(e){return this.http.post(i_URL+`user/add-address?userId=${this.userId.value}`,e)}getUserAddress(){return this.http.get(i_URL+`user/get/all-address/${this.userId.value}`)}getLaundryByCategory(e,n,s,r){let c=(new l.Nl).set("categoryId","66a7496d1f27b4f5fb506c1d").set("userId",r).set("latitude",e).set("longitude",n);this.http.get(i_URL+"partner/shop/get-all",{params:c}).pipe((0,h.M)(d=>{console.log(d),this.laundriesByCategorySubject.next(d)}),(0,t.W)(this.handleError)).subscribe()}getServiceByLaundry(){let e=(new l.Nl).set("search","").set("latitude","18.5925785").set("longitude","73.7183639");this.http.get(i_URL+"partner/shop/get/by/category",{params:e}).pipe((0,h.M)(n=>{console.log(n),this.allLaundriesSubject.next(n)}),(0,t.W)(this.handleError)).subscribe()}getAllLaundries(){let e=(new l.Nl).set("search","").set("latitude","18.5925785").set("longitude","73.7183639");return this.http.get(i_URL+"partner/shop/get-all",{params:e})}getServiceByLaundryId(e){return this.http.get(i_URL+`partner/service/get/shopId/${e}`)}getAllOffers(){return this.http.get(i_URL+"admin/promoCode/get-all")}like(e){return this.http.post(i_URL+`partner/shop/like/${e}/${this.userId.value}`,{})}unlike(e){return this.http.post(i_URL+`partner/shop/unlike/${e}/${this.userId.value}`,{})}addToCart(e,n,s){return console.log(`Quantity added is in htttp ${n}`),this.http.post(i_URL+"cart/add",{userId:this.userId.value,quantity:n,serviceId:e,selectedQuantityType:s})}removeFromCart(e,n){return this.http.post(i_URL+"cart/remove",{userId:this.userId.value.toString(),quantity:n,serviceId:e})}fetchCartAndServices(e){const n=this.http.get(i_URL+`cart/${this.userId.value}`).pipe((0,t.W)(r=>(console.error("Cart fetch error:",r),(0,L.of)({data:{products:[]}})))),s=this.http.get(i_URL+`partner/service/get/shopId/${e}`).pipe((0,t.W)(r=>(console.error("Services fetch error:",r),(0,L.of)({data:{content:[]}}))));return(0,x.p)([n,s]).pipe((0,P.T)(([r,c])=>{const d=r.data.products||[];return(c.data.content||[]).map(I=>{const C=d.find(O=>O.serviceId._id===I._id);return{...I,quantity:C?C.quantity:0}})}))}getCart(){return this.http.get(i_URL+`cart/${this.userId.value}`)}checkout(e){return this.http.post(i_URL+"order/initiate/payment",{amount:e},{headers:{"x-access-token":this.accessToken.value.toString()}})}calculateCartAmount(e){return this.http.post(i_URL+"order/calculate/amount-to-pay",{userId:this.userId.value,code:e},{headers:{"x-access-token":this.accessToken.value}})}placeOrder(e,n,s,r,c,d,g){return this.http.post(i_URL+"order/place",{userId:this.userId.value,dropoffAddressId:e,pickupAddressId:n,pickupTime:s,dropoffTime:r,selfService:c,priceDetails:d,orderType:g})}getAllUserOrders(){return this.http.get(i_URL+`order/get-by/userId/${this.userId.value}`)}}return(u=b).\u0275fac=function(e){return new(e||u)(v.KVO(l.Qq),v.KVO(U.u))},u.\u0275prov=v.jDH({token:u,factory:u.\u0275fac,providedIn:"root"}),b})()}}]);