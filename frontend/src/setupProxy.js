const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'React-App/1.0'
      },
      onProxyReq: (proxyReq, req, res) => {
        // Log original headers for debugging
        const originalHeaders = proxyReq.getHeaders();
        console.log('Original headers count:', Object.keys(originalHeaders).length);
        console.log('Original headers:', originalHeaders);

        // Check for unusually large headers
        Object.entries(originalHeaders).forEach(([key, value]) => {
          if (typeof value === 'string' && value.length > 1000) {
            console.warn(`Large header detected: ${key} (${value.length} chars)`);
          }
        });

        // Remove all headers except essential ones to prevent 431 errors
        const essentialHeaders = ['accept', 'content-type', 'authorization', 'host', 'user-agent'];

        // Get all current headers
        const currentHeaders = proxyReq.getHeaders();

        // Remove all headers first
        Object.keys(currentHeaders).forEach(header => {
          proxyReq.removeHeader(header);
        });

        // Add back only essential headers
        essentialHeaders.forEach(header => {
          if (currentHeaders[header]) {
            proxyReq.setHeader(header, currentHeaders[header]);
          }
        });

        // Log filtered headers
        console.log('Filtered headers count:', Object.keys(proxyReq.getHeaders()).length);
        console.log('Filtered headers:', proxyReq.getHeaders());
      },
    })
  );
};