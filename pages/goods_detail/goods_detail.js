import{request}from"../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否被收藏
    isCollect:false,
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages= getCurrentPages();
    let currentPage=pages[pages.length-1];
    let options=currentPage.options;
    const {goods_id}=options;
    this.getGoodsDetail(goods_id)

    


  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj =await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo=goodsObj;
    //获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    //判断商品是否被收藏
    let isCollect = collect.some(v => v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);
      this.setData({
        goodsObj:{
          goods_name:goodsObj.data.message.goods_name,
          goods_price:goodsObj.data.message.goods_price,
          goods_introduce:goodsObj.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObj.data.message.pics
        }
      })
  },
  // 点击轮播图放大预览
  handlePrevewImage(e){
    const urls= this.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd(){
    let cart=wx.getStorageSync('cart')||[];
    let index=cart.findIndex(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);
    console.log(cart)
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask:true
    })
  },
  handleCollect(){
    let isCollect=false;
    //获取缓存中的数据
    let collect=wx.getStorageSync('collect')||[];
    //判断商品有没有被收藏
    let index=collect.findIndex(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);
    //对判断结果做出相应操作
    if(index===-1){
      //没收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }else{
      //收藏过
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }
    //修改缓存中的数组
    wx.setStorageSync("collect",collect);
    this.setData({collect,isCollect})
  }
})