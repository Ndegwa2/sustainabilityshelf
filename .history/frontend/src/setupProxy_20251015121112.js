const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      onProxyReq: (proxyReq, req, res) => {
        // Limit headers to prevent 431 error
        const allowedHeaders = ['accept', 'content-type', 'authorization', 'user-agent', 'host'];
        const headersToRemove = [];

        Object.keys(proxyReq.getHeaders()).forEach(header => {
          if (!allowedHeaders.includes(header.toLowerCase())) {
            headersToRemove.push(header);
          }
        });

        headersToRemove.forEach(header => {
          proxyReq.removeHeader(header);
        });
      },
    })
  );
};