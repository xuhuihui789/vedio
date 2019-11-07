<template>
    <div id="loginPage">
        <video class="videoStyle" autoPlay  ref="videoTeacher" id="aaa"></video>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				loginToken:'',//登录用户获取token
				audioInput:'',//audio设备
				videoInput:'',//video设备
				localVideo:'',
				streamId:'',
			}
		},
		methods:{
			//	获取登录 token
			getLoginToken() {
				let params = {
					appId:this.roomConfig.liveRoomConfig.appId,
					appKey:this.roomConfig.liveRoomConfig.signKey,
					idName:'test'
				}
				this.$axios.get(this.URL.getToken.token,{params}).then(res => {
					this.loginToken = res
					this.login()
				})
			},
			//   登录
			login() {
				this.zg.onDisconnect = function (err) {
					//网络断开后的回调处理
				};

				this.zg.onKickOut = function (err) {
					//踢出房间后的回调处理
				};
				let that = this
				this.zg.onGetAnchorInfo = function (anchor_userid, anchro_username) {
					//主播信息更新回调处理，在登录成功后触发
					that.zg.enumDevices(function(deviceInfo){
						if (deviceInfo.microphones) {
							for (let i = 0; i < deviceInfo.microphones.length; i++) {
								console.log(deviceInfo.microphones[i].deviceId);
							}
							//	TODO 赋值 _this.audioInput
						}
						if (deviceInfo.cameras) {
							for (let j = 0; j < deviceInfo.cameras.length; j++) {
								// console.log(deviceInfo.cameras[j].label);
							}
							//	TODO 赋值_this.videoInput
						}
						// 开始预览
						that.doPreview('default',deviceInfo.cameras[0].deviceId)
					},function(error){
						//媒体设备信息回调失败
					})
				};
				// let that = this;
				this.zg.login("111", 1, this.loginToken, function (streamList) {
					console.log(streamList);
					// that.doPreview()
					// //枚举设备
					/* let _that = that
                     that.zg.enumDevices(function(deviceInfo){
                         console.log(deviceInfo.microphones);
                         console.log(deviceInfo.cameras);
                         if (deviceInfo.microphones) {
                             for (let i = 0; i < deviceInfo.microphones.length; i++) {
                                 console.log(deviceInfo.microphones[i].deviceId);
                                 // _this.audioInput = deviceInfo.microphones[0].deviceId
                                 // console.log(_this.audioInput);
                             }
                             //	TODO 赋值 _this.audioInput
                         }
                         if (deviceInfo.cameras) {
                             for (let j = 0; j < deviceInfo.cameras.length; j++) {
                                 console.log(deviceInfo.cameras[i].label);
                             }

                             //	TODO 赋值_this.videoInput
                         }
                         // 开始预览
                         _that.doPreview('default',deviceInfo.cameras[0].deviceId)
                     },function(error){
                         //媒体设备信息回调失败
                     })*/
				}, function (err) {
					console.log(err);
				})
			},
			//   本地预览  使用默认设备时，audioInput和videoInput参数不用填
			doPreview(audioInput,videoInput){
				alert(111)
				let avConstraints = {
					audio: true,//是否需要音频
					audioInput: audioInput,//	麦克风设备Id
					video: true,// 是否需要视频
					videoInput: videoInput,//  摄像头设备Id
					videoQuality: 1, //视频质量等级
					horizontal: true,//是否横屏视频
					externalCapture:true,//是否使用外部来源
					// externalMediaStream:'',//外部提供MediaStram对象	 mediaStreamConstraints增加 width / height / frameRate / bitRate 属性，需要把这四个属性也传递给SDK
					// noiseSuppression:true,//是否开启降噪
					// autoGainControl:true,//	是否开启自动增益
					// echoCancellation:true,//是否开启回声消除
				};
				//WebRTC可以共用相同设备，所以预览时必须指定开播的streamId
				this.localVideo = this.$refs.videoTeacher
				console.log(this.localVideo);
				let _this = this
				this.zg.startPreview(this.localVideo, avConstraints, function(success) {
					//成功开播
					alert(222)
					_this.doPublish();
				}, function(error) {
					alert("start device error ");
				});
				// this.doPublish();
			},
			//   开播
			doPublish(){
				alert(333)
				let result = this.zg.startPublishingStream('abc', this.localVideo);
				console.log(result);
				if (!result) {
					alert("publish " + publishStreamId + " return " + result);
				}
			}
		},
		mounted(){
			// 配置必要参数
			let config = {
				appid: this.roomConfig.liveRoomConfig.appId,    // 必填，应用id，请从 即构管理控制台-https://console.zego.im/acount/register 获取
				idName: 'test',    // 必填，用户自定义id，全局唯一
				nickName: 'aasfsfdsfds',    // 必填，用户自定义昵称
				server: "wss://wsliveroom-test.zego.im:8282/ws",    // 必填，接入服务器地址，请从 即构管理控制台-https://console.zego.im/acount/register 获取
				logLevel: 1,    //日志级别，debug:0,info:1,warn:2,error:3,report:99,disable:100（数字越大，日志越少），建议选择 1
				logUrl: "wss://wslogger-test.zego.im:8282/log",    // 必填，logServer 地址，请从 即构管理控制台-https://console.zego.im/acount/register 获取
				remoteLogLevel: 1,    // 上传日志最低级别，建议跟 logLevel 一致
				testEnvironment: true, // 是否开启测试环境，默认为正式环境
				audienceCreateRoom: false //是否允许观众创建房间
			}
			this.zg.config(config);
			this.getLoginToken()
		}
	}
</script>

<style lang="less">
    #loginPage{
        .videoStyle{
            width: 800px;
            height: 800px;
        }
    }
</style>