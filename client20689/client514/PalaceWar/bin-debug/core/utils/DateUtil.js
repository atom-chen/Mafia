/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */
var App;
(function (App) {
    var DateUtil;
    (function (DateUtil) {
        /**
         * 一小时的秒数
         */
        DateUtil.hourSeconds = 3600;
        DateUtil.dayHours = 24;
        var _year = "date_year";
        var _month = "date_month";
        var _day = "date_day";
        var _hour = "date_hour";
        var _minute = "date_minute";
        var _second = "date_second";
        /**
         * 根据秒数格式化字符串
         * @param second 秒数
         * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前,6:xx年x月x日,7:x月x日
         * @return
         *
         */
        function getFormatBySecond(second, type) {
            if (type === void 0) { type = 1; }
            var str = "";
            switch (type) {
                case 1:
                    str = getFormatBySecond1(second);
                    break;
                case 2:
                    str = getFormatBySecond2(second);
                    break;
                case 3:
                    str = getFormatBySecond3(second);
                    break;
                case 4:
                    str = getFormatBySecond4(second);
                    break;
                case 5:
                    str = getFormatBySecond5(second);
                    break;
                case 6:
                    str = getFormatBySecond6(second);
                    break;
                case 7:
                    str = getFormatBySecond7(second);
                    break;
                case 8:
                    str = getFormatBySecond8(second);
                    break;
                case 9:
                    str = getFormatBySecond9(second);
                case 10:
                    str = getFormatBySecond10(second);
                    break;
            }
            return str;
        }
        DateUtil.getFormatBySecond = getFormatBySecond;
        //1: 00:00:00
        function getFormatBySecond1(t) {
            if (t === void 0) { t = 0; }
            var hourst = Math.floor(t / 3600);
            var hours;
            if (hourst == 0) {
                hours = "00";
            }
            else {
                if (hourst < 10)
                    hours = "0" + hourst;
                else
                    hours = "" + hourst;
            }
            var minst = Math.floor((t - hourst * 3600) / 60);
            var secondt = Math.floor((t - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return hours + ":" + mins + ":" + sens;
        }
        //3: 00:00
        function getFormatBySecond3(t) {
            if (t === void 0) { t = 0; }
            var hourst = Math.floor(t / 3600);
            var minst = Math.floor((t - hourst * 3600) / 60);
            var secondt = Math.floor((t - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return hourst + ":" + mins + ":" + sens;
        }
        //2:yyyy-mm-dd h:m:s
        function getFormatBySecond2(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return year + "-" + month + "-" + day + " " + hours + ":" + mins + ":" + sens;
            // return new Date(time * 1000).toLocaleString();
        }
        //4:xx天前，xx小时前，xx分钟前 刚刚
        function getFormatBySecond4(time) {
            var t = Math.floor(time / 3600);
            if (t > 0) {
                if (t > 24) {
                    return LanguageManager.getlocal("chat_time1", [String(Math.floor(t / 24))]);
                }
                else {
                    return LanguageManager.getlocal("chat_time2", [String(t)]);
                }
            }
            else {
                if (Math.floor(time / 60) > 0) {
                    return LanguageManager.getlocal("chat_time3", [String(Math.floor(time / 60))]);
                }
                else {
                    return LanguageManager.getlocal("chat_time4");
                }
            }
        }
        function getFormatBySecond5(time) {
            //每个时间单位所对应的秒数
            var oneDay = 3600 * 24;
            var oneHourst = 3600;
            var oneMinst = 60;
            var days = Math.floor(time / oneDay);
            var hourst = Math.floor(time % oneDay / oneHourst);
            var minst = Math.floor((time - hourst * oneHourst) / oneMinst); //Math.floor(time % oneDay % oneHourst / oneMinst);
            var secondt = Math.floor((time - hourst * oneHourst) % oneMinst); //time;
            var dayss = "";
            var hourss = "";
            var minss = "";
            var secss = "";
            if (time > 0) {
                //天
                if (days == 0) {
                    dayss = "";
                    //小时
                    if (hourst == 0) {
                        hourss = "";
                        //分
                        if (minst == 0) {
                            minss = "";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + "秒";
                            }
                            else {
                                secss = "" + secondt + "秒";
                            }
                            return secss;
                        }
                        else {
                            minss = "" + minst + "分";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + "秒";
                            }
                            else {
                                secss = "" + secondt + "秒";
                            }
                        }
                        return minss + secss;
                    }
                    else {
                        hourss = hourst + "小时";
                        if (minst == 0) {
                            minss = "";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + "秒";
                            }
                            else {
                                secss = "" + secondt + "秒";
                            }
                            return secss;
                        }
                        else if (minst < 10) {
                            minss = "0" + minst + "分";
                        }
                        else {
                            minss = "" + minst + "分";
                        }
                        return hourss + minss;
                    }
                }
                else {
                    dayss = days + "天";
                    if (hourst == 0) {
                        hourss = "";
                    }
                    else {
                        if (hourst < 10)
                            hourss = "0" + hourst + "小时";
                        else
                            hourss = "" + hourst + "小时";
                        ;
                    }
                    return dayss + hourss;
                }
            }
            return "";
        }
        //6:xx年x月x日
        function getFormatBySecond6(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            return year + LanguageManager.getlocal("yearTitle") + month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
        }
        //7:xx年x月x日
        function getFormatBySecond7(time) {
            var date = new Date(time * 1000);
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            return month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
        }
        //8:把时间转化为 xx小时x分x秒
        function getFormatBySecond8(secondNums) {
            var resStr = "";
            if (secondNums >= 60 * 60 * 24) {
                var dSce = 60 * 60 * 24;
                var t = Math.floor(secondNums / dSce);
                resStr = resStr + t + LanguageManager.getlocal("date_day");
                secondNums = secondNums % dSce;
            }
            if (secondNums >= 60 * 60) {
                var hSce = 60 * 60;
                var h = Math.floor(secondNums / hSce);
                resStr = resStr + h + LanguageManager.getlocal("date_hour2");
                secondNums = secondNums % hSce;
            }
            if (secondNums >= 60) {
                var min = Math.floor(secondNums / 60);
                resStr = resStr + min + LanguageManager.getlocal("date_minute");
                secondNums = secondNums % 60;
            }
            // if (secondNums >= 0)
            // {
            if (secondNums < 10) {
                resStr = resStr + "0" + secondNums + LanguageManager.getlocal("date_second");
            }
            else {
                resStr = resStr + secondNums + LanguageManager.getlocal("date_second");
            }
            // }
            return resStr;
        }
        //9:mm-dd h:m
        function getFormatBySecond9(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return month + "." + day + " " + hours + ":" + mins;
            // return new Date(time * 1000).toLocaleString();
        }
        //7:xx年x月x日
        function getFormatBySecond10(time) {
            var date = new Date(time * 1000);
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            return month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle") + hours + LanguageManager.getlocal("date_hour");
        }
        /**
         * 当天零点的时间戳
         * @param ts 时间戳
         */
        function getWeeTs(ts) {
            return ts - ((ts + GameData.timeZone * 3600) % 86400);
        }
        DateUtil.getWeeTs = getWeeTs;
        /**
         * 判断时间戳是否是跟服务器时间为同一天，true：是
         * @param ts 时间戳
         */
        function checkIsToday(ts) {
            return (GameData.serverTime - (getWeeTs(ts) + 24 * 60 * 60)) < 0;
        }
        DateUtil.checkIsToday = checkIsToday;
        function getLeftDaySecondByTime(time) {
            var daySecond = DateUtil.hourSeconds * DateUtil.dayHours;
            var zoneSecond = GameData.timeZone * DateUtil.hourSeconds;
            var leftSecond = (time + zoneSecond) % daySecond;
            return leftSecond;
        }
        DateUtil.getLeftDaySecondByTime = getLeftDaySecondByTime;
        /**
         * 获取功能开始结束时间
         * @param st
         * @param et
         * @param showHour 是否精确到小时
         */
        function getOpenLocalTime(st, et, showHour) {
            var type = showHour ? 10 : 7;
            return App.DateUtil.getFormatBySecond(st, type) + "-" + App.DateUtil.getFormatBySecond(et, type);
        }
        DateUtil.getOpenLocalTime = getOpenLocalTime;
    })(DateUtil = App.DateUtil || (App.DateUtil = {}));
})(App || (App = {}));
