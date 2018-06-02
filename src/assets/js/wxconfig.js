import wx from 'weixin-js-sdk';
import axios from 'axios';
import util from './util';

const _shareData = {
  title: '决定你放不放假的不是你的老板，而是这5件事！',
  desc: '万万没想到国庆放假的真相竟是....',
  link: 'http://lighter.hingyin.com/nday/dist',
  imgUrl: 'http://sl-cdn.hingyin.com/o_1br6l8v2970dc751snv1nch1voa7.jpg', 
  success: function (res) {
    try {
      ga('send', 'event', 'national_day', 'shareSuccess', res.errMsg); 
    } catch (error) {
      console.error("ga is not undifined");
    }
  },
  cancel: function (res) { 
    try {
      ga('send', 'event', 'national_day', 'shareCancel', res.errMsg); 
    } catch (error) {
      console.error("ga is not undifined");
    }
  }
};

export default {
  wxConfig(config, jsApiList = [], debug = false){
    let defaultJsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showOptionMenu'];
    jsApiList = util.concat(jsApiList, defaultJsApiList);
  
    wx.config({
      debug,
      appId: config.appid,
      timestamp: config.timestamp || 0,
      nonceStr: config.noncestr,
      signature: config.signature,
      jsApiList: jsApiList
    });
  },
  respWxConfig(callback){
    let url = encodeURIComponent(location.href.split('#')[0]);
    axios.get(`/Common/wxJssdkConfig?url=${url}`)
    .then(resp => {
      resp = resp.data;
      callback(resp);
    })
  },
  share(shareData = null) {
    shareData = util.assign(_shareData, shareData);
    wx.ready(() => {
			wx.onMenuShareTimeline(shareData);
			wx.onMenuShareAppMessage(shareData);
			wx.onMenuShareQQ(shareData);
			wx.onMenuShareWeibo(shareData);
			wx.onMenuShareQZone(shareData);
			wx.showOptionMenu();
		});
  }
};