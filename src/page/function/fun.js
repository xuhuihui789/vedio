export default {
    goMain: function (path,_that,Query) {
        _that.$router.push({
            path: path,
            query:Query
        })
    },
    //验证浏览器
    jumpNavigator: function getBrowser() {
        var UserAgent = navigator.userAgent.toLowerCase();
        var browser = null;
        var browserArray = {
            IE: window.ActiveXObject || "ActiveXObject" in window, // IE
            Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
            Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
            Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
            Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') == -1, // safari浏览器
            Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
            QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
            WeixinBrowser: /MicroMessenger/i.test(UserAgent) // 微信浏览器
        };
        for (var i in browserArray) {
            if (browserArray[i]) {
                browser = i;
            }
        }
        return browser;
    },
    // 打开聊天窗口
    openChart: function (_that) {
        _that.$store.dispatch('change_chartBoolean', 'true')
    },
    // 关闭聊天窗口
    closeChart: function (_that) {
        _that.$store.dispatch('change_chartBoolean', 'false')
    },
        /*TODO 成功失败警告提示语 */
        //成功提示
    successMsg(_that,msg){
        _that.$message({
            message: msg,
            type: 'success'
        });
    },
    //失败提示
    errMsg(_that,msg){
        _that.$message.error(msg);
    },
    //取消提示
    infoMsg(_that,msg){
        this.$message({
            type: 'info',
            message: msg
        });
    },


    // 判断userData 是否存在R
    judgeUser(_that,Data){
        if(Data){
            _that.myData = JSON.parse(Data)
        }
    },
    //转换时间 时间戳
    dateLongString(time){
		var date = new Date(time);
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		month = month < 10 ? "0"+month:month;
		day = day < 10 ? "0"+day:day;
		return year+"-"+month+"-"+day;
    },
	//获取某日期所在的周几
	
	getMyDay(date){
		var week;
		if(date.getDay()==0) week="星期日"
		if(date.getDay()==1) week="星期一"
		if(date.getDay()==2) week="星期二"
		if(date.getDay()==3) week="星期三"
		if(date.getDay()==4) week="星期四"
		if(date.getDay()==5) week="星期五"
		if(date.getDay()==6) week="星期六"
		return week;
	},
	dateFormat(str,d) {
		if(this.checkNull(str)){  //如果格式化字符为空，返回空字符
			return "";
		}
		if(this.checkNull(d)){  //如果日期为空，自动获取当前日期
			d=new Date();
		}else if(d.constructor!=Date){//如果参数不是一个日期对象，就认为是一个标准Long值日期
			d=new Date(d);
		}
		return  str.replace("yyyy",d.getFullYear()).replace("MM",this.fillZero(d.getMonth()+1)).replace("dd",this.fillZero(d.getDate())).replace("HH",this.fillZero( d.getHours())).replace("mm",this.fillZero(d.getMinutes())).replace("ss",this.fillZero(d.getSeconds())).replace("sss",d.getMilliseconds());
	},
	fillZero(value){
	if(value.toString().length<2){
		return "0"+value;
	}
	return value;
	},
    checkNull(value){
        if(!value||value==null||typeof(value) == "undefined"||value==""){
		return true;
	}
	return false;
}
}

Date.prototype.Format = function (fmt) { // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
