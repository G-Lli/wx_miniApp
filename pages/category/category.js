import{request}from"../../request/index.js"
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的菜单数据
    rightContent:[],
    // 被点击的左侧菜单
    currentIndex:0,
    // 右侧滚动条与顶部的距离
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储中有没有旧的数据
    // 先获取本地存储数据
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightContent
          })
      }
    }
    
  },
  getCates(){
    request({url:"/categories"})
      .then( res=>{
          this.Cates=res.data.message;
          // 把接口数据存到本地存储中
        wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})
          // 构造左侧数据
          let leftMenuList=this.Cates.map(v=>v.cat_name);
          // 构造右侧的商品数据
          let rightContent=this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightContent
          })
      })
  },
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
        this.setData({
          currentIndex:index,
          rightContent,
          // 重置右侧滚动条
          scrollTop:0
        })
    
    
  }
})