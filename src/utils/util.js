/**
 * @desc 封装了一些项目常用方法.
 */

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}

/**
 * 获取当前dom坐标 用于动态svg
 * @param e
 * @returns {{x: number, y: number}}
 */
export function getElementPosition(e) {
    var x = 0, y = 0, width = 0, height = 0;
    if (e) {
        x = e.offsetLeft;
        y = e.offsetTop;
        width = e.scrollWidth;
        height = e.scrollHeight;
        e = e.offsetParent;
    }
    return { x, y, width, height };
}
/**
 * 过滤params为null的
 * @param obj
 * @returns {{}}
 */
export function dealParam(obj) {
    let param = {};
    if (obj === null || obj === undefined || obj === '') {
        return param;
    }
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '' && obj[key] !== 'all') {
            param[key] = obj[key];
        }
    }
    return param;
}
/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null || obj === undefined) {    // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        var hasProp = false;
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}
/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}
/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}
/**
 * @desc 生成一个随机id
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
        return '';
    }

    for (let prop in obj) {
        if (obj[prop].value === value) {
            return obj[prop].name;
        }
    }
}

/**
 * @desc 字符串超出固定字数，多余部分显示为'...'
 */
export function ellipsisWord(str, len) {
    if (str.length > len) {
        return str.substring(0, len) + '...';
    }
    return str;
}

/**
 * ashima
 * 判断字段是否异常，如果异常则返回‘--’
 * @param value
 * @returns {*}
 */
function fieldAnomaly(value) {
    if (typeof value === 'number' && !isNaN(value) || typeof value === 'string' && value.trim().length > 0) {
        return value;
    }
    if (!value) {
        return '--';
    }
    return value;
}
/*
* 如果标题字数超出指定长度，则多余部分显示...
* @param {number} 指定长度
* @param {string} 文本
*/
export function overtopOmit(num, str) {
    if (str && str.length > num) {
        return str.substring(0, num) + '...';
    }
    return str;
}
/*
* 如果数字超出指定长度，则多余部分显示...
* @param {number} 指定长度
* @param {number} 数字
*/
export function AllOmit(num, str) {
    if (typeof str === 'number') {
        str = String(str);
    }
    if (str && str.length > num) {
        return str.substring(0, num) + '...';
    }
    return str;
}
/**
 * 千分位 ashima
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
export function thousands(num, splitInfo) {
    if (isNaN(parseFloat(num))) {
        return '0';
    }
    return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, `$1${splitInfo ? '.' : ','}`);
}

/**
 * @qianyun
 * @desc 两个日期之间相差的天数
 * @param {startDate} 开始时间（eg: 2017-10-20）
 * @param {endDate} 结束时间 （eg: 2017-12-20）
 */
export function DateDiff(startDate, endDate) {
    var aDate, oDate1, oDate2, iDays;
    var sDate1 = endDate;   // sDate1和sDate2是2008-12-13格式
    var sDate2 = startDate;
    aDate = sDate1.split('-');
    oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);   // 转换为12/13/2008格式
    aDate = sDate2.split('-');
    oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
    // iDays = parseInt((Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) + 1, 0);
    var i = (oDate1 - oDate2) / 1000 / 60 / 60 / 24;
    if (i < 0) {
        i -= 1;
    }
    else {
        i += 1;
    }
    iDays = i;   // 把相差的毫秒数转换为天数
    return iDays;
}

/**
 * @desc 根据传递的对象, 以及嵌套对象的属性名, 来获取属性值
 * @param {object} obj 需要遍历的对象,
 * @param {string} props 需要遍历的对象属性名, 可传递一个到多个.
 * @param {string/number} defaultValue 默认属性值为空时返回的值.
 */
export function getValueByProps(obj) {
    if (arguments.length < 2) {
        return;
    }

    var currentObj = obj;
    var props = Array.prototype.slice.call(arguments, 1);
    var defaultVal = props.pop();
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (isNotEmpty(currentObj)) {
            currentObj = currentObj[prop];
        }

        if (isEmpty(currentObj)) {
            return defaultVal;
        }

        if (i === props.length - 1) {
            if (isObject(currentObj) && isNotEmpty(currentObj[defaultVal])) {
                return currentObj[defaultVal];
            }
            return currentObj;
        }
    }
}

export function isIE(version) {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var match = userAgent.match(/msie ([\d+\.]+)/) || userAgent.match(/rv:([\d+\.]+)\) like gecko/);
    if (match) {
        var IE_version = parseFloat(match[1]); // 当前IE版本号
        version = parseFloat(version);
        return !version || version === IE_version;
    }
    return false;
}

/**
 * @param {*} value 判断table数据 无显示--
 */
export const formatValue = value => {
    if (value === undefined || value === null || value === 'null' || value === 'undefined' || value === '') {
        return '--';
    } else {
        if (value.length > 18) {
            value = value.substring(0, 17) + '...';
        }
        return value;
    }
};