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
var e=function(e){for(var n=[],s="",r={},a=0;a<e.length;a++){var t=e[a],u=t.name.indexOf("."),i=t.name.substring(0,u);if(s===i)r[t.name.substring(u+1)]=t.value;else{if(""!==s){var l={};l[s]=r,n.push(l),r={}}s=i,r[t.name.substring(u+1)]=t.value}}return n},n=function(e){for(var n=[],s="",r={},a=[],t="0",u=0;u<e.length;u++){var i=e[u],l=i.name.indexOf("."),o=i.name.indexOf("["),f=i.name.substring(0,o),h=i.name.substring(o+1,l-1);if(s===f)r[i.name.substring(l+1)]=(h===t||(t!==h&&(a.push(r),r={}),t=h),i.value);else{if(u===e.length-1&&a.push(r),""!==s){var v={};v[s]=a,n.push(v),a=[]}s=f,t=h,(r={})[i.name.substring(l+1)]=i.value}}return n},s=function(e){for(var n=[],s="",r=[],a=0;a<e.length;a++){var t=e[a],u=t.name.indexOf("["),i=t.name.substring(0,u);if(s===i)r.push(t.value);else{if(""!==s){var l={};l[s]=r,n.push(l),r=[]}s=i,r.push(t.value)}}return n}
/*数据合并*/,r=function(e,n,s,r){for(var a=e,t=0;t<n.length;t++)o.extend(a,n[t]);for(t=0;t<s.length;t++)o.extend(a,s[t]);for(t=0;t<r.length;t++)o.extend(a,r[t]);return a};
//filter multiple data
/**
     * jQuery 扩展，将复杂form表单转成json对象
     */
o.fn.serializeJson=function(){var a={},t=[],u=[],i=[],l=[];return o(this.serializeArray()).each(function(){var e=this;if(0!==e.value.length&&0!==e.name.length){var n=e.name.indexOf(".");if(-1!==n){var s=e.name.substring(0,n);-1===o.inArray(s,i)&&i.push(s);var r=e.name.indexOf("[");-1!==r?(e.sortcols=o.inArray(s,i),u.push(e)):(
//add sort column
e.sortcols=o.inArray(s,i),t.push(e))}else r=e.name.indexOf("["),s=e.name.substring(0,r),-1!==r?(e.sortcols=o.inArray(s,i),l.push(e)):a[e.name]=e.value}}),0<t.length&&(t.sort(function(e,n){return e.sortcols-n.sortcols}),t.push({name:"lastName",value:"lastValueTest"})),0<u.length&&(u.sort(function(e,n){return e.sortcols-n.sortcols}),u.push({name:"lastName",value:"lastValueTest"})),0<l.length&&(l.sort(function(e,n){return e.sortcols-n.sortcols}),l.push({name:"lastName",value:"lastValueTest"})),r(a,e(t),n(u),s(l))}}(window.jQuery);