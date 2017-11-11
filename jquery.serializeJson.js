/*!
 * jQuery SerializeJson - A form serialization to json object Plugin
 *
 * The MIT License
 *
 * @author  : ulongx
 * @doc     : https://github.com/ulongx/serializeJson
 * @version : 0.1.0
 *
 */
!(function($){
    "use strict";

    //filter single data
    var singleParse = function (singleJson) {
        var serializeObj = [];
        var singleKey = '';
        var jsonTemp = {};
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
        var serializeObj = [];
        var multipleKey = '';
        var jsonTemp = {};
        var serializeTemp = [];
        var preIndex = '0';
        for(var i = 0; i < multipleJson.length; i ++){
            var target = multipleJson[i];
            var dotIndex = target.name.indexOf('.');
            var leftIndex = target.name.indexOf('[');
            var multipleTemp = target.name.substring(0,leftIndex);
            var curIndex =  target.name.substring(leftIndex+1,dotIndex-1);
            if (multipleKey === multipleTemp){
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
                multipleKey = multipleTemp;
                preIndex = curIndex;
                jsonTemp[target.name.substring(dotIndex+1)] = target.value;
            }
        }
        return serializeObj;
    };

    /*数据合并*/
    var mergeJsonObj = function (generalJosn,singleJson,multipleJson) {
        var geJson = generalJosn;
        for (var i=0;i<singleJson.length;i++){
            $.extend(geJson,singleJson[i]);
        }
        for (var i=0;i<multipleJson.length;i++){
            $.extend(geJson,multipleJson[i]);
        }
        return geJson;
    };

    /**
     * jQuery 扩展，将复杂form表单转成json对象
     */
    $.fn.serializeJson = function(){
        var serializeObj = {};
        var singleTemp = [];
        var multipleTemp = [];
        $(this.serializeArray()).each(function() {
            var target = this;
            if (target.value.length !== 0 && target.name.length !== 0) {
                var dotIndex = target.name.indexOf('.');
                if (dotIndex !== -1) {
                    var leftIndex = target.name.indexOf('[');
                    if (leftIndex !== -1){
                        multipleTemp.push(target);
                    } else {
                        singleTemp.push(target);
                    }
                } else {
                    serializeObj[target.name]=target.value;
                }
            }
        });
        singleTemp.length > 0 ? singleTemp.push({name:'lastName',value:'lastValueTest'}) : '';
        multipleTemp.length > 0 ? multipleTemp.push({name:'lastName',value:'lastValueTest'}) : '';
        return mergeJsonObj(serializeObj,singleParse(singleTemp),multipleParse(multipleTemp));
    };

})(window.jQuery);
