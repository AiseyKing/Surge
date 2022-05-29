//代码借鉴 https://raw.githubusercontent.com/chaizia/Profiles/master/MySurge/surgepro_flushdns.js
!(async () => {
let traffic = (await httpAPI("/v1/traffic","GET"));
let dateNow = new Date();
let dateTime = Math.floor(traffic.startTime*1000);
let startTime = timeTransform(dateNow,dateTime);
let mitm_status = (await httpAPI("/v1/features/mitm","GET"));
let rewrite_status = (await httpAPI("/v1/features/rewrite","GET"));
let scripting_status = (await httpAPI("/v1/features/scripting","GET"));
let icon_s = mitm_status.enabled&&rewrite_status.enabled&&scripting_status.enabled;
//点击按钮，刷新dns
//if ($trigger == "button") await httpAPI("/v1/dns/flush");
//点击按钮，重载配置（同时刷新dns）
if ($trigger == "button") {
	await httpAPI("/v1/profiles/reload");
	$notification.post("配置重载","配置重载成功","")
};
$done({
    title:"𝗦𝘂𝗿𝗴𝗲 𝗣𝗿𝗼 🧚🏽‍♀️:"+startTime,
    content:"𝗠𝗶𝘁𝗺:"+icon_status(mitm_status.enabled)+"  𝗥𝗲𝘄𝗿𝗶𝘁𝗲:"+icon_status(rewrite_status.enabled)+"  𝗦𝗰𝗿𝗶𝗽𝘁𝗶𝗻𝗴:"+icon_status(scripting_status.enabled),
    icon: icon_s?"hourglass.badge.plus":"hourglass.badge.plus",
   "icon-color":icon_s?"#16A951":"#FA7500"
});
})();
function icon_status(status){
  if (status){
    return "\u2611";
  } else {
      return "\u2612"
    }
}
function timeTransform(dateNow,dateTime) {
let dateDiff = dateNow - dateTime;
let days = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
let hours=Math.floor(leave1/(3600*1000))//计算出小时数
//计算相差分钟数
let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
//计算相差秒数
let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
let seconds=Math.round(leave3/1000)

if(days==0){
  if(hours==0){
    if(minutes==0)return(`${seconds} 𝓼 `);
      return(`${minutes} 𝓶 ${seconds} 𝓼 `)
    }
    return(`${hours}𝓱${minutes}𝓶${seconds}𝓼`)
  }else {
        return(`${days}𝓓${hours} 𝓱 ${minutes} 𝓶 `)
	}
}
function httpAPI(path = "", method = "POST", body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => {
      resolve(result);
    });
  });
}
