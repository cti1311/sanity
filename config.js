module.exports = {
    server:{
        port: 80
    },
    env: "cli",
    runner: {
        concurrency: 1,
        chromium: {
            headless: false
        }
    }
}
