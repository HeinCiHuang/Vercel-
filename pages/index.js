export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      margin: 0,
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Vercel 域名重定向服务</h1>
      <p style={{ color: '#666', maxWidth: '600px', margin: '0' }}>
        该服务已配置完成。请检查你的重定向规则是否正确设置。
        如需修改重定向目标，请编辑项目中的 <code>middleware.js</code> 文件。
      </p>
    </div>
  );
}
