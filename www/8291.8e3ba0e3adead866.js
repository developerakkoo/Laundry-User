"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8291],{8291:(T,g,l)=>{l.r(g),l.d(g,{OtpPageModule:()=>M});var d=l(177),u=l(4341),p=l(5374),c=l(5260),t=l(3953),f=l(4412),m=l(1626);let v=(()=>{var o;class r{constructor(e){this.http=e,this.isLoggedIn=new f.t(!1)}login(e){this.isLoggedIn.next(!0)}sendOtp(e){}verifyOtp(e,i){}}return(o=r).\u0275fac=function(e){return new(e||o)(t.KVO(m.Qq))},o.\u0275prov=t.jDH({token:o,factory:o.\u0275fac,providedIn:"root"}),r})();var I=l(3455);const _=["ngOtpInput"],y=["input1"],x=["input2"],C=["input3"],O=["input4"];function w(o,r){if(1&o){const n=t.RV6();t.j41(0,"div",7)(1,"div",8)(2,"p",9),t.EFF(3,"Verify Phone"),t.k0s(),t.j41(4,"p",10),t.EFF(5),t.k0s(),t.nrm(6,"br"),t.j41(7,"div",11)(8,"ion-input",12,0),t.bIt("ionInput",function(i){t.eBV(n);const s=t.XpG();return t.Njj(s.onInputOne(i,1))}),t.k0s(),t.j41(10,"ion-input",12,1),t.bIt("ionInput",function(i){t.eBV(n);const s=t.XpG();return t.Njj(s.onInputTwo(i,2))}),t.k0s(),t.j41(12,"ion-input",12,2),t.bIt("ionInput",function(i){t.eBV(n);const s=t.XpG();return t.Njj(s.onInputThree(i,3))}),t.k0s(),t.j41(14,"ion-input",12,3),t.bIt("ionInput",function(i){t.eBV(n);const s=t.XpG();return t.Njj(s.onInputFour(i,4))}),t.k0s()(),t.j41(16,"p",13),t.EFF(17,"Did't get OTP code?"),t.k0s(),t.j41(18,"p",14),t.EFF(19,"Resend Code"),t.k0s()(),t.j41(20,"div",15)(21,"ion-button",16),t.bIt("click",function(){t.eBV(n);const i=t.XpG();return t.Njj(i.verifyOtp())}),t.EFF(22," Verify "),t.k0s()()()}if(2&o){const n=t.XpG();t.R7$(5),t.SpI("Code has been sent to +91",n.phoneNumber,"")}}function P(o,r){1&o&&(t.j41(0,"div",17),t.nrm(1,"img",18),t.k0s())}const b=[{path:"",component:(()=>{var o;class r{constructor(e,i,s,a,h){this.router=e,this.route=i,this.user=s,this.haptics=a,this.toastController=h,this.isOtpVerified=!1,this.otp=["","","",""],this.otpInputs=new Array(4),this.phoneNumber=this.route.snapshot.paramMap.get("phone")}ngOnInit(){}ionViewDidEnter(){this.input1.setFocus()}onInputOne(e,i){console.log(e.target.value),console.log("OTP:",e.target.value),console.log("OTP:",e.target.value.length),1==e.target.value.length&&(this.otp[0]=e.target.value,this.haptics.hapticsImpactLight(),this.input2.setFocus()),0==e.target.value.length&&(this.otp[0]=e.target.value,console.log(this.otp.join("").toString()),this.haptics.hapticsImpactLight())}onInputTwo(e,i){console.log(e.target.value),console.log("OTP:",e.target.value),1==e.target.value.length&&(this.otp[1]=e.target.value,this.haptics.hapticsImpactLight(),this.input3.setFocus()),0==e.target.value.length&&(this.otp[1]=e.target.value,console.log(this.otp.join("").toString()),this.haptics.hapticsImpactLight(),this.input1.setFocus())}onInputThree(e,i){console.log(e.target.value),console.log("OTP:",e.target.value),1==e.target.value.length&&(this.otp[2]=e.target.value,this.haptics.hapticsImpactLight(),this.input4.setFocus()),0==e.target.value.length&&(this.otp[2]=e.target.value,console.log(this.otp.join("").toString()),this.haptics.hapticsImpactLight(),this.input2.setFocus())}onInputFour(e,i){console.log(e.target.value),console.log("OTP:",e.target.value),1==e.target.value.length&&(this.otp[3]=e.target.value,this.haptics.hapticsImpactLight(),console.log(this.otp.join("").toString())),0==e.target.value.length&&(this.otp[3]=e.target.value,console.log(this.otp.join("").toString()),this.haptics.hapticsImpactLight(),this.input3.setFocus())}onKeyDown(e,i){"Backspace"===e.key&&""===this.otp[i]&&i>0&&document.querySelectorAll(".inputs")[i-1].focus()}setFocus(e){}verifyOtp(){this.isOtpVerified=!0,setTimeout(()=>{this.isOtpVerified=!1,this.router.navigate(["story"])},2e3)}}return(o=r).\u0275fac=function(e){return new(e||o)(t.rXU(c.Ix),t.rXU(c.nX),t.rXU(v),t.rXU(I.o),t.rXU(p.K_))},o.\u0275cmp=t.VBU({type:o,selectors:[["app-otp"]],viewQuery:function(e,i){if(1&e&&(t.GBs(_,5),t.GBs(y,5),t.GBs(x,5),t.GBs(C,5),t.GBs(O,5)),2&e){let s;t.mGM(s=t.lsd())&&(i.ngOtpInputRef=s.first),t.mGM(s=t.lsd())&&(i.input1=s.first),t.mGM(s=t.lsd())&&(i.input2=s.first),t.mGM(s=t.lsd())&&(i.input3=s.first),t.mGM(s=t.lsd())&&(i.input4=s.first)}},decls:3,vars:3,consts:[["input1",""],["input2",""],["input3",""],["input4",""],[1,"ion-padding",3,"fullscreen"],["class","container",4,"ngIf"],["class","loading-container",4,"ngIf"],[1,"container"],[1,"first","animate__animated","animate__slideInDown"],[1,"dark-text"],[1,"light-text"],[1,"otp-container"],["type","tel","maxlength","1","fill","clear","mode","md","maxlength","1",1,"ion-text-center",3,"ionInput"],[1,"bold-text"],[1,"primary-text"],[1,"last","animate__animated","animate__slideInUp"],["expand","block","mode","ios","fill","solid",3,"click"],[1,"loading-container"],["src","assets/otp-verify.gif","alt",""]],template:function(e,i){1&e&&(t.j41(0,"ion-content",4),t.DNE(1,w,23,1,"div",5)(2,P,2,0,"div",6),t.k0s()),2&e&&(t.Y8G("fullscreen",!0),t.R7$(),t.Y8G("ngIf",!i.isOtpVerified),t.R7$(),t.Y8G("ngIf",i.isOtpVerified))},dependencies:[d.bT,p.Jm,p.W9,p.$w,p.Gw],styles:[".container[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:center}.first[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:30px}p[_ngcontent-%COMP%]{margin:5px}.last[_ngcontent-%COMP%]{width:100%;padding:20px}ion-input[_ngcontent-%COMP%]{height:60px;min-height:60px;width:60px;min-width:60px;border-radius:14px 16px;border:1px solid #da9dff;background-color:#da9dff;outline:none}.otp-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;justify-content:center;gap:2px}.otp-container[_ngcontent-%COMP%] > .inputs[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{height:60px;width:60px;border-radius:14px 16px;border:1px solid #da9dff;background-color:#da9dff;outline:none}.otp-container[_ngcontent-%COMP%] > .inputs[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]:active, .otp-container[_ngcontent-%COMP%] > .inputs[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]:hover{border:1px solid var(--ion-color-primary-tint)}.bold-text[_ngcontent-%COMP%]{font-size:18px;font-weight:600;margin-top:20px}.primary-text[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-weight:300}"]}),r})()}];let V=(()=>{var o;class r{}return(o=r).\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.$C({type:o}),o.\u0275inj=t.G2t({imports:[c.iI.forChild(b),c.iI]}),r})(),N=(()=>{class o{transform(n){return Object.keys(n)}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275pipe=t.EJ8({name:"keys",type:o,pure:!0}),o})(),$=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.$C({type:o}),o.\u0275inj=t.G2t({providers:[N],imports:[[d.MD,u.YN,u.X1]]}),o})(),M=(()=>{var o;class r{}return(o=r).\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.$C({type:o}),o.\u0275inj=t.G2t({imports:[d.MD,u.YN,u.X1,$,p.bv,V]}),r})()}}]);