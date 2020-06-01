module.exports = {
    "/**":
    {
        "target": "http://localhost:3000",
         bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
        "secure": false
    }
}
