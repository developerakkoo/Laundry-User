"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5378],{5378:(P,s,n)=>{n.r(s),n.d(s,{Tab2PageModule:()=>T});var o=n(5374),d=n(177),p=n(4341),m=n(1307),l=n(5260),h=n(467),e=n(3953),g=n(3455),f=n(5219);const v=[{path:"",component:(()=>{var t;class r{constructor(a,i,u){this.haptics=a,this.router=i,this.actionSheetController=u,this.totalprice=1200}checkout(){}presentActionSheet(){var a=this;return(0,h.A)(function*(){yield(yield a.actionSheetController.create({header:"Choose Delivery Option",animated:!0,backdropDismiss:!0,mode:"ios",buttons:[{text:"Normal Delivery(1-2 Days)",icon:"sunny",role:"selected",handler:()=>{console.log("Delete clicked"),a.haptics.hapticsImpactLight(),a.router.navigate(["payment-success"])}},{text:"Express Delivery(One day delivery)",icon:"rocket",handler:()=>{console.log("Share clicked"),a.haptics.hapticsImpactLight(),a.router.navigate(["payment-success"])}},{text:"Cancel",icon:"close",role:"cancel",handler:()=>{console.log("Cancel clicked")}}]})).present()})()}}return(t=r).\u0275fac=function(a){return new(a||t)(e.rXU(g.o),e.rXU(l.Ix),e.rXU(o.GD))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-tab2"]],decls:21,vars:6,consts:[[1,"ion-no-border",3,"translucent"],[3,"fullscreen"],[1,"ion-padding"],["productImageUrl","https://via.placeholder.com/100","productName","Product Name","productPrice","$10.00"],[1,"animate__animated","animate__slideInUp"],["color","primary"],["color","light","expand","block","fill","clear","shape","round",3,"click"],["slot","end","name","arrow-forward-outline",1,"animate__animated","animate__shakeX","animate__slower","animate__infinite"]],template:function(a,i){1&a&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3," Cart "),e.k0s()()(),e.j41(4,"ion-content",1)(5,"ion-card",2)(6,"ion-card-header")(7,"ion-card-subtitle"),e.EFF(8,"(Add more 100 worth items to get free delivery!)"),e.k0s(),e.j41(9,"ion-card-title"),e.EFF(10,"Cart Items(4 Items)"),e.k0s()(),e.nrm(11,"app-product-card",3)(12,"app-product-card",3)(13,"app-product-card",3)(14,"app-product-card",3),e.k0s()(),e.j41(15,"ion-footer",4)(16,"ion-toolbar",5)(17,"ion-button",6),e.bIt("click",function(){return i.presentActionSheet()}),e.EFF(18),e.nI1(19,"currency"),e.nrm(20,"ion-icon",7),e.k0s()()()),2&a&&(e.Y8G("translucent",!0),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(14),e.SpI(" Your Order Total is ",e.i5U(19,3,i.totalprice,"INR")," "))},dependencies:[o.Jm,o.b_,o.ME,o.HW,o.tN,o.W9,o.M0,o.eU,o.iq,o.BC,o.ai,f.V,d.oe],styles:["ion-content[_ngcontent-%COMP%]{--background:#fdfdfd}"]}),r})()}];let y=(()=>{var t;class r{}return(t=r).\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[l.iI.forChild(v),l.iI]}),r})();var b=n(541);let T=(()=>{var t;class r{}return(t=r).\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[o.bv,d.MD,p.YN,b.G,m.S,y]}),r})()}}]);