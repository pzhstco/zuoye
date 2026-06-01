# 图片爬虫

用于为本的旅游攻略项目爬取高质量的旅游景点图片。

## 功能特点

- 从 Unsplash 爬取免费高质量图片
- 支持多个旅游主题搜索
- 自动保存到本地 images 文件夹
- 错误重试机制

## 安装依赖

```bash
pip install -r requirements.txt
```

## 使用方法

直接运行爬虫脚本：

```bash
python scraper.py
```

## 爬取主题

默认会爬取以下旅游相关主题的图片：
- Mountain sunrise（山顶日出）
- Ancient town（古镇）
- Lake reflection（湖泊倒影）
- Theme park（主题公园）
- Hiking trail（徒步栈道）
- Museum（博物馆）
- Night market（夜市）
- Flower field（花海）

## 输出目录

爬取的图片会保存到 `travel-guide/images` 目录。

## 注意事项

- 请勿频繁请求，代码中已添加延时
- 图片仅供学习交流使用
- 商用请注意版权问题
