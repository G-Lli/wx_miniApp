import{request}from"../../request/index.js"
//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[],
    // 导航数组
    CateList:[],
    // 楼层数组
    floorList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //options(Object)
  onLoad: function(options){
    
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
    
  },
  // 获取轮播图数组
  getSwiperList(){
    request({url:"/home/swiperdata"})
      .then( result=>{
        this.setData({
          swiperList:result.data.message
        })
      })
  },
  // 获取分类导航数组
  getCateList(){
    request({url:"home/catitems"})
      .then( result=>{
        this.setData({
          CateList:result.data.message
        })
      })
  },
  // 获取楼层数组
  getFloorList(){
    request({url:"/home/floordata"})
      .then( result=>{
        this.setData({
          floorList:result.data.message
        })
      })
  },
  
});
