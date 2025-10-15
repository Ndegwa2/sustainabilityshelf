const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        // Remove all headers except essential ones to prevent 431 error
        const essentialHeaders = ['accept', 'content-type', 'authorization', 'host'];

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

        // Set minimal user-agent
        proxyReq.setHeader('User-Agent', 'React-App');
      },
    })
  );
};