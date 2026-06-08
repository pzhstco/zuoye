// app.js
App({
  onLaunch: function () {
    this.globalData = {
      // 云开发环境 ID
      env: "100049632445",
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
  },

  globalData: {
    userInfo: null
  }
});