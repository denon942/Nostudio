(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{349:function(e,t,r){"use strict";r(12),r(10),r(74),r(31),r(34);var n=r(3),o=(r(54),r(206),r(59),r(9),r(6),r(11),r(16),r(161),r(2)),l=r(48),c=r(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m=["sm","md","lg","xl"],v=m.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),h=m.reduce((function(e,t){return e["offset"+Object(c.u)(t)]={type:[String,Number],default:null},e}),{}),w=m.reduce((function(e,t){return e["order"+Object(c.u)(t)]={type:[String,Number],default:null},e}),{}),y={col:Object.keys(v),offset:Object.keys(h),order:Object.keys(w)};function O(e,t,r){var n=e;if(null!=r&&!1!==r){if(t){var o=t.replace(e,"");n+="-".concat(o)}return"col"!==e||""!==r&&!0!==r?(n+="-".concat(r)).toLowerCase():n.toLowerCase()}}var j=new Map;t.a=o.a.extend({name:"v-col",functional:!0,props:f(f(f(f({cols:{type:[Boolean,String,Number],default:!1}},v),{},{offset:{type:[String,Number],default:null}},h),{},{order:{type:[String,Number],default:null}},w),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var r=t.props,data=t.data,o=t.children,c=(t.parent,"");for(var d in r)c+=String(r[d]);var f=j.get(c);return f||function(){var e,t;for(t in f=[],y)y[t].forEach((function(e){var n=r[e],o=O(t,e,n);o&&f.push(o)}));var o=f.some((function(e){return e.startsWith("col-")}));f.push((e={col:!o||!r.cols},Object(n.a)(e,"col-".concat(r.cols),r.cols),Object(n.a)(e,"offset-".concat(r.offset),r.offset),Object(n.a)(e,"order-".concat(r.order),r.order),Object(n.a)(e,"align-self-".concat(r.alignSelf),r.alignSelf),e)),j.set(c,f)}(),e(r.tag,Object(l.a)(data,{class:f}),o)}})},359:function(e,t,r){"use strict";r.r(t);r(29),r(207),r(208);var n={layout:"top",data:function(){return{array:{},mailaddress:"",password:"",name:"",valid:!0,showPassword:!1,registemailRules:[function(e){return!!e||"入力欄が空白です。"},function(e){return/.+@.+\..+/.test(e)||"想定していない文字形式で入力されました。"},function(e){return e&&e.length<=50||"50字以内で入力してください。"},function(e){return/^\S+@\S+\.\S+$/.test(e)||"想定していない文字形式で入力されました。"}],registpassRules:[function(e){return!!e||"入力欄が空白です。"},function(e){return e&&8<=e.length||""},function(e){return e&&e.length<=20||"有効桁を超えた不正な値が入力されました。"},function(e){return/[a-zA-Z\d]$/.test(e)||"半角英数字のみで入力してください。"}],nameRules:[function(e){return!!e||"入力欄が空白です。"},function(e){return e&&e.length<=10||"有効桁を超えた不正な値が入力されました。"}]}},methods:{signUp:function(){this.array.email=this.mailaddress,this.array.password=this.password,this.array.name=this.name,this.$store.commit("user_regist",this.array)},signOut:function(){this.$store.commit("logout")}}},o=r(39),l=r(55),c=r.n(l),d=r(205),f=r(349),m=r(334),v=r(335),h=r(336),w=r(337),y=r(343),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[r("v-flex",{attrs:{xs12:""}},[r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{"prepend-icon":"mdi-email",counter:"",label:"メールアドレス",rules:e.registemailRules,hint:"メールアドレスは50字以下で記入してください。"},model:{value:e.mailaddress,callback:function(t){e.mailaddress=t},expression:"mailaddress"}}),e._v(" "),r("v-text-field",{attrs:{type:e.showPassword?"text":"password","prepend-icon":"mdi-lock-outline","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",label:"パスワード",counter:"",hint:"パスワードは8字以上20字以下にしてください。",rules:e.registpassRules},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),r("v-text-field",{attrs:{"prepend-icon":"mdi-account",counter:"",label:"name",rules:e.nameRules,hint:"ニックネームは10字以下で記入してください。"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"auto"}},[r("v-btn",{staticClass:"mr-4 white--text mb-5",attrs:{dark:"",outlined:"",rounded:"",disabled:!e.valid,color:"blue",width:"120"},on:{click:e.signUp}},[e._v("\n              登録\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VBtn:d.a,VCol:f.a,VFlex:m.a,VForm:v.a,VLayout:h.a,VRow:w.a,VTextField:y.a})}}]);