import{C as f,aq as m,bd as b,u as g,be as h,a7 as l,a8 as t,bf as C,$ as r,Z as x,ac as e,aC as E,ag as v}from"./index.0dd2a167.js";import{E as w}from"./el-card.ec02cdbe.js";import{E as D,a as L}from"./el-table-column.2d2dba61.js";const T=f({__name:"Friend",setup(k){const o=m({friendList:[]}),c=b(),n=g(!1);return(async()=>{const s={uin:c.botInfo.uin},{data:i,code:a}=await C(s,n);a===1&&o.friendList.push(...i)})(),(s,i)=>{const a=D,d=L,u=w,_=h;return r(),l(u,null,{default:t(()=>[x((r(),l(d,{data:o.friendList,style:{width:"100%;"},height:"900"},{default:t(()=>[e(a,{prop:"nickname",label:"qq\u6635\u79F0"}),e(a,{prop:"remark",label:"\u5907\u6CE8"}),e(a,{prop:"sex",label:"\u6027\u522B"},{default:t(p=>[E(v(p.row.sex==="female"?"\u5973":"\u7537"),1)]),_:1}),e(a,{prop:"user_id",label:"QQ"})]),_:1},8,["data"])),[[_,n.value]])]),_:1})}}});export{T as default};
