(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{387:function(t,e,r){"use strict";r(50),r(30),r(127),r(79),r(243),r(13),r(63),r(25),r(27),r(69),r(70),r(80),r(62),r(100);var n=r(4),o=(r(192),r(3)),l=r(52),c=r(2);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m=["sm","md","lg","xl"],v=m.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{}),w=m.reduce((function(t,e){return t["offset"+Object(c.u)(e)]={type:[String,Number],default:null},t}),{}),y=m.reduce((function(t,e){return t["order"+Object(c.u)(e)]={type:[String,Number],default:null},t}),{}),h={col:Object.keys(v),offset:Object.keys(w),order:Object.keys(y)};function O(t,e,r){var n=t;if(null!=r&&!1!==r){if(e){var o=e.replace(t,"");n+="-".concat(o)}return"col"!==t||""!==r&&!0!==r?(n+="-".concat(r)).toLowerCase():n.toLowerCase()}}var j=new Map;e.a=o.a.extend({name:"v-col",functional:!0,props:f(f(f(f({cols:{type:[Boolean,String,Number],default:!1}},v),{},{offset:{type:[String,Number],default:null}},w),{},{order:{type:[String,Number],default:null}},y),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var r=e.props,data=e.data,o=e.children,c=(e.parent,"");for(var d in r)c+=String(r[d]);var f=j.get(c);return f||function(){var t,e;for(e in f=[],h)h[e].forEach((function(t){var n=r[t],o=O(e,t,n);o&&f.push(o)}));var o=f.some((function(t){return t.startsWith("col-")}));f.push((t={col:!o||!r.cols},Object(n.a)(t,"col-".concat(r.cols),r.cols),Object(n.a)(t,"offset-".concat(r.offset),r.offset),Object(n.a)(t,"order-".concat(r.order),r.order),Object(n.a)(t,"align-self-".concat(r.alignSelf),r.alignSelf),t)),j.set(c,f)}(),t(r.tag,Object(l.a)(data,{class:f}),o)}})},397:function(t,e,r){"use strict";r.r(e);r(244),r(245);var n={layout:"top",data:function(){return{array:{},mailaddress:"",password:"",valid:!0,showPassword:!1,registemailRules:[function(t){return!!t||"入力欄が空白です。"},function(t){return/.+@.+\..+/.test(t)||"想定していない文字形式で入力されました。"},function(t){return t&&t.length<=50||"50字以内で入力してください。"},function(t){return/^\S+@\S+\.\S+$/.test(t)||"想定していない文字形式で入力されました。"}],registpassRules:[function(t){return!!t||"入力欄が空白です。"},function(t){return t&&8<=t.length||""},function(t){return t&&t.length<=20||"有効桁を超えた不正な値が入力されました。"},function(t){return/[a-zA-Z\d]$/.test(t)||"半角英数字のみで入力してください。"}]}},methods:{signUp:function(){this.array.email=this.mailaddress,this.array.password=this.password,this.$store.commit("registUser",this.array)},signOut:function(){this.$store.commit("logout")}}},o=r(39),l=r(67),c=r.n(l),d=r(242),f=r(387),m=r(374),v=r(375),w=r(376),y=r(377),h=r(383),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[r("v-flex",{attrs:{xs12:""}},[r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-text-field",{attrs:{"prepend-icon":"mdi-email",counter:"",label:"メールアドレス",rules:t.registemailRules,hint:"メールアドレスは50字以下で記入してください。"},model:{value:t.mailaddress,callback:function(e){t.mailaddress=e},expression:"mailaddress"}}),t._v(" "),r("v-text-field",{attrs:{type:t.showPassword?"text":"password","prepend-icon":"mdi-lock-outline","append-icon":t.showPassword?"mdi-eye":"mdi-eye-off",label:"パスワード",counter:"",hint:"パスワードは8字以上20字以下にしてください。",rules:t.registpassRules},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"auto"}},[r("v-btn",{staticClass:"mr-4 white--text mb-5",attrs:{dark:"",outlined:"",rounded:"",disabled:!t.valid,color:"blue",width:"120"},on:{click:t.signUp}},[t._v("\n              登録\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:d.a,VCol:f.a,VFlex:m.a,VForm:v.a,VLayout:w.a,VRow:y.a,VTextField:h.a})}}]);