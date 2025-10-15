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
      },
    })
  );
};