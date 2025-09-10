# Vercel 域名重定向工具

一个使用 Vercel Edge Functions 实现的域名重定向工具，支持两种重定向模式：
- 隐性重定向：保持浏览器地址栏 URL 不变，展示目标网站内容
- 常规重定向：改变浏览器地址栏 URL，跳转到目标网站

## 功能特点

- 灵活配置：可为不同路径设置不同的重定向类型
- 参数保留：自动传递 URL 中的查询参数
- 简单部署：一键部署到 Vercel，无需复杂配置
- 错误处理：重定向失败时提供友好提示

## 项目结构
vercel-stealth-redirect/
├── middleware.js         # 核心重定向逻辑
├── pages/
│   └── index.js          # 默认页面组件
├── public/
│   └── .gitkeep          # 确保 public 目录被 Git 跟踪
├── package.json          # 项目依赖配置
└── README.md             # 项目说明文档

## 部署步骤

### 1. 准备工作

- 拥有 GitHub 账号和 Vercel 账号（可使用 GitHub 账号登录）
- 目标重定向域名（可选，也可使用 Vercel 提供的免费域名）

### 2. 部署到 Vercel

1. 点击右上角的 `Fork` 按钮，将本项目复制到你的 GitHub 账号
2. 访问 [Vercel 官网](https://vercel.com) 并登录
3. 点击 `New Project` 按钮，导入你刚刚 Fork 的仓库
4. 点击 `Deploy` 按钮，等待部署完成

### 3. 配置自定义域名（可选）

1. 在 Vercel 项目页面，进入 `Settings` → `Domains`
2. 点击 `Add Domain` 并输入你的域名
3. 按照提示完成 DNS 配置

## 配置重定向规则

重定向规则在 `middleware.js` 文件中进行配置，示例：

```javascript
const redirectRules = [
  {
    path: '/',          // 要匹配的路径
    target: 'https://example.com',  // 目标地址
    type: 'stealth'     // 重定向类型
  },
  {
    path: '/blog',
    target: 'https://example.com/blog',
    type: 'normal'
  }
];
