var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};


function inArray(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}

// 深度合并对象
export function deepObjectMerge(FirstOBJ, SecondOBJ) {
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
            deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


//把二维数组转换成特定格式的json
export const convertJson2 = function (src_obj) {
    var new_obj = []
    for (let key in src_obj) {
        for (let key2 in src_obj[key]) {
            new_obj['data[' + key + ']' + '[' + key2 + ']'] = src_obj[key][key2]

        }

    }
    return new_obj
}

export const convertJson = function (src_obj, except = []) {
    var new_obj = {}
    for (let key in src_obj) {
        if (inArray(key, except)) {
            new_obj[key] = src_obj[key]
        } else {
            new_obj['data[0]' + '[' + key + ']'] = src_obj[key]
        }

    }
    return new_obj
}


export const getQueryStringByName = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}


export const formatDate = {
    format: function (date, pattern) {
        pattern = pattern || DEFAULT_PATTERN;
        return pattern.replace(SIGN_REGEXP, function ($0) {
            switch ($0.charAt(0)) {
                case 'y': return padding(date.getFullYear(), $0.length);
                case 'M': return padding(date.getMonth() + 1, $0.length);
                case 'd': return padding(date.getDate(), $0.length);
                case 'w': return date.getDay() + 1;
                case 'h': return padding(date.getHours(), $0.length);
                case 'm': return padding(date.getMinutes(), $0.length);
                case 's': return padding(date.getSeconds(), $0.length);
            }
        });
    },
    parse: function (dateString, pattern) {
        var matchs1 = pattern.match(SIGN_REGEXP);
        var matchs2 = dateString.match(/(\d)+/g);
        if (matchs1.length == matchs2.length) {
            var _date = new Date(1970, 0, 1);
            for (var i = 0; i < matchs1.length; i++) {
                var _int = parseInt(matchs2[i]);
                var sign = matchs1[i];
                switch (sign.charAt(0)) {
                    case 'y': _date.setFullYear(_int); break;
                    case 'M': _date.setMonth(_int - 1); break;
                    case 'd': _date.setDate(_int); break;
                    case 'h': _date.setHours(_int); break;
                    case 'm': _date.setMinutes(_int); break;
                    case 's': _date.setSeconds(_int); break;
                }
            }
            return _date;
        }
        return null;
    },
};


export const getNumFromCourse = function (mixin, chain = []) {
    if (mixin == null) {
        return 0
    }
    typeof (mixin) == 'string' ? mixin = JSON.parse(mixin) : '';

    if (typeof chain == 'object' && chain.length) {
        let temp_str = '';
        for (var i in chain) {
            temp_str += '["' + chain[i] + '"]';
        }
        //console.log(eval('mixin' + temp_str));
        return eval('mixin' + temp_str).length;
    } else {
        return 0;
    }

}



//export default convertJson2;
