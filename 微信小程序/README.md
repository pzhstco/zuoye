# 点金手微信小游戏

一款简单有趣的点击小游戏，点击金币获得分数！

## 功能特点

- 🪙 点击金币获得分数
- 📊 显示当前得分和历史最高分
- 🎨 温暖的渐变背景和可爱的卡通风格
- 💫 金币放大动画和飘字特效
- 📱 震动反馈提升体验
- ☁️ 云数据库存储历史最高分

## 技术栈

- 微信小程序
- 云开发（云数据库）

## 项目结构

```
miniprogram/
├── app.js          # 应用入口，初始化云开发
├── app.json        # 应用配置
├── app.wxss        # 全局样式
├── envList.js      # 环境列表
├── sitemap.json    # 站点地图
├── pages/
│   └── index/      # 游戏主页面
└── components/     # 组件
```

## 使用方法

1. 在微信开发者工具中导入项目
2. 配置云开发环境
3. 创建 `scores` 集合
4. 编译运行

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)