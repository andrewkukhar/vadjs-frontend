"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[345],{3345:function(e,n,r){r.r(n);var t=r(4165),a=r(5861),s=r(4942),i=r(1413),o=r(9439),l=r(2791),c=r(7689),u=r(1224),d=r(9431),h=r(6151),p=r(1889),m=r(890),f=r(9276),x=r(9164),Z=r(3239),v=r(184);n.default=function(){var e=(0,c.s0)(),n=(0,l.useState)(!1),r=(0,o.Z)(n,2),j=r[0],b=r[1],g=(0,l.useContext)(u.V).handleLogin,w=(0,l.useState)({email:"",password:""}),k=(0,o.Z)(w,2),y=k[0],C=k[1],P=y.email,S=y.password,L=function(e){return C((0,i.Z)((0,i.Z)({},y),{},(0,s.Z)({},e.target.name,e.target.value)))},T=function(){var n=(0,a.Z)((0,t.Z)().mark((function n(r){var a,s;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),b(!0),n.prev=2,n.next=5,fetch("".concat("https://vandjs-backend-api-b8d0ced4040e.herokuapp.com","/auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(y)});case 5:if(!(a=n.sent).ok){n.next=12;break}return n.next=9,a.json();case 9:s=n.sent,g(s),e("/home");case 12:n.next=17;break;case 14:n.prev=14,n.t0=n.catch(2),console.error(n.t0);case 17:return n.prev=17,b(!1),n.finish(17);case 20:case"end":return n.stop()}}),n,null,[[2,14,17,20]])})));return function(e){return n.apply(this,arguments)}}();return(0,v.jsxs)(x.Z,{maxWidth:"xs",style:{overflow:"hidden"},children:[(0,v.jsx)(f.Z,{sx:{mt:8,mb:2},children:(0,v.jsx)(m.Z,{variant:"h4",children:"Login"})}),(0,v.jsxs)(f.Z,{component:"form",onSubmit:function(e){return T(e)},children:[(0,v.jsxs)(p.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(p.ZP,{item:!0,xs:12,children:(0,v.jsx)(d.Z,{required:!0,fullWidth:!0,id:"email",type:"email",label:"Email Address",name:"email",autoComplete:"email",value:P,onChange:function(e){return L(e)},error:!P,helperText:!P&&"Valid email is required"})}),(0,v.jsx)(p.ZP,{item:!0,xs:12,children:(0,v.jsx)(d.Z,{required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:S,onChange:function(e){return L(e)},inputProps:{minLength:6},error:!!S&&S.length<6,helperText:!!S&&S.length<6&&"Password should be at least 6 characters"})})]}),(0,v.jsx)(f.Z,{sx:{mt:2},children:(0,v.jsx)(h.Z,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",disabled:j,children:j?(0,v.jsx)(Z.Z,{size:24,color:"inherit"}):"Login"})})]})]})}},9276:function(e,n,r){var t=(0,r(3814).Z)();n.Z=t}}]);
//# sourceMappingURL=345.0632fbef.chunk.js.map