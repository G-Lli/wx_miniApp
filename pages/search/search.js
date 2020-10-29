import{request}from"../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inpValue:''
  },
  TimeId:1,
  handleInput(e){
    const {value}=e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
    
  },
  //获取搜索参数
  async qsearch(query){
    const res=await request({url:"/goods/search",data:{query}});
    this.setData({
      goods:res.data.message.goods
    })
    console.log(res);
  },
  handleCancle(){
    this.setData({
      inpValue:'',
      goods:[],
      isFocus:false
    })
  }
})