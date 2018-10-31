/*!
 * jQuery SerializeJson - A form serialization to json object Plugin
 *
 * The MIT License
 *
 * @author  : ulongx
 * @doc     : https://github.com/ulongx/serializeJson
 * @version : 0.1.1
 *
 */
!function(o){"use strict";
//filter single data
var e=function(e){for(var n=[],s="",r={},a=0;a<e.length;a++){var t=e[a],u=t.name.indexOf("."),l=t.name.substring(0,u);if(s===l)r[t.name.substring(u+1)]=t.value;else{if(""!==s){var i={};i[s]=r,n.push(i),r={}}s=l,r[t.name.substring(u+1)]=t.value}}return n},n=function(e){for(var n=[],s="",r={},a=[],t="0",u=0;u<e.length;u++){var l=e[u],i=l.name.indexOf("."),o=l.name.indexOf("["),f=l.name.substring(0,o),h=l.name.substring(o+1,i-1);if(s===f)r[l.name.substring(i+1)]=(h===t||(t!==h&&(a.push(r),r={}),t=h),l.value);else{if(u===e.length-1&&a.push(r),""!==s){var v={};v[s]=a,n.push(v),a=[]}s=f,t=h,(r={})[l.name.substring(i+1)]=l.value}}return n},s=function(e){for(var n=[],s="",r=[],a=0;a<e.length;a++){var t=e[a],u=t.name.indexOf("["),l=t.name.substring(0,u);if(s===l)r.push(t.value);else{if(""!==s){var i={};i[s]=r,n.push(i),r=[]}s=l,r.push(t.value)}}return n}
/*数据合并*/,r=function(e,n,s){for(var r=e,a=0;a<n.length;a++)o.extend(r,n[a]);for(var a=0;a<s.length;a++)o.extend(r,s[a]);return r};
//filter multiple data
/**
     * jQuery 扩展，将复杂form表单转成json对象
     */
o.fn.serializeJson=function(){var a={},t=[],u=[],l=[],i=[];return o(this.serializeArray()).each(function(){var e=this;if(0!==e.value.length&&0!==e.name.length){var n=e.name.indexOf(".");if(-1!==n){var s=e.name.substring(0,n),r;-1===o.inArray(s,l)&&l.push(s),-1!==(r=e.name.indexOf("["))?(e.sortcols=o.inArray(s,l),u.push(e)):(
//add sort column
e.sortcols=o.inArray(s,l),t.push(e))}else{var r;-1!==(r=e.name.indexOf("["))?(e.sortcols=o.inArray(s,l),i.push(e)):a[e.name]=e.value}}}),0<t.length&&(t.sort(function(e,n){return e.sortcols-n.sortcols}),t.push({name:"lastName",value:"lastValueTest"})),0<u.length&&(u.sort(function(e,n){return e.sortcols-n.sortcols}),u.push({name:"lastName",value:"lastValueTest"})),0<i.length&&(i.sort(function(e,n){return e.sortcols-n.sortcols}),i.push({name:"lastName",value:"lastValueTest"})),console.log(s(i)),r(a,e(t),n(u))}}(window.jQuery);