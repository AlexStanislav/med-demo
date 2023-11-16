import{e as b,O as k,o as r,c,F as _,r as x,m as o,a as e,f as m,g as w,h as L,i as g,j as P,b as p,d as f,w as h,t as u,s as T,n as O,_ as N}from"./index-bfeac26c.js";const S="/assets/patient-1-6d1e9e77.jpg",z="/assets/undraw_injured-464f862a.svg",B="/assets/undraw_doctor-ab8b2e6e.svg";var q=`
@layer primevue {
    .p-timeline {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }
    
    .p-timeline-left .p-timeline-event-opposite {
        text-align: right;
    }
    
    .p-timeline-left .p-timeline-event-content {
        text-align: left;
    }
    
    .p-timeline-right .p-timeline-event {
        flex-direction: row-reverse;
    }
    
    .p-timeline-right .p-timeline-event-opposite {
        text-align: left;
    }
    
    .p-timeline-right .p-timeline-event-content {
        text-align: right;
    }
    
    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
        flex-direction: row-reverse;
    }
    
    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
        text-align: right;
    }
    
    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
        text-align: left;
    }
    
    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
        text-align: left;
    }
    
    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
        text-align: right;
    }
    
    .p-timeline-event {
        display: flex;
        position: relative;
        min-height: 70px;
    }
    
    .p-timeline-event:last-child {
        min-height: 0;
    }
    
    .p-timeline-event-opposite {
        flex: 1;
        padding: 0 1rem;
    }
    
    .p-timeline-event-content {
        flex: 1;
        padding: 0 1rem;
    }
    
    .p-timeline-event-separator {
        flex: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    .p-timeline-event-marker {
        display: flex;
        align-self: baseline;
    }
    
    .p-timeline-event-connector {
        flex-grow: 1;
    }
    
    .p-timeline-horizontal {
        flex-direction: row;
    }
    
    .p-timeline-horizontal .p-timeline-event {
        flex-direction: column;
        flex: 1;
    }
    
    .p-timeline-horizontal .p-timeline-event:last-child {
        flex: 0;
    }
    
    .p-timeline-horizontal .p-timeline-event-separator {
        flex-direction: row;
    }
    
    .p-timeline-horizontal .p-timeline-event-connector {
        width: 100%;
    }
    
    .p-timeline-bottom .p-timeline-event {
        flex-direction: column-reverse;
    }
    
    .p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
        flex-direction: column-reverse;
    }
}
`,C={root:function(l){var i=l.props;return["p-timeline p-component","p-timeline-"+i.align,"p-timeline-"+i.layout]},event:"p-timeline-event",opposite:"p-timeline-event-opposite",separator:"p-timeline-event-separator",marker:"p-timeline-event-marker",connector:"p-timeline-event-connector",content:"p-timeline-event-content"},D=b(q,{name:"timeline",manual:!0}),K=D.load,V={name:"BaseTimeline",extends:L,props:{value:null,align:{mode:String,default:"left"},layout:{mode:String,default:"vertical"},dataKey:null},css:{classes:C,loadStyle:K},provide:function(){return{$parentInstance:this}}},y={name:"Timeline",extends:V,methods:{getKey:function(l,i){return this.dataKey?k.resolveFieldData(l,this.dataKey):i},getPTOptions:function(l,i){return this.ptm(l,{context:{index:i,count:this.value.length}})}}};function $(n,l,i,d,v,s){return r(),c("div",o({class:n.cx("root")},n.ptm("root"),{"data-pc-name":"timeline"}),[(r(!0),c(_,null,x(n.value,function(a,t){return r(),c("div",o({key:s.getKey(a,t),class:n.cx("event")},s.getPTOptions("event",t)),[e("div",o({class:n.cx("opposite",{index:t})},s.getPTOptions("opposite",t)),[m(n.$slots,"opposite",{item:a,index:t})],16),e("div",o({class:n.cx("separator")},s.getPTOptions("separator",t)),[m(n.$slots,"marker",{item:a,index:t},function(){return[e("div",o({class:n.cx("marker")},s.getPTOptions("marker",t)),null,16)]}),t!==n.value.length-1?m(n.$slots,"connector",{key:0,item:a,index:t},function(){return[e("div",o({class:n.cx("connector")},s.getPTOptions("connector",t)),null,16)]}):w("",!0)],16),e("div",o({class:n.cx("content")},s.getPTOptions("content",t)),[m(n.$slots,"content",{item:a,index:t})],16)],16)}),128))],16)}y.render=$;const I={class:"patients-view"},j=e("div",{class:"patients-detail-top"},null,-1),E=e("div",{class:"patients-detail-bottom"},null,-1),F={class:"patients-description"},M=e("h1",null,"Beneficii",-1),A=e("img",{src:S,alt:"blood-pressure-device"},null,-1),U={class:"patients-timeline"},G=e("img",{src:z,alt:"doctor",class:"timeline-detail-left"},null,-1),H=e("img",{src:B,alt:"doctor",class:"timeline-detail-right"},null,-1),J=e("h1",null,"Cum functioneaza",-1),Q=["src"],R={class:"timeline-content"},W={class:"patient-form-container"},X=e("h1",null,"Inscrie-te acum!",-1),Z={__name:"PatientView",setup(n){function l(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}const i=g("alternate");l()&&(i.value="left");const d=["Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet."],v=g([{status:"Te inregistrezi",icon:"pi pi-user-plus",color:"#2490eb",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur?",img:"https://img.icons8.com/ios/50/ffffff/signing-a-document.png"},{status:"Completeaza formularul",icon:"pi pi-check",color:"#84C0D8",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur?",img:"https://img.icons8.com/ios/50/ffffff/task.png"},{status:"Un doctor te va contacta",icon:"pi pi-send",color:"#707698",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur?",img:"https://img.icons8.com/dotty/50/ffffff/medical-doctor.png"}]);return(s,a)=>(r(),c("section",I,[j,E,e("section",F,[M,A,e("p",null,[P(" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius eaque atque, similique excepturi, laborum unde expedita rerum itaque explicabo consequatur sed. Enim necessitatibus accusantium architecto sit delectus officiis debitis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos repellat nostrum, et omnis velit nulla placeat! Illum omnis vero earum hic exercitationem placeat rerum molestiae consequuntur porro nemo. Perferendis, ut. "),e("ul",null,[(r(),c(_,null,x(d,t=>e("li",{key:t},u(t),1)),64))])]),p(f(T),{label:"Inscrie-te"})]),e("section",U,[G,H,J,p(f(y),{value:v.value,align:i.value},{marker:h(t=>[e("span",{class:"timeline-marker",style:O({backgroundColor:t.item.color})},[e("img",{src:t.item.img},null,8,Q)],4)]),content:h(t=>[e("div",R,[e("h2",null,u(t.item.status),1),e("p",null,u(t.item.description),1)])]),_:1},8,["value","align"])]),e("section",W,[X,p(N)])]))}};export{Z as default};
