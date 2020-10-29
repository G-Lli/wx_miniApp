// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商家/商品投诉",
        isActive: false
      }
    ],
    chooseImgs:[],
    //文本域内容
    textVal:""
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 2 赋值到data中
   this.setData({
    tabs
  })
  },
  //点击+号事件
  handleChooseImg(){
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        console.log(result.tempFilePaths)
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    })
  },
  handleRemoveImg(e){
    const {index}=e.currentTarget.dataset;
    let {chooseImgs}=this.data;
    chooseImgs.splice(index,1);
    this.setData({  
     chooseImgs
    })
  },
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  //提交按钮的点击
  handleFormSubmit(){
    const {textVal,chooseImgs}=this.data;
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    //上传图片到专门的图片服务器
    //上传文件的api不支持多个文件同时上传 只能遍历数组，一个一个传
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
      url: 'https://images.ac.cn/Home/Index/UploadAction/',
      filePath: v,
      name: "file",
      formData: {},
      success: (result)=>{
        console.log(result);
        let url = JSON.parse(result.data).url;
        this.UpLoadImgs.push(url);
         // 所有的图片都上传完毕了才触发  
         if (i === chooseImgs.length - 1) {

          wx.hideLoading();


          console.log("把文本的内容和外网的图片数组 提交到后台中");
          //  提交都成功了
          // 重置页面
          this.setData({
            textVal: "",
            chooseImgs: []
          })
          // 返回上一个页面
          wx.navigateBack({
            delta: 1
          });
        }else{
          wx.hideLoading();
        
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
        }
      }
    });
    })
    
  }
})