const uuid = require('uuid').v1;
let storeJS = [{
  id: uuid(),
  type: '数据类型',
  name: 'getType',
  title: '判断数据类型',
  desc: '判断参数类型，支持所有类型，包括undefined、null与function',
  params: {
    a: {
      type: 'all',
    },
  },
  _define: function (a) {
    let type = typeof a;
    if (type != "object") {
      return type;
    }
    return Object.prototype.toString.call(a).replace(/^\[object (\S+)\]$/, '$1');
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'isVaildDate',
  title: '判断年月日是否合法',
  desc: '判断输入的年月日是否合法，输入的年月日参数都要是数字number类型',
  params: {
    sYear: {
      type: 'number',
    },
    sMonth: {
      type: 'number',
    },
    sDay: {
      type: 'number',
    }
  },
  _define: function (sYear, sMonth, sDay) {
    let IsNumber = (sVal) => {
      if (sVal === '' && sVal == null) {
        return false;
      }
      return !isNaN(sVal) ? true : false;
    }
    if (IsNumber(sYear) && IsNumber(sMonth) && IsNumber(sDay)) {
      sYear = parseInt(sYear);
      sMonth = parseInt(sMonth);
      sDay = parseInt(sDay);
      let date = new Date(sYear, sMonth - 1, sDay);
      if (sYear == date.getFullYear() && sMonth - 1 == date.getMonth() && sDay == date.getDate()) {
        return true;
      } else {
        return false
      }
    } else {
      console.log("年月日不合法，其中存在非法字符！");
      return false
    }
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'getDaysOfMonth',
  title: '获取制定年月的天数',
  desc: '获取指定年月的天数',
  params: {

    sYear: {
      type: 'number',
    },
    sMonth: {
      type: 'number'
    }

  },
  _define: function (sYear, sMonth) {
    let date = new Date(sYear, sMonth, 0);
    return (parseInt(date.getDate()));
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'getWeekOfDay',
  title: '获取日期是星期几',
  desc: '获取指定具体年月日是星期几',
  params: {
    sYear: {
      type: 'number',
    },
    sMonth: {
      type: 'number'
    },
    sDay: {
      type: 'number'
    }

  },
  _define: function (sYear, sMonth, sDay) {
    let str = '';
    let date = new Date(sYear, sMonth - 1, sDay);
    switch (date.getDay()) {
      case 0:
        str = '星期天';
        break;
      case 1:
        str = '星期一';
        break;
      case 2:
        str = '星期二';
        break;
      case 3:
        str = '星期三';
        break;
      case 4:
        str = '星期四';
        break;
      case 5:
        str = '星期五';
        break;
      case 6:
        str = '星期六';
        break;
      default:
        str = '输入数据不正确';
        break;
    }
    return str;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'getDaysOfTwoDate',
  title: '日期间隔',
  desc: '获取两个日期之间的间隔天数',
  params: {

    sDateStr1: {
      type: 'string',
    },
    sDateStr2: {
      type: 'string',
    }

  },
  _define: function (sDateStr1, sDateStr2) {
    let sDate1 = new Date(sDateStr1),
      sDate2 = new Date(sDateStr2);
    let BetweenDays = Math.floor(Math.abs(Date.parse(sDate2) - Date.parse(sDate1)) / (1000 * 60 * 60 * 24));
    return BetweenDays;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'getMonthsOfTwoDate',
  title: '获取月份差',
  desc: '获取两个日期之间的月份差',
  params: {

    sDateStr1: {
      type: 'string',
    },
    sDateStr2: {
      type: 'string',
    }

  },
  _define: function (sDateStr1, sDateStr2) {
    let sDate1 = new Date(sDateStr1),
      sDate2 = new Date(sDateStr2);
    let sumMonths = Math.abs((sDate2.getFullYear() - sDate1.getFullYear()) * 12 + (sDate2.getMonth() - sDate1.getMonth()))
    return sumMonths;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'getTimeFormat',
  title: '秒转时分秒',
  desc: '把输入的秒数转换成时分秒的格式',
  params: {

    s: {
      type: 'number',
    }

  },
  _define: function (s) {
    let t;
    if (s > -1) {
      let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      hour = hour < 10 ? '0' + hour : hour;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      t = hour + ":" + min + ":" + sec;
    }
    return t;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'getThousandNum',

  title: '数字千分位输出',
  desc: '把输入的数字转换成千分位输出',
  params: {

    num: {
      type: 'number',
    }
  },
  _define: function (num) {
    return num.toString().replace(/\d+/, (n) => {
      return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
        return $1 + ",";
      });
    });
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'randomFun',

  title: '随机数',
  desc: '输入取值范围max，min,获取在这一范围的随机数',
  params: {

    max: {
      type: 'number',
    },
    min: {
      type: 'number',
    }
  },
  _define: function (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'maxStringLoad',

  title: '出现次数的字符',
  desc: '计算一个字符串中出现次数最多的字符及次数',
  params: {

    str: {
      type: 'string'
    }

  },
  _define: function (str) {
    let obj = {};
    for (let i = 0; i < str.length; i++) {
      let key = str[i];
      if (obj[key]) {
        obj[key]++;
      } else {
        obj[key] = 1;
      }
    }
    let maxCount = 0;
    let maxString = "";
    for (let key in obj) {
      if (maxCount < obj[key]) {
        maxCount = obj[key];
        maxString = key;
      }
    }
    let outPut = `出现次数最多的字母:${maxString},出现了${maxCount}次`
    return outPut;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'everyStrLoad',

  title: '每个字符出现的次数',
  desc: '输入字符串中的每个字符出现了多少次',
  params: {

    str: {
      type: 'string',
    }
  },
  _define: function (str) {
    let obj = {};
    for (let i of str) {
      key = i;
      if (obj[key]) {
        obj[key]++;
      } else {
        obj[key] = 1;
      }
    }
    return obj;
  },
  _return: 'object'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'appointStrLoad',

  title: '指定字符出现的次数',
  desc: '获取指定字符出现的次数',
  params: {

    str: {
      type: 'string',
    },
    strSplit: {
      type: 'string',
    }

  },
  _define: function (str, strSplit) {
    return str.split(strSplit).length - 1
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'checkStrExist',

  title: '查询字符是否存在',
  desc: '查看字符串中是否存在指定的字符',
  params: {

    str: {
      type: 'string',
    },
    name: {
      type: 'string',
    }

  },
  _define: function (str, name) {
    if (str.indexOf(name) > -1) {
      return true;
    } else {
      return false;
    }
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'dateFrom',

  title: '自定义时间格式',
  desc: '输入时间格式和秒数，输出自定的格式',
  params: {

    form: {
      type: 'string',
    },
    date: {
      type: 'number',
    }

  },
  _define: function (form, date) {
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "S": date.getMilliseconds()
    };
    if (/(y+)/.test(form))
      form = form.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(form))
        form = form.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return form;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'factorial',

  title: '阶乘',
  desc: '阶乘，递归方法',
  params: {

    sVal: {
      type: 'number',
    }
  },
  _define: function (sVal) {
    if (sVal > 1) {
      return sVal * factorial(sVal - 1);
    } else {
      return 1;
    }
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'transfer',
  title: '进制',
  desc: '把m进制的数字num转为n进制',
  params: {

    num: {
      type: 'number',
    },
    m: {
      type: 'number',
    },
    n: {
      type: 'number',
    },
  },
  _define: function (num, m, n) {
    let s = num + '';
    return parseInt(s, m).toString(n);
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'gys',

  title: '最大公约数',
  desc: '求两数间的最大公约数，递归方法',
  params: {

    n1: {
      type: 'number',
    },
    n2: {
      type: 'number',
    }
  },
  _define: function (n1, n2) {
    let n3 = n1 % n2;
    if (n3 == 0) {
      return n2;
    }
    return gys(n2, n3);
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'arrHaveNum',

  title: '查询数组元素',
  desc: '数组中是否有这个元素 ',
  params: {

    arr: {
      type: 'array',
    },
    num: {
      type: 'number',
    }
  },
  _define: function (arr, num) {
    for (let i in arr) {
      if (arr[i] === num) {
        return true;
      }
    }
    return false;
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'arrByRand',

  title: '随机不重复数组',
  desc: '指定数组长度和取值范围，随机获取不重复的数组 ',
  params: {

    len: {
      type: 'number',
    },
    min: {
      type: 'number',
    },
    max: {
      type: 'number',
    }
  },
  _define: function (len, min, max) {
    let arr = [];
    for (let i = 0; i < len; i++) {
      let value = parseInt(Math.random() * (max - min) + min);
      if (arr.indexOf(value) < 0) {
        arr.push(value);
      } else {
        i--;
      }
    }
    return arr;
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'arrIsEqual',

  title: '判断数组相等',
  desc: '判断两个数组是否相等 ',
  params: {

    arr1: {
      type: 'array',
    },
    arr2: {
      type: 'array',
    },
  },
  _define: function (arr1, arr2) {
    if (arr1 === arr2) {
      return true;
    } else {
      if (arr1.length !== arr2.length) {
        return false;
      } else {
        for (let i in arr1) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        return true;
      }
    }
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '算法实现',
  name: 'hexColor',

  title: '随机16进制颜色',
  desc: '随机生成带#号的随机16进制颜色',
  params: {},
  _define: function () {
    let str = '#';
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i++) {
      let index = Number.parseInt(Math.random() * 16);
      str += arr[index]
    }
    return str;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '算法实现',
  name: 'randomColor',

  title: '产生rgb颜色值',
  desc: '随机产生rgb颜色值',
  params: {},
  _define: function () {
    return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'reverseStr',

  title: '逆序字符串',
  desc: '逆序输出的字符串 ',
  params: {

    str: {
      type: 'string',
    }
  },
  _define: function (str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
      result += str[i];
    }
    return result;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'flatten',

  title: '数组扁平化',
  desc: '数组扁平化是指将一个多维数组变为一维数组 ',
  params: {

    arr: {
      type: 'array',
    }
  },
  _define: function (arr) {
    if (!Array.isArray(arr)) return;
    return arr.reduce((initValue, cur) => {
      return initValue.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'mergeArr',

  title: '数组合并',
  desc: '合并多个数组 ',
  params: {

    arr: {
      type: 'array',
    },
    everyArr: {
      type: 'array',
    }
  },
  _define: function (arr, ...everyArr) {
    if (!Array.isArray(arr)) return;
    return arr.concat(...everyArr);
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数据格式',
  name: 'isLegalEmail',

  title: 'email格式校验',
  desc: '检验email格式是否合法',
  params: {

    email: {
      type: 'string',
    }
  },
  _define: function (email) {
    return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数据格式',
  name: 'isLegalIdCard',

  title: '身份证格式校验',
  desc: '检验身份证格式是否合法',
  params: {

    idCard: {
      type: 'string',
    }
  },
  _define: function (email) {
    return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idCard);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数据格式',
  name: 'isLegalPhone',

  title: '手机号格式校验',
  desc: '检验手机号格式是否合法',
  params: {

    phone: {
      type: 'number',
    }
  },
  _define: function (phone) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '日期处理',
  name: 'pastTime',

  title: '时间节点描述',
  desc: '输入开始时间(毫秒数)，计算当前时间到开始时间的时差，得出时间节点的描述',
  params: {

    startTime: {
      type: 'number',
    }
  },
  _define: function (startTime) {
    let currentTime = Date.parse(new Date()),
      time = currentTime - startTime,
      day = parseInt(time / (1000 * 60 * 60 * 24)),
      hour = parseInt(time / (1000 * 60 * 60)),
      min = parseInt(time / (1000 * 60)),
      month = parseInt(day / 30),
      year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    return '刚刚'
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'trimStr',

  title: '去除字符串中的空格',
  desc: '传入字符串str,选择type类型   1-所有空格  2-前后空格  3-前空格 4-后空格,返回去除空格的字符串中',
  params: {

    str: {
      type: 'string',
    },
    type: {
      type: 'number',
    }

  },
  _define: function (str, type) {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'strlen',

  title: '字符串长度',
  desc: '计算传入的中文字符串和英文字符串长度',
  params: {

    str: {
      type: 'string',
    }
  },
  _define: function (str) {
    let regch = /[\u4e00-\u9fa5]/;
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      if (regch.test(str.charAt(i)) == true) {

        length += 2;
      } else {

        length += 1;
      }
    }
    return length;
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'checkPwd',

  title: '检测密码的等级强度',
  desc: '通过输入密码的字符串，检测输入密码的等级强度',
  params: {

    str: {
      type: 'string',
    }
  },
  _define: function (str) {
    let nowLv = 0;
    if (str.length < 6) {
      return nowLv
    }
    if (/[0-9]/.test(str)) {
      nowLv++
    }
    if (/[a-z]/.test(str)) {
      nowLv++
    }
    if (/[A-Z]/.test(str)) {
      nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
      nowLv++
    }
    return nowLv;
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'upsetArr',

  title: '打乱数组的顺序',
  desc: '通过输入数组，返回乱序的数组结果',
  params: {

    arr: {
      type: 'array',
    }
  },
  _define: function (arr) {
    return arr.sort(() => {
      return Math.random() - 0.5
    });
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'mxMiArr',

  title: '数组的最大最小值',
  desc: '通过输入数组arr和选择type(max或min),返回数组的最大最小值',
  params: {

    arr: {
      type: 'array',
    },
    type: {
      type: 'string'
    }
  },
  _define: function (arr, type) {
    if (type === 'max') {
      return Math.max.apply(null, arr);
    } else if (type === 'min') {
      return Math.min.apply(null, arr);
    }
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'sumArr',

  title: '数组求和 ',
  desc: '计算数值数组的和',
  params: {

    arr: {
      type: 'array',
    }
  },
  _define: function (arr) {
    let sumText = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
      sumText += arr[i];
    }
    return sumText
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'removeArrayOfValue',

  title: '删除指定的数组元素',
  desc: '通过输入数组，指定删除值为val的数组元素,type表示删除的方式,默认为完全匹配，type为%表示关键字匹配，返回删除的元素',
  params: {

    arr: {
      type: 'array',
    },
    val: {
      type: 'string',
    },
    type: {
      type: 'string',
    },

  },
  _define: function (arr, val, type) {
    return arr.filter((item) => {
      return type === '%' ? item.indexOf(val) !== -1 : item !== val
    })
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '对象操作',
  name: 'filterParams',

  title: '格式化对象',
  desc: '格式化对象 清除对象中的空和null',
  params: {

    obj: {
      type: 'object',
    }

  },
  _define: function (obj) {
    let _newPar = {};
    for (let key in obj) {
      if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
        _newPar[key] = obj[key];
      }
    }
    return _newPar;
  },
  _return: 'object'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'upDigit',

  title: '将数组的人民币转换为大写',
  desc: '将数组的人民币转换为大写,输入钱数num,返回大写的人民币名称',
  params: {

    num: {
      type: 'number',
    }

  },
  _define: function (num) {
    let fraction = ['角', '分', '厘'];
    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '￥-' : '￥';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = '';
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }

      s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '对象操作',
  name: 'getUrlQuery',

  title: '获取URL参数',
  desc: '获取URL参数，返回其中查询参数的对象表示',
  params: {

    url: {
      type: 'string',
    }

  },
  _define: function (url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1),
      _arrS = _pa.split('&'),
      _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
      let pos = _arrS[i].indexOf('=');
      if (pos == -1) {
        continue;
      }
      let name = _arrS[i].substring(0, pos),
        value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
      _rs[name] = value;
    }
    return _rs;
  },
  _return: 'object'
},
{
  id: uuid(),
  type: '对象操作',
  name: 'setUrlQuery',

  title: '设置URL查询参数',
  desc: '输入参数为一个对象,返回一个使用&连接的字符串',
  params: {

    obj: {
      type: 'object',
    }

  },
  _define: function (obj) {
    let _rs = [];
    for (let p in obj) {
      if (obj[p] != null && obj[p] != '') {
        _rs.push(p + '=' + obj[p])
      }
    }
    return _rs.join('&');
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '算法实现',
  name: 'randomNum',

  title: '两个数之间的随机数',
  desc: '返回两个数之间的随机数',
  params: {

    n1: {
      type: 'number',
    },
    n2: {
      type: 'number',
    }

  },
  _define: function (n1, n2) {
    if (arguments.length === 2) {
      return Math.round(n1 + Math.random() * (n2 - n1));
    } else if (arguments.length === 1) {
      return Math.round(Math.random() * n1)
    } else {
      return Math.round(Math.random() * 255)
    }
  },
  _return: 'number'
},
{
  id: uuid(),
  type: '对象操作',
  name: 'setCookie',
  title: '设置cookie',
  desc: '设置cookie名字,值,时间',
  params: {
    name: {
      type: 'string'
    },
    value: {
      type: 'string'
    },
    Hours: {
      type: 'number'
    }

  },
  _define: function (name, value, Hours) {
    let d = new Date();
    let offset = 8;
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let nd = utc + (3600000 * offset);
    let exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" +
      exp.toGMTString() + ";domain=sicd.com;";
  },
  _return: 'object'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'trimStr',
  title: '去除空格',
  desc: '去除字符串所有空格/前后空格/前空格/后空格',
  params: {
    str: {
      type: 'string',
    },
    type: {
      type: 'number',
      value: [1, 2, 3, 4] // 1-所有空格  2-前后空格  3-前空格 4-后空格
    }
  },
  _define: function (str, type) {
    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
    switch (type) {
      case 1:
        return str.replace(/\s/g, "");
      case 2:
        return str.replace(/(^\s)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s)/g, "");
      case 4:
        return str.replace(/(\s$)/g, "");
      default:
        return str;
    }
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'turnCase',
  title: '字符串大小写转换',
  desc: '字符串全大写/全小写/首字母大写转换',
  params: {
    str: {
      type: 'string',
    },
    type: {
      type: 'number',
      value: [1, 2, 3] // 1-全大写 2-全小写 3-首字母大写 
    }
  },
  _define: function (str, type) {
    switch (type) {
      case 1:
        return str.toUpperCase()
      case 2:
        return str.toLowerCase();
      case 3:
        return str[0].toUpperCase() + str.substr(1).toLowerCase()
      default:
        return str;
    }
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'parseCase',
  title: '大小写相互转换',
  desc: '字符串大小写相互转换',
  params: {
    str: {
      type: 'string',
    },
  },
  _define: function (str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      let temp = str.charAt(i);
      let code = temp.charCodeAt();
      if ('a' <= temp && temp <= 'z') {
        temp = String.fromCharCode(code - 32);
      } else if ('A' <= temp && temp <= 'Z') {
        temp = String.fromCharCode(code + 32);
      }
      result += temp;
    }
    return result;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '字符串处理',
  name: 'reverseStr',
  title: '逆序输出',
  desc: '源字符串进行逆序输出的字符串',
  params: {
    str: {
      type: 'string',
    },
  },
  _define: function (str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
      result += str[i];
    }
    return result;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数组操作',
  name: 'filterArr',
  title: '过滤数组',
  desc: '从对象数组中根据对象的key筛选值等于value的对象，如果键值对唯一则返回对象，如果不唯一则返回对象数组。',
  params: {
    key: {
      type: 'String'
    },
    value: {
      type: 'String'
    }
  },
  _define: function (key, value) {
    const ary = this;
    const newAry = [];
    for (let i = 0; i < ary.length; i++) {
      if (ary[i][key] === value) {
        newAry.push(ary[i]);
      }
    }
    if (newAry.length === 1) {
      return newAry[0];
    } else {
      return newAry;
    }
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'onlyArr',
  title: '数组去重',
  desc: ' 待去重的数组进行去重后的数组',
  params: {
    arr: {
      type: 'array',
    },
  },
  _define: function (arr) {
    if (!Array.isArray(arr)) return;
    return Array.from(new Set([...arr]))
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'flatArr',
  title: '扁平化数组',
  desc: '将传入的数组进行扁平化',
  params: {
    arr: {
      type: 'array',
    },
  },
  _define: function (arr) {
    if (!Array.isArray(arr)) return;
    return arr.reduce((initValue, cur) => {
      return initValue.concat(Array.isArray(cur) ? flat(cur) : cur)
    }, [])
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'unidArr',
  title: '多维数组转一维数组',
  desc: '将多维数组转一维数组',
  params: {
    arr: {
      type: 'array',
    },
  },
  _define: function (arr) {
    let arr1 = (arr + '').split(',')
    let arr2 = arr1.map(x => {
      return Number(x);
    });
    return arr2;
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'sortArr',
  title: '数组排序',
  desc: '将传入的数组进行升序/降序',
  params: {
    arr: {
      type: 'array',
    },
    rule: {
      type: 'number',
      value: [1, 0] // 1-升序 0-降序
    },
  },
  _define: function (arr, rule) {
    if (!Array.isArray(arr)) return;
    if (rule && rule !== 1 && rule !== 0) return;
    return rule === 1 ? arr.sort((a, b) => a - b) : arr.sort((a, b) => b - a)
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'mergeArr',
  title: '数组合并',
  desc: '合并数组,可放置多个',
  params: {
    arr: {
      type: 'array',
    },
    everyArr: {
      type: 'array',
    },
  },
  _define: function (arr, ...everyArr) {
    if (!Array.isArray(arr)) return;
    return arr.concat(...everyArr)
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组处理',
  name: 'lastItem',
  title: '获取数组最后一项',
  desc: '获取数组最后一项',
  params: {
    arr: {
      type: 'array'
    },
  },
  _define: function (arr) {
    if (!Array.isArray(arr)) return;
    return arr[arr.length - 1]
  },
  _return: 'string' || 'number' || 'object'
},
{
  id: uuid(),
  type: '对象操作',
  name: 'deepCopy',
  title: '深拷贝',
  desc: '深拷贝对象',
  params: {
    obj: {
      type: 'object'
    },
  },
  _define: function (obj) {
    let o = obj instanceof Array ? [] : {};
    for (let i in obj) {
      let val = obj[i];
      if (typeof val === "object") {
        o[i] = deepCopy(val);
      } else {
        o[i] = val;
      }
    }
    return o;
  },
  _return: 'object'
},
{
  id: uuid(),
  type: '数据格式 ',
  name: 'isLegalEmail',
  title: '邮箱校验',
  desc: '邮箱校验',
  params: {
    email: {
      type: 'srting'
    },
  },
  _define: function (email) {
    return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数据格式 ',
  name: 'isLegalName',
  title: '中文名校验',
  desc: '中文名校验--(2-6)位',
  params: {
    name: {
      type: 'srting'
    },
  },
  _define: function (name) {
    return /^[\u4e00-\u9fa5]{2,6}$/.test(name);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数据格式 ',
  name: 'isLegalIdCard',
  title: '身份证校验',
  desc: '身份证校验',
  params: {
    idCard: {
      type: 'number'
    },
  },
  _define: function (idCard) {
    return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idCard);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数据格式 ',
  name: 'isLegalIdCard',
  titile: '手机号码校验',
  desc: '手机号码校验',
  params: {
    phone: {
      type: 'number'
    },
  },
  _define: function (phone) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone);
  },
  _return: 'boolean'
},
{
  id: uuid(),
  type: '数组操作',
  name: 'chunkArr',
  title: '数组拆分',
  desc: '将数组拆分为多个区块，除了最后一个区块长度不确定，其余区块长度相等',
  params: {
    array: {
      type: 'array'
    },
    size: {
      type: 'number'
    }
  },
  _define: function (array, size) {
    size = Math.floor(size);
    let res = [], cnt = 0;
    while (size * (cnt + 1) <= array.length) {
      res.push(array.slice(size * cnt, size * (cnt + 1)));
      cnt += 1;
    }
    if (cnt * size === array.length) return res;
    res.push(array.slice(size * cnt));
    return res;
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组操作',
  name: 'compactArr',
  title: '数组剔除假值',
  desc: '创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”',
  params: {
    array: {
      type: 'array'
    }
  },
  _define: function (array, size) {
    size = Math.floor(size);
    let res = [], cnt = 0;
    while (size * (cnt + 1) <= array.length) {
      res.push(array.slice(size * cnt, size * (cnt + 1)));
      cnt += 1;
    }
    if (cnt * size === array.length) return res;
    res.push(array.slice(size * cnt));
    return res;
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数组操作',
  name: 'findObj',
  title: '查找对象数组中符合要求的对象',
  desc: '根据对象数组中对象某个属性的值来查找该对象，返回符合的对象数组或空数组',
  params: {
    array: {
      type: 'array'
    },
    key: {
      type: 'string'
    },
    letue: {
      type: 'all'
    }
  },
  _define: function (array, key, letue) {
    return array.filter(item => {
      if (!key || !letue || !item.hasOwnProperty(key)) return false;
      return item[key] === letue;
    });
  },
  _return: 'array'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'intToRoman',
  title: '整数转换罗马字符',
  desc: '将整数转换为罗马字符，罗马字符包括I,V,X,L,C,D和M',
  params: {
    num: {
      type: 'number'
    }
  },
  _define: function (num) {
    let dict = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let dex = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let result = "";

    for (let i = 0; i < dex.length; i++) {
      let v = dex[i];

      if (num >= v) {
        let count = parseInt(num / v);
        num %= v;

        for (let j = 0; j < count; j++) {
          result = result + dict[i];
        }
      }
    }

    return result;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数值操作',
  name: 'romanToInt',
  title: '罗马字符转换整数',
  desc: '将罗马字符转换整数',
  params: {
    num: {
      type: 'string'
    }
  },
  _define: function (num) {
    let result = 0;
    let c2n = function (c) {
      switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
      }
    }
    for (let i = 0; i < s.length; i++) {
      if (i > 0 && (c2n(s[i]) > c2n(s[i - 1]))) {
        result -= 2 * c2n(s[i - 1]); // because previously added [!!!]
      }
      result += c2n(s[i]);
    }

    return result;
  },
  _return: 'string'
},
{
  id: uuid(),
  type: '数组操作',
  name: 'dropRight',
  title: '剔除数组首位元素',
  desc: '剔除数组首位元素，n默认为1',
  params: {
    array: {
      type: 'array'
    }
  },
  _define: function (array) {
    let result = 0;
    let c2n = function (c) {
      switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
      }
    }
    for (let i = 0; i < s.length; i++) {
      if (i > 0 && (c2n(s[i]) > c2n(s[i - 1]))) {
        result -= 2 * c2n(s[i - 1]); // because previously added [!!!]
      }
      result += c2n(s[i]);
    }

    return result;
  },
  _return: 'string'
}
]

module.exports = storeJS;