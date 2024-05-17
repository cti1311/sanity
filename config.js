module.exports = {
    server:{
        port: 3033
    },
    env: "cli",
    runner: {
        concurrency: 10
    },
    payu: {
        creds: {
            key: "Qyt13U",
            salt: "ysDxHhbEmjk0qMnvBVhgZPjxgf3gDGyc"
        },
        env: "TEST"
    }
}