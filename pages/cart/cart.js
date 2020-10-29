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
      const cart=wx.getStorageSync('cart')||[];
      this.setData({address});
      this.setCart(cart);
      
    },
    //判断是否授权获取地址操作
    async handleChooseAddress(){
      try {
        const res1=await getSetting();
        const scopeAddress=res1.authSetting["scope.address"];
        // console.log()
        if(scopeAddress===false){
          await openSetting();      
        }else{     
          const address=await chooseAddress();
          wx.setStorageSync('address', address);
        }
      }
        catch(error) {
          console.log(error)
    }
    } ,
    //复选框改变后操作
    handleItemChange(e){
      const goods_id=e.currentTarget.dataset.id;
      // console.log(goods_id)
      let{cart}= this.data;
      let index=cart.findIndex(v=>v.data.message.goods_id===goods_id);
      cart[index].checked=!cart[index].checked;
      this.setCart(cart);
      
    },
    //复选框改变后一系列操作封装
    setCart(cart){ 
      let allChecked=true;
      let totalPrice=0;
      let totalNum=0;
      cart.forEach(v => {
        if(v.checked){
          totalPrice+=v.num*v.data.message.goods_price;
          totalNum+=v.num;
        }else{
          allChecked=false;
        }
      })
      allChecked=cart.length!=0?allChecked:false;
      this.setData({
        cart,totalNum,totalPrice,allChecked
      });
      wx.setStorageSync('cart', cart);
    },
    handleAllItemChange(){
      let{cart,allChecked}=this.data;
      allChecked=!allChecked;
      cart.forEach(v=>v.checked=allChecked);
      this.setCart(cart);
    },
    async handleItemNumEdit(e){
      
      
      //获取当前的商品id和按钮
      const {cnum,id}=e.currentTarget.dataset;
      //获取cart数组
      let {cart}=this.data;
      let index=cart.findIndex(v=>v.data.message.goods_id===id);
      
      if(cart[index].num===1&&cnum===-1){
        const res=await showModal({content:'这么香你确定不要？'});
        if (res.confirm) {
          cart.splice(index,1);
          this.setCart(cart);
        } 
      }else{
        cart[index].num+=cnum;
        this.setCart(cart);
      }
      
    },
    async handlePay(){
      const {address,totalNum}=this.data;
      
      if(!address){
        await showToast({title:'地址没写'});
        return;
      }
      if(totalNum===0){
        await showToast({title:'你还没选购'});
        return;
      }
      wx.navigateTo({
        url: '/pages/pay/pay',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
  
    }
     
})