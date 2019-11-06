<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	export default {
		name: 'App',
		components:{

		},
		data(){
			return{

			}
		},
		methods: {

			// getLocationToken(){
			//    let APPKEY = this.roomConfig.liveRoomConfig.signKey;
			// let APPID = this.roomConfig.liveRoomConfig.appId;
			// let ID_Name = "test";
			// let nonce = "abcddaaaaaaaaa"; //生成随机数  去掉 -
			//    //加的时间半小时
			//     let time = "1572599185";
			//    let newKey = APPKEY.replace(/0x/g,"").replace(/,/g,"").substring(0,32);
			//    let token = this.$md5(APPID + newKey + ID_Name + nonce + time);
			//    console.log(APPID);
			//    console.log(newKey);
			//    console.log(nonce);
			//    console.log(time);
			//    console.log(token); // hash
			//    let hexString = "";
			//    for(let i = 0; i < token.length; i ++){
			//    	let temp = token.charAt(i) & 255;
			//        if(temp < 16 && temp >=0){
			//            hexString = hexString + "0" + temp.toString(16);
			//         }else{
			//            hexString = hexString + temp.toString(16);
			//         }
			//     }
			//     //TODO:按文档拼接json 转base64
			//    this.login();
			// },
		},
		mounted(){
            // this.getLocationToken();
		},
		computed: {

		},
		watch:{

		}
	}
</script>

<style lang="less">

</style>
