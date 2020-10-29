// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    collectNum:0
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo');
    let collect=wx.getStorageSync('collect')||[];
    let collectNum= collect.length;
    this.setData({userInfo,collectNum});
  }
})