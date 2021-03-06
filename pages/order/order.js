
Page({

/**
 * 页面的初始数据
 */
data: {
  tabs: [
    {
      id: 0,
      value: "全部",
      isActive: true
    },
    {
      id: 1,
      value: "待付款",
      isActive: false
    },
    {
      id: 2,
      value: "待发货",
      isActive: false
    },
    {
      id: 3,
      value: "退款/退货",
      isActive: false
    }
  ]
},
changeTitleByIndex(index) {
  // 修改源数组
  let { tabs } = this.data;
  tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
  // 赋值到data中
  this.setData({
    tabs
  })
},


handleTabsItemChange(e) {
  // 1 获取被点击的标题索引
  const { index } = e.detail;
  this.changeTitleByIndex(index);
}
})