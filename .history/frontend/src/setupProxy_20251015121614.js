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
        // Remove problematic headers that cause 431 errors
        const headersToRemove = [
          'accept-encoding',
          'accept-language',
          'cache-control',
          'pragma',
          'referer',
          'sec-ch-ua',
          'sec-ch-ua-mobile',
          'sec-ch-ua-platform',
          'sec-fetch-dest',
          'sec-fetch-mode',
          'sec-fetch-site',
          'sec-fetch-user',
          'upgrade-insecure-requests',
          'dnt',
          'connection'
        ];

        headersToRemove.forEach(header => {
          proxyReq.removeHeader(header);
        });
      },
    })
  );
};