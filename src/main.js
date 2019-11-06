// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './page/router'

//引入 element ui
import ElementUI from 'element-ui'
import {Message, Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import promise from 'es6-promise';
promise.polyfill();
import 'babel-polyfill'
Vue.use(ElementUI)

//引入集成 SDK
import {ZegoClient} from 'webrtc-zego'
//初始化
let zg;
// 初始化实例
zg = new ZegoClient();
Vue.prototype.zg = zg
//获取配置appId和signKey
import roomConfig from './page/liveRomConfig/config'
Vue.prototype.roomConfig = roomConfig
//引用MD5
import md5 from 'js-md5';
Vue.prototype.$md5 = md5

//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

//引入vuex
import Vuex from 'vuex'
import store from './page/state/index'
Vue.prototype.$store = store;
Vue.use(Vuex)

//引入公共常量
import state from './page/state/state'
Vue.prototype.$state = state

//引入axios
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios;

// 引入公共css
import '../static/css/common.css';

//引入公共函数文件
import fun from './page/function/fun'
Vue.prototype.commonFun = fun;

//引入视频播放
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;


import VueBetterCalendar from 'vue-better-calendar'
Vue.use(VueBetterCalendar)
//国际化
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: window.localStorage.getItem('lang') === null ? "zh" : window.localStorage.getItem('lang'),    // 语言标识
	messages: {
		'zh': Object.assign(require("./lang/zh.js"), zhLocale),
		'en': Object.assign(require("./lang/en.js"), enLocale)
	}
})
locale.i18n((key, value) => i18n.t(key, value))
Vue.config.productionTip = false;
// 接口路径
Vue.prototype.URL = {
	upload: "/file/upload",
	imgPath: '/file',
	downloadFilePath: '/file/download',
//    文件管理下载
	file: {
		download: '/file/download'
	},
//	设置语言
	language:{
		user:'/user/language'
	},
//	获取token
	getToken:{
		token:'/test/a'
	}
}
//上传附件
Vue.prototype.$urlServer = '//39.104.67.135:8099' //文件上传
Vue.prototype.$urlFile = window.g.IPConfig

//跨域
axios.defaults.withCredentials = true
// axios.defaults.baseURL = "//10.0.1.19:8080/"; // 思成
// axios.defaults.baseURL = "//10.0.1.142:8080/"; // 心怡本地
// axios.defaults.baseURL = "//192.168.0.109:8080/"; // 思辰本地
// axios.defaults.baseURL = "//10.0.1.40:8080/"; // 庆宇本地
// axios.defaults.baseURL = "//10.0.1.25:8888/"; // 线上地址
axios.defaults.baseURL = window.g.IPConfig



// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// 'X-Requested-With': 'XMLHttpRequest',
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
	for (let p in pending) {
		if (pending[p].u === config.url + '&' + config.method) { //当前请求在数组中存在时执行函数体
			pending[p].f(); //执行取消操作
			pending.splice(p, 1); //把这条记录从数组中移除
		}
	}
}

// 是否防止多次请求
let httpFlag = true
// ajax请求统一增加请求头
axios.interceptors.request.use(config => {
		
		config.headers.common = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			'x-authentication-token': localStorage.TOKEN ? localStorage.TOKEN : ''
		}
		config.timeout = 60000
		
		let str_data = qs.stringify(config.data);
		config.data = str_data
		// 参数中携带cancelHttp，不防止多次请求
		if (str_data.indexOf("cancelHttp") > -1) {
			httpFlag = false
		} else {
			removePending(config); //在一个ajax发送前执行一下取消操作
			config.cancelToken = new cancelToken((c) => {
				// 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
				pending.push({u: config.url + '&' + config.method, f: c});
			});
		}
		
		return config
	},
	err => {
		return null
	})
// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
	const data = response.data;
	if (httpFlag) {
		removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
	}
	if (data.status === 401){
		router.push({
			path: '/login',
		})
		Message({
			showClose: true,
			message:'登录超时，请从新登录',
			type: 'error'
		});
	}
	
	return data;
}, (err) => {
	// 这里是返回状态码不为200时候的错误处理
	if (err.toString().indexOf("timeout") != -1) {
		Message({
			showClose: true,
			message: '请求超时，请稍后再试',
			type: 'warning'
		});
	}
	if (err && err.response) {
		
		switch (err.response.status) {
			case 400:
				err.message = '请求错误'
				break
			
			case 401:
				err.message = '未授权，请登录'
				break
			
			case 403:
				err.message = '拒绝访问'
				break
			
			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				break
			case 405:
				err.message = `请求地址出错:`
				break
			case 408:
				err.message = '请求超时'
				break
			
			case 500:
				err.message = '500'
				break
			
			case 501:
				err.message = '501'
				break
			
			case 502:
				err.message = '502'
				break
			
			case 503:
				err.message = '503'
				break
			
			case 504:
				err.message = '504'
				break
			
			case 505:
				err.message = 'HTTP版本不受支持'
				break
			
			default:
		}
		if (err.response.data.msg) {
			err.message = err.response.data.msg;
		}
		Message({
			showClose: true,
			message: err.message,
			type: 'error'
		});
	}
	
	return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	i18n,
	components: {App},
	template: '<App/>'
})

const vm = new Vue()
export {vm}
