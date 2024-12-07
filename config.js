module.exports = {
    server:{
        port: 80
    },
    env: "cli",
    runner: {
        concurrency: 15,
        chromium: {
            headless: true
        }
    }
}
