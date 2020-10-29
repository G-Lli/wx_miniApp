import{request}from"../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodList:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
  pagesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||'';
    this.QueryParams.query=options.query||'';
    this.getGoodsList();
    // console.log(options)
    

    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    
  },
    // 获取商品列表数据
    async getGoodsList(){
      const res=await request({url:"/goods/search",data:this.QueryParams});
      // 获取 总条数
      // console.log(res)
      const total=res.data.message.total;
      // // 计算总页数
      this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
      // console.log(this.totalPages);
      this.setData({
        // 拼接了数组
        goodList:[...this.data.goodList,...res.data.message.goods]
      })
  
      // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
      wx.stopPullDownRefresh();
        
    },
  //标题点击事件 （子组件传进来的）
  handleTabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom(){
     //  1 判断还有没有下一页数据
     if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      
      wx.showToast({ title: '没有下一页数据' });
        
    }else{
      // 还有下一页数据
     
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件 
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.getGoodsList();
  }
})