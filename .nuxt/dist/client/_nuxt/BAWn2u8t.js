import{$ as r}from"./CW53YnbV.js";async function u(t,e,a,n="post"){let s=null;try{s=(n.toLowerCase()==="get"?await r.get(t,a):await r.post(t,e,a)).data}catch(o){throw o}return{data:s}}export{u};
