//全局混入
const timestampToTime = function (number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}


const formatNumber = function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export default {
    mounted() { },
    methods: {
        gMixinFormatTimestamp: function (timestamp) {
            return timestampToTime(timestamp, "Y/M/D");
        },
        gMixinFormatSex: function (sex) {
            return sex == 1 ? "男" : sex == 0 ? "女" : "未知";
        },
        gMixinFundStatusTxt: function (status) {
            return status == 1 ? "进行" : status == 0 ? "结束" : "未知";
        },
        gMrefreshPage: function () {
            this.getList();
        },
        gMixinSpliTimeStr: function (TimeStr, type = 1) {
            if (TimeStr) {
                if (type == 1) {
                    return TimeStr.split(" ")[0];
                }
            } else {
                return "";
            }
        },

    }



}
