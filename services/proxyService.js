function formatProxy(proxyData) {
    return {
        host: proxyData.host,
        httpPort: proxyData.httpPort
    };
}

module.exports = { formatProxy };