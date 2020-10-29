// pages/cart/cart.js
// 1、获取用户收货地址
//    1、绑定点击事件，获取小程序所授予获取地址的权限和状态
      // 2、有三个状态：a：用户点击确认授权 scope返回值中scope.address为true 
      //               b:用户点击取消 scope返回值中scope.address为false
      //               c：用户从未调用 scope undefind
      // 但是，行不通
// 2、页面加载完毕
   // 1、获取本地存储数据中的地址数据
  //  2、把数据设置给data的一个变量
  import {getSetting,chooseAddress,openSetting,showModal,showToast } from"../../utils/asyncWx.js";
  import regeneratorRuntime from '../../lib/runtime/runtime';
  Page({
      data:{
        address:{},
        cart:[],
        allChecked:false,
        totalPrice:0,
        totalNum:0
      },
      onShow(){
        //获取缓存中的收货地址信息
        const address=wx.getStorageSync("address");
        let cart=wx.getStorageSync('cart')||[];
        cart=cart.filter(v=>v.checked);
        this.setData({address});
        //计算结算价格和商品数量
        let totalPrice=0;
        let totalNum=0;
        cart.forEach(v => {
            totalPrice+=v.num*v.data.message.goods_price;
            totalNum+=v.num;
        })
        this.setData({
          cart,totalNum,totalPrice,address
        })
      },
      handleToPay(){
        wx.switchTab({
          url: '/pages/cart/cart',
        });
        let newCart = wx.getStorageInfoSync("cart");
        newCart = function(newCart){
          return !newCart;
        }
        wx.setStorageSync('cart', newCart);
      }
  })