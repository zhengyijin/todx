import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { Toast } from 'vant';
Vue.use(Toast)

import { signature } from '../../request/api'

export default function wxShare(title, desc, link, imgUrl, url) {

    signature(url).then(res => {

        if (res.status == 200) {

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.app_id, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
                jsApiList: [
                    "checkJsApi",
                    "updateAppMessageShareData",
                    "updateTimelineShareData",
                    "onMenuShareWeibo",
                    "onMenuShareQZone",
                    "onMenuShareQQ",
                ], // 必填，需要使用的JS接口列表
            });

            wx.ready(function() {
                wx.checkJsApi({
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ",
                        "onMenuShareQZone",
                        "onMenuShareQQ",
                    ],
                    success: function(res) {
                        if (res.checkResult.getLocation == false) {
                            alert(
                                "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
                            );
                            return;
                        }
                    },
                });

                let configInfo = {
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                };

                let configInfo2 = { //分享到朋友圈
                    title: desc, // 分享标题
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                };

                wx.updateAppMessageShareData(configInfo); //分享给朋友及分享到QQ
                wx.updateTimelineShareData(configInfo2); //分享到朋友圈及分享到QQ空间
                wx.onMenuShareWeibo(configInfo); //分享到腾讯微博
                wx.onMenuShareQZone(configInfo); //分享QQ空间
                wx.onMenuShareQQ(configInfo); //分享到QQ（即将废弃）
            });


            wx.error(function(res) {
                console.log(res)
            });

        } else {
            console.log(res)
        }
    }).catch((err) => {
        console.log(res)
    })
}