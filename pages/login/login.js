// pages/login/login.js
Page({
  handleGEtUserInfo(e){
    // console.log(e)
    const {userInfo}=e.detail;
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})