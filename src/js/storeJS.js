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
        _define: function(a) {
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
        name: 'IsVaildDate',
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
        _define: function(sYear, sMonth, sDay) {
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
        title: '获取指定年月的天数',
        desc: '获取指定年月的天数',
        params: {
            sYear: {
                type: 'number',
            },
            sMonth: {
                type: 'number'
            }
        },
        _define: function(sYear, sMonth) {
            var date = new Date(sYear, sMonth, 0);
            return (parseInt(date.getDate()));
        },
        _return: 'number'
    },
    {
        id: uuid(),
        type: '日期处理',
        name: 'getWeekOfDay',
        title: '获取制定年月的天数',
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
        _define: function(sYear, sMonth, sDay) {
            var str = '';
            var date = new Date(sYear, sMonth - 1, sDay);
            switch (date.getDay()) {
                case 0:
                    str = '礼拜天';
                    break;
                case 1:
                    str = '礼拜一';
                    break;
                case 2:
                    str = '礼拜二';
                    break;
                case 3:
                    str = '礼拜三';
                    break;
                case 4:
                    str = '礼拜四';
                    break;
                case 5:
                    str = '礼拜五';
                    break;
                case 6:
                    str = '礼拜六';
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
        title: '获取天数',
        desc: '获取两个日期之间的间隔天数',
        params: {
            sDateStr1: {
                type: 'string',
            },
            sDateStr2: {
                type: 'string',
            }
        },
        _define: function(sDateStr1, sDateStr2) {
            var sDate1 = new Date(sDateStr1),
                sDate2 = new Date(sDateStr2);
            var BetweenDays = Math.floor(Math.abs(Date.parse(sDate2) - Date.parse(sDate1)) / (1000 * 60 * 60 * 24));
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
        _define: function(sDateStr1, sDateStr2) {
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
        name: 'getYearsOfTwoDate',
        title: '获取年份差',
        desc: '获取两个年份之间的年份差',
        params: {
            sDateStr1: {
                type: 'string',
            },
            sDateStr2: {
                type: 'string',
            }
        },
        _define: function(sDateStr1, sDateStr2) {
            var sDate1 = new Date(sDateStr1),
                sDate2 = new Date(sDateStr2);
            let sumYears = Math.abs(sDate2.getFullYear() - sDate1.getFullYear());
            return sumYears;
        },
        _return: 'string'
    },
    {
        id: uuid(),
        type: '日期处理',
        name: 'getTimeFormat',
        title: '秒转时分秒',
        desc: '把输入的秒数转换成规范的时分秒的格式',
        params: {
            s: {
                type: 'number',
            }
        },
        _define: function(s) {
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
        type: '数值处理',
        name: 'getThousandNum',
        title: '数字千分位输出',
        desc: '把输入的数字转换成千分位输出',
        params: {
            num: {
                type: 'number',
            }
        },
        _define: function(num) {
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
        type: '数值处理',
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
        _define: function(max, min) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        _return: 'number'
    },
]

module.exports = storeJS;