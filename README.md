# Vercel 域名重定向工具

一个使用Vercel Edge Functions实现的域名重定向工具，支持两种重定向模式：
- 隐性重定向：保持浏览器地址栏URL不变，展示目标网站内容
- 常规重定向：改变浏览器地址栏URL，跳转到目标网站

## 功能特点

- 灵活配置：可为不同路径设置不同的重定向类型
- 参数保留：自动传递URL中的查询参数
- 简单部署：一键部署到Vercel，无需复杂配置
- 错误处理：重定向失败时提供友好提示

## 项目结构vercel-stealth-redirect/
├── middleware.js         # 核心重定向逻辑
├── pages/
│   └── index.js          # 默认页面组件
├── public/
│   └── .gitkeep          # 确保public目录被Git跟踪
├── package.json          # 项目依赖配置
└── README.md             # 项目说明文档
## 部署步骤

### 1. 准备工作

- 拥有GitHub账号和Vercel账号（可使用GitHub账号登录）
- 目标重定向域名（可选，也可使用Vercel提供的免费域名）

### 2. 部署到Vercel

1. 点击右上角的 `Fork` 按钮，将本项目复制到你的GitHub账号
2. 访问 [Vercel官网](https://vercel.com) 并登录
3. 点击 `New Project` 按钮，导入你刚刚Fork的仓库
4. 点击 `Deploy` 按钮，等待部署完成

### 3. 配置自定义域名（可选）

1. 在Vercel项目页面，进入 `Settings` → `Domains`
2. 点击 `Add Domain` 并输入你的域名
3. 按照提示完成DNS配置

## 配置重定向规则

重定向规则在 `middleware.js` 文件中进行配置，示例：
const redirectRules = [
  {
    path: '/',          // 要匹配的路径
    target: 'https://example.com',  // 目标地址
    type: 'stealth'     // 重定向类型：'stealth'或'normal'
  },
  {
    path: '/blog',
    target: 'https://example.com/blog',
    type: 'normal'
  }
  // 可添加更多规则...
];
### 配置项说明

| 参数 | 说明 |
|------|------|
| `path` | 需要匹配的访问路径，如 `/`、`/blog` 等 |
| `target` | 重定向的目标URL，必须包含 `http://` 或 `https://` |
| `type` | 重定向类型：`stealth`（隐性）或 `normal`（常规） |

### 修改配置方法

1. 在GitHub仓库中编辑 `middleware.js` 文件
2. 修改 `redirectRules` 数组中的配置
3. 提交修改后，Vercel会自动重新部署

## 注意事项

- 部分网站可能设置安全策略阻止隐性重定向
- 确保你有权限对目标网站进行重定向
- HTTPS目标网站需要有有效的SSL证书
- 大型网站可能存在兼容性问题

## 常见问题

### 为什么隐性重定向没有生效？

可能原因：
- 目标网站设置了严格的CSP策略
- 目标网站启用了X-Frame-Options限制
- 网络连接问题或目标网站不可用

### 如何查看错误日志？

在Vercel项目页面，进入 `Logs` 选项卡可查看详细日志信息。
