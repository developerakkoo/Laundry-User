"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9665],{9665:(C,u,t)=>{t.r(u),t.d(u,{ViewLaundryPageModule:()=>w});var g=t(177),p=t(4341),i=t(5374),c=t(8986),f=t(617),e=t(3953),h=t(3455),y=t(1518);function m(n,o){1&n&&(e.j41(0,"div",15),e.nrm(1,"img",16),e.k0s())}function P(n,o){if(1&n){const l=e.RV6();e.j41(0,"ion-list")(1,"ion-list-header")(2,"ion-label",17),e.EFF(3,"Top Laundries "),e.k0s()(),e.j41(4,"app-laundry-card",18),e.bIt("click",function(){e.eBV(l);const r=e.XpG();return e.Njj(r.openPage("/view-laundry/Washing/1/add"))}),e.k0s(),e.nrm(5,"app-laundry-card",19)(6,"app-laundry-card",19)(7,"app-laundry-card",19)(8,"app-laundry-card",19),e.k0s()}}const v=[{path:"",component:(()=>{var n;class o{constructor(a,r,s,d){this.router=a,this.haptics=r,this.route=s,this.actionSheetController=d,this.swiperModules=[f.Jl],this.isLoading=!1,this.title=this.route.snapshot.paramMap.get("name"),this.categoryId=this.route.snapshot.paramMap.get("id")}ngOnInit(){}ionViewDidEnter(){this.getLaundriesById()}handleRefresh(a){setTimeout(()=>{a.target.complete()},500)}getLaundriesById(){this.isLoading=!0,setTimeout(()=>{this.isLoading=!1,console.log("1")},2e3)}onSearchChange(a){}openPage(a){this.router.navigate([a])}applyFilter(){this.haptics.hapticsImpactLight()}}return(n=o).\u0275fac=function(a){return new(a||n)(e.rXU(c.Ix),e.rXU(h.o),e.rXU(c.nX),e.rXU(i.GD))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-view-laundry"]],decls:26,vars:6,consts:[[1,"ion-no-border",3,"translucent"],["slot","start"],["defaultHref","/tabs/tabs/tab1"],[3,"fullscreen"],["slot","fixed",3,"ionRefresh"],["pullingIcon","arrow-down","pullingText","Pull to refresh","refreshingSpinner","circles","refreshingText","Refreshing..."],["class","loading-container",4,"ngIf"],[1,"container"],[4,"ngIf"],["color","light",1,"ion-no-border"],["color","light"],["placeholder","Filter services","inputmode","decimal","type","decimal","mode","ios","showCancelButton","always",3,"ionChange","debounce"],[1,"filter-container"],[1,"filter-badge"],[1,"filter-badge-outline",3,"click"],[1,"loading-container"],["src","assets/icon/laundry.gif",1,"loading-img"],[2,"font-size","16px","font-weight","500"],["imageUrl","assets/laundry-demo.svg","name","Location Name","ratings","4.5","address","123 Main St, City, Country",3,"click"],["imageUrl","assets/laundry-demo.svg","name","Location Name","ratings","4.5","address","123 Main St, City, Country"]],template:function(a,r){1&a&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3),e.k0s(),e.j41(4,"ion-buttons",1),e.nrm(5,"ion-back-button",2),e.k0s()()(),e.j41(6,"ion-content",3)(7,"ion-refresher",4),e.bIt("ionRefresh",function(d){return r.handleRefresh(d)}),e.nrm(8,"ion-refresher-content",5),e.k0s(),e.DNE(9,m,2,0,"div",6),e.j41(10,"div",7),e.DNE(11,P,9,0,"ion-list",8),e.k0s()(),e.j41(12,"ion-footer",9)(13,"ion-toolbar",10)(14,"ion-searchbar",11),e.bIt("ionChange",function(d){return r.onSearchChange(d)}),e.k0s(),e.j41(15,"div",12)(16,"div",13),e.EFF(17,"Filters"),e.k0s(),e.j41(18,"div",14),e.bIt("click",function(){return r.applyFilter()}),e.EFF(19,"Near me"),e.k0s(),e.j41(20,"div",14),e.bIt("click",function(){return r.applyFilter()}),e.EFF(21,"Fast Delivery"),e.k0s(),e.j41(22,"div",14),e.bIt("click",function(){return r.applyFilter()}),e.EFF(23,"5 Km's Radius"),e.k0s(),e.j41(24,"div",14),e.bIt("click",function(){return r.applyFilter()}),e.EFF(25,"Highest Rated"),e.k0s()()()()),2&a&&(e.Y8G("translucent",!1),e.R7$(3),e.JRh(r.title),e.R7$(3),e.Y8G("fullscreen",!1),e.R7$(3),e.Y8G("ngIf",r.isLoading),e.R7$(2),e.Y8G("ngIf",!r.isLoading),e.R7$(3),e.Y8G("debounce",250))},dependencies:[g.bT,i.QW,i.W9,i.M0,i.eU,i.he,i.nf,i.AF,i.To,i.Ki,i.S1,i.BC,i.ai,i.Gw,i.el,y.H],styles:[".container[_ngcontent-%COMP%]{margin-top:10px;display:flex;flex-direction:column;justify-content:center;align-items:center}ion-badge[_ngcontent-%COMP%]{padding:10px}.filter-container[_ngcontent-%COMP%]{display:flex;overflow-x:auto;white-space:nowrap;padding:4px;background-color:#f0f0f04d;align-items:center}.filter-badge[_ngcontent-%COMP%]{display:flex;padding:10px 20px;margin:3px;background-color:#8f35c7;color:#fff;border-radius:20px;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background-color .3s ease;justify-content:center;align-items:center;height:30px;width:auto;font-size:12px}.filter-badge-outline[_ngcontent-%COMP%]{display:flex;padding:6px;margin:3px;border:1px solid #8F35C7;color:#8f35c7;border-radius:20px;cursor:pointer;white-space:nowrap;transition:background-color .3s ease;justify-content:center;align-items:center;height:30px;width:auto;font-size:12px}.filter-badge[_ngcontent-%COMP%]:hover{background-color:#8f35c7}.filter-container[_ngcontent-%COMP%]::-webkit-scrollbar{height:8px}.filter-container[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f0f0f0}.filter-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#8f35c7;border-radius:10px;border:2px solid #f0f0f0}"]}),o})()},{path:"add",loadChildren:()=>Promise.all([t.e(2076),t.e(6286)]).then(t.bind(t,6286)).then(n=>n.AddPageModule)},{path:"add-order-modal",loadChildren:()=>Promise.all([t.e(2076),t.e(7757)]).then(t.bind(t,7757)).then(n=>n.AddOrderModalPageModule)}];let b=(()=>{var n;class o{}return(n=o).\u0275fac=function(a){return new(a||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[c.iI.forChild(v),c.iI]}),o})();var L=t(541);let w=(()=>{var n;class o{}return(n=o).\u0275fac=function(a){return new(a||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[g.MD,p.YN,i.bv,L.G,b]}),o})()}}]);