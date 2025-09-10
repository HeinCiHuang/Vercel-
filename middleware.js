export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的:
     * - api (API路由)
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default async function middleware(request) {
  // 重定向规则配置
  // type: 'stealth' 表示隐性重定向(地址栏不变)
  // type: 'normal' 表示常规重定向(地址栏改变)
  const redirectRules = [
    {
      path: '/',
      target: 'https://your-actual-domain.com',  // 替换为你的目标域名
      type: 'stealth'  // 默认隐性重定向
    },
    {
      path: '/blog',
      target: 'https://your-actual-domain.com/blog',  // 替换为你的目标路径
      type: 'normal'  // 常规重定向
    }
    // 可添加更多规则...
  ];

  const url = new URL(request.url);
  const path = url.pathname;
  
  // 查找匹配的重定向规则
  const matchedRule = redirectRules.find(rule => rule.path === path);
  
  if (matchedRule) {
    // 构建目标URL，保留查询参数
    const targetUrl = new URL(matchedRule.target);
    targetUrl.search = url.search;
    
    // 根据规则类型执行不同的重定向
    if (matchedRule.type === 'stealth') {
      // 隐性重定向实现 - 使用fetch代理请求
      try {
        // 构建请求头
        const headers = new Headers(request.headers);
        headers.set('X-Forwarded-Host', url.host);
        
        // 发送请求到目标服务器
        const response = await fetch(targetUrl.toString(), {
          method: request.method,
          headers: headers,
          body: request.body,
          redirect: 'follow'
        });
        
        // 处理响应头，移除可能导致问题的安全头
        const responseHeaders = new Headers(response.headers);
        responseHeaders.delete('content-security-policy');
        responseHeaders.delete('x-frame-options');
        responseHeaders.delete('x-xss-protection');
        
        // 返回代理响应
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders
        });
      } catch (error) {
        console.error('隐性重定向失败:', error);
        return new Response('重定向服务暂时不可用', { status: 500 });
      }
    } else {
      // 常规重定向实现
      return new Response(null, {
        status: 307, // 临时重定向，保留请求方法
        headers: {
          Location: targetUrl.toString()
        }
      });
    }
  }
  
  // 没有匹配的规则，返回默认响应
  return null;
}
