module.exports = {
    server:{
        port: 3000
    },
    env: "cli",
    runner: {
        concurrency: 1,
        chromium: {
            headless: true
        }
    }
}
