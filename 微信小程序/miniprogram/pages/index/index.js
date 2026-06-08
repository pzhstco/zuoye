// index.js
Page({
  data: {
    score: 0,
    bestScore: 0,
    animating: false,
    floatTexts: [],
    userId: null
  },

  floatId: 0,
  db: null,

  onLoad() {
    // 初始化云数据库
    this.db = wx.cloud.database();
    
    // 获取用户信息（用于标识用户）
    this.getUserInfo();
    
    // 从云数据库读取历史最高分
    this.loadBestScore();
  },

  getUserInfo() {
    wx.getUserProfile({
      desc: '用于获取用户信息以保存游戏记录',
      success: (res) => {
        this.setData({ userId: res.userInfo.openId || res.userInfo.nickName });
      },
      fail: () => {
        // 如果用户拒绝授权，使用设备 ID 作为标识
        wx.getStorage({
          key: 'deviceId',
          success: (res) => {
            this.setData({ userId: res.data });
          },
          fail: () => {
            // 生成一个随机 ID
            const deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            wx.setStorageSync('deviceId', deviceId);
            this.setData({ userId: deviceId });
          }
        });
      }
    });
  },

  async loadBestScore() {
    try {
      const userId = this.data.userId || 'default_user';
      
      // 查询用户的最高分记录
      const result = await this.db.collection('scores').where({
        userId: userId
      }).get();

      if (result.data.length > 0) {
        // 存在记录，更新最高分
        this.setData({ bestScore: result.data[0].bestScore });
      } else {
        // 不存在记录，创建新记录
        await this.db.collection('scores').add({
          data: {
            userId: userId,
            bestScore: 0,
            createdAt: new Date()
          }
        });
        this.setData({ bestScore: 0 });
      }
    } catch (error) {
      console.error('读取最高分失败:', error);
      // 如果云数据库操作失败，使用本地存储
      const bestScore = wx.getStorageSync('bestScore') || 0;
      this.setData({ bestScore });
    }
  },

  async updateBestScore(newScore) {
    try {
      const userId = this.data.userId || 'default_user';
      
      // 更新云数据库中的最高分
      await this.db.collection('scores').where({
        userId: userId
      }).update({
        data: {
          bestScore: newScore,
          updatedAt: new Date()
        }
      });
      
      // 同时更新本地存储作为备用
      wx.setStorageSync('bestScore', newScore);
    } catch (error) {
      console.error('更新最高分失败:', error);
      // 如果云数据库操作失败，使用本地存储
      wx.setStorageSync('bestScore', newScore);
    }
  },

  onCoinTap(e) {
    // 震动反馈
    wx.vibrateShort({ type: 'medium' });

    // 更新分数
    const newScore = this.data.score + 1;
    this.setData({ score: newScore });

    // 检查是否超过历史最高分
    if (newScore > this.data.bestScore) {
      this.setData({ bestScore: newScore });
      // 更新云数据库
      this.updateBestScore(newScore);
    }

    // 金币放大动画
    this.setData({ animating: true });
    setTimeout(() => {
      this.setData({ animating: false });
    }, 300);

    // 飘字特效
    this.showFloatText(e);
  },

  showFloatText(e) {
    // 获取点击位置
    const touch = e.touches ? e.touches[0] : e.detail;
    const id = this.floatId++;

    // 创建飘字
    const floatText = {
      id,
      x: (touch.clientX || 150) - 25,
      y: (touch.clientY || 300) - 25,
      show: true
    };

    const floatTexts = [...this.data.floatTexts, floatText];
    this.setData({ floatTexts });

    // 动画结束后移除
    setTimeout(() => {
      const updated = this.data.floatTexts.filter(t => t.id !== id);
      this.setData({ floatTexts: updated });
    }, 800);
  }
});