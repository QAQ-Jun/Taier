"use strict";(self.webpackChunktaier_website=self.webpackChunktaier_website||[]).push([[3252],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||p[d]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3818:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return m}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],c={title:"ClickHouse SQL",sidebar_label:"ClickHouse SQL"},s=void 0,l={unversionedId:"functions/task/clickhouse-sql",id:"functions/task/clickhouse-sql",title:"ClickHouse SQL",description:"\u65b0\u5efa\u4efb\u52a1",source:"@site/docs/functions/task/clickhouse-sql.md",sourceDirName:"functions/task",slug:"/functions/task/clickhouse-sql",permalink:"/Taier/docs/functions/task/clickhouse-sql",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/functions/task/clickhouse-sql.md",tags:[],version:"current",frontMatter:{title:"ClickHouse SQL",sidebar_label:"ClickHouse SQL"},sidebar:"docs",previous:{title:"Doris SQL",permalink:"/Taier/docs/functions/task/doris-sql"},next:{title:"TiDB SQL",permalink:"/Taier/docs/functions/task/tidb-sql"}},u=[{value:"\u65b0\u5efa\u4efb\u52a1",id:"\u65b0\u5efa\u4efb\u52a1",children:[],level:2},{value:"\u7f16\u8f91\u4efb\u52a1",id:"\u7f16\u8f91\u4efb\u52a1",children:[],level:2}],p={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u65b0\u5efa\u4efb\u52a1"},"\u65b0\u5efa\u4efb\u52a1"),(0,i.kt)("p",null,'\u8fdb\u5165"\u5f00\u53d1\u76ee\u5f55"\u83dc\u5355\uff0c\u70b9\u51fb"\u65b0\u5efa\u4efb\u52a1"\u6309\u94ae\uff0c\u5e76\u586b\u5199\u65b0\u5efa\u4efb\u52a1\u5f39\u51fa\u6846\u4e2d\u7684\u914d\u7f6e\u9879\uff0c\u914d\u7f6e\u9879\u8bf4\u660e\uff1a'),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u4efb\u52a1\u540d\u79f0\uff1a\u9700\u8f93\u5165\u82f1\u6587\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\u7ec4\u6210\uff0c\u4e0d\u8d85\u8fc764\u4e2a\u5b57\u7b26"),(0,i.kt)("li",{parentName:"ol"},"\u4efb\u52a1\u7c7b\u578b\uff1a\u9009\u62e9ClickHouse SQL"),(0,i.kt)("li",{parentName:"ol"},"\u5b58\u50a8\u4f4d\u7f6e\uff1a\u5728\u9875\u9762\u5de6\u4fa7\u7684\u4efb\u52a1\u5b58\u50a8\u7ed3\u6784\u4e2d\u7684\u4f4d\u7f6e"),(0,i.kt)("li",{parentName:"ol"},'\u63cf\u8ff0\uff1a\u957f\u5ea6\u4e0d\u8d85\u8fc7200\u4e2a\u7684\u4efb\u610f\u5b57\u7b26\n\u70b9\u51fb"\u4fdd\u5b58"\uff0c\u5f39\u7a97\u5173\u95ed\uff0c\u5373\u5b8c\u6210\u4e86\u65b0\u5efa\u4efb\u52a1')),(0,i.kt)("h2",{id:"\u7f16\u8f91\u4efb\u52a1"},"\u7f16\u8f91\u4efb\u52a1"),(0,i.kt)("p",null,"\u4efb\u52a1\u521b\u5efa\u597d\u540e\uff0c\u53ef\u4ee5\u5728\u4ee3\u7801\u7f16\u8f91\u5668\u4e2d\u7f16\u5199SQL\u8bed\u53e5\n\u7f16\u5199\u7684SQL\u8bed\u53e5\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"select * from table_test;\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u67e5\u8be2\u7ed3\u679c\u6700\u591a\u53ea\u5c55\u793a5000\u6761\u6570\u636e"))),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"ClickHouse SQL \u4f9d\u8d56ClickHouse\u6570\u636e\u6e90 \u8fd0\u884cClickHouse SQL\u524d\u8bf7\u786e\u4fdd\u5bf9\u5e94ClickHouse\u6570\u636e\u6e90\u5df2\u914d\u7f6e"))))}m.isMDXComponent=!0}}]);