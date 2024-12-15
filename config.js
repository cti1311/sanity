module.exports = {
    server:{
        port: 80
    },
    env: "cli",
    runner: {
        concurrency: 100,
        chromium: {
            headless: true
        }
    }
}
