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
!(function($){
    "use strict";

    //filter single data
    var singleParse = function (singleJson) {
        var serializeObj = [], singleKey = '', jsonTemp = {};
        for(var i = 0; i < singleJson.length; i ++){
            var target = singleJson[i];
            var dotIndex = target.name.indexOf('.');
            var singleKeyTemp = target.name.substring(0,dotIndex);
            if (singleKey === singleKeyTemp){
                jsonTemp[target.name.substring(dotIndex+1)] = target.value;
            } else {
                if (singleKey !== ''){
                    var temp = {};
                    temp[singleKey] = jsonTemp;
                    serializeObj.push(temp);
                    jsonTemp = {};
                }
                singleKey = singleKeyTemp;
                jsonTemp[target.name.substring(dotIndex+1)] = target.value;

            }
        }
        return serializeObj;
    };

    //filter multiple data
    var multipleParse = function (multipleJson) {
        var serializeObj = [], multipleKey = '', jsonTemp = {}, serializeTemp = [], preIndex = '0';
        for(var i = 0; i < multipleJson.length; i ++){
            var target = multipleJson[i];
            var dotIndex = target.name.indexOf('.');
            var leftIndex = target.name.indexOf('[');
            var multipvaremp = target.name.substring(0,leftIndex);
            var curIndex =  target.name.substring(leftIndex+1,dotIndex-1);
            if (multipleKey === multipvaremp){
                if(curIndex === preIndex){
                    jsonTemp[target.name.substring(dotIndex+1)] = target.value;
                } else {
                    if (preIndex !== curIndex){
                        serializeTemp.push(jsonTemp);
                        jsonTemp = {};
                    }
                    preIndex = curIndex;
                    jsonTemp[target.name.substring(dotIndex+1)] = target.value;
                }
            } else {
                if (i === multipleJson.length - 1){
                    serializeTemp.push(jsonTemp);
                }
                if (multipleKey !== ''){
                    var temp = {};
                    temp[multipleKey] = serializeTemp;
                    serializeObj.push(temp);
                    serializeTemp = [];
                }
                jsonTemp = {};
                multipleKey = multipvaremp;
                preIndex = curIndex;
                jsonTemp[target.name.substring(dotIndex+1)] = target.value;
            }
        }
        return serializeObj;
    };
    
    var singleArrParse = function(singleArr){
        var serializeObj = [], singleKey = '', arryTemp = [];
        for(var i = 0; i < singleArr.length; i ++){
            var target = singleArr[i];
            var dotIndex = target.name.indexOf('[');
            var singleKeyTemp = target.name.substring(0,dotIndex);
            if (singleKey === singleKeyTemp){
                arryTemp.push(target.value);
            } else {
                if (singleKey !== ''){
                    var temp = {};
                    temp[singleKey] = arryTemp;
                    serializeObj.push(temp);
                    arryTemp = [];
                }
                singleKey = singleKeyTemp;
                arryTemp.push(target.value);
            }
        }
        return serializeObj;
    }

    /*数据合并*/
    var mergeJsonObj = function (generalJosn,singleJson,multipleJson,singleArrJson) {
        var geJson = generalJosn;
        for (var i=0;i<singleJson.length;i++){
            $.extend(geJson,singleJson[i]);
        }
        for (i=0;i<multipleJson.length;i++){
            $.extend(geJson,multipleJson[i]);
        }
        for (i=0;i<singleArrJson.length;i++){
            $.extend(geJson,singleArrJson[i]);
        }
        return geJson;
    };

    /**
     * jQuery 扩展，将复杂form表单转成json对象
     */
    $.fn.serializeJson = function(){
        var serializeObj = {},singvaremp = [],multipvaremp = [],sortArr = [],singleArrTemp=[];
        $(this.serializeArray()).each(function() {
            var target = this;
            if (target.value.length !== 0 && target.name.length !== 0) {
                var dotIndex = target.name.indexOf('.');
                if (dotIndex !== -1) {
                    var objName = target.name.substring(0,dotIndex);
                    if($.inArray(objName,sortArr) === -1){
                      sortArr.push(objName);
                    }
                    var leftIndex = target.name.indexOf('[');
                    if (leftIndex !== -1){
                        target['sortcols'] = $.inArray(objName,sortArr);
                        multipvaremp.push(target);
                    } else {
                        //add sort column
                        target['sortcols'] = $.inArray(objName,sortArr);
                        singvaremp.push(target);
                    }
                } else {
                    leftIndex = target.name.indexOf('[');
                    objName = target.name.substring(0,leftIndex);
                    if(leftIndex !== -1){
                        target['sortcols'] = $.inArray(objName,sortArr);
                        singleArrTemp.push(target);
                    } else{
                        serializeObj[target.name]=target.value;
                    }
                    
                }
            }
        });
        if(singvaremp.length > 0){
            singvaremp.sort(function(a,b) {
            return a.sortcols - b.sortcols;
            });
            singvaremp.push({name:'lastName',value:'lastValueTest'})
        }
        if(multipvaremp.length > 0){
            multipvaremp.sort(function(a,b) {
            return a.sortcols - b.sortcols;
            });
            multipvaremp.push({name:'lastName',value:'lastValueTest'})
        }
        if(singleArrTemp.length > 0){
            singleArrTemp.sort(function(a,b) {
                return a.sortcols - b.sortcols;
            });
            singleArrTemp.push({name:'lastName',value:'lastValueTest'})
        }

        return mergeJsonObj(serializeObj,singleParse(singvaremp),multipleParse(multipvaremp),singleArrParse(singleArrTemp));
    };

})(window.jQuery);
